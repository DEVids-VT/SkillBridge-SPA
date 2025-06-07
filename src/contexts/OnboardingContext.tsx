import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserOnboardingData, UserRole, CompanyFormData } from '@/types/user/UserOnboarding';
import useUserCredentials, { Auth0Role } from '@/hooks/useUserCredentials';
import { useQueryClient } from '@tanstack/react-query';

// Initial onboarding data
const initialOnboardingState: UserOnboardingData = {
  role: null,
  completed: false,
};

// Create context
interface OnboardingContextType {
  onboardingData: UserOnboardingData;
  userRoles: Auth0Role[];
  hasRole: (role: string) => boolean;
  setRole: (role: UserRole) => void;
  updateCompanyData: (data: Partial<CompanyFormData>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  refreshUserRoles: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Create provider
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { user } = useUserCredentials();
  const queryClient = useQueryClient();
  const [onboardingData, setOnboardingData] = useState<UserOnboardingData>(() => {
    // Try to get saved onboarding data from localStorage
    const savedData = localStorage.getItem('onboardingData');
    return savedData ? JSON.parse(savedData) : initialOnboardingState;
  });

  // Function to force refresh user roles through silent reauthentication
  const refreshUserRoles = useCallback(async () => {
    try {
      if (isAuthenticated) {
        console.log('Forcing silent reauthentication to get updated roles...');

        // Force a silent reauthentication by using Auth0's checkSession
        // This simulates a full login flow without redirecting the user
        const auth0Client = (window as any).auth0;
        if (auth0Client) {
          await auth0Client.checkSession({
            audience: 'http://skillbridgeapi',
            scope: 'openid profile email default:company default:candidate',
          });
        }

        // Force a new token after reauth with cache disabled
        await getAccessTokenSilently({
          authorizationParams: {
            audience: 'http://skillbridgeapi',
            scope: 'openid profile email default:company default:candidate',
          },
          cacheMode: 'off', // Force skip cache to get a fresh token
        });

        // Invalidate all queries to force data refetch with new token/roles
        queryClient.invalidateQueries();

        console.log('Silent reauthentication completed, user roles refreshed');
      }
    } catch (error) {
      console.error('Error during silent reauthentication:', error);

      // Fallback to regular token refresh if silent reauth fails
      try {
        console.log('Falling back to regular token refresh...');
        await getAccessTokenSilently({
          authorizationParams: {
            audience: 'http://skillbridgeapi',
            scope: 'openid profile email default:company default:candidate',
          },
          cacheMode: 'off', // Still try to bypass cache in fallback
        });
        queryClient.invalidateQueries();
        console.log('Fallback token refresh completed');
      } catch (fallbackError) {
        console.error('Fallback token refresh also failed:', fallbackError);
        // We've tried our best to refresh the token, the user might need to re-login manually
      }
    }
  }, [isAuthenticated, getAccessTokenSilently, queryClient]);

  // Check and update onboarding state based on user roles from Auth0
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Case-insensitive role checks
      const hasCompanyRole = user.roles.some((r) => r.toLowerCase() === 'company'.toLowerCase());
      const hasCandidateRole = user.roles.some(
        (r) => r.toLowerCase() === 'candidate'.toLowerCase()
      );
      const hasAnyRole = hasCompanyRole || hasCandidateRole;

      console.log('Debug - Auth0 roles check:', {
        hasCompanyRole,
        hasCandidateRole,
        roles: user.roles,
      });

      if (hasAnyRole) {
        // If the user has a role in Auth0 but onboarding is not completed or the role doesn't match,
        // automatically complete onboarding with the correct role
        if (
          !onboardingData.completed ||
          (onboardingData.role === 'company' && !hasCompanyRole) ||
          (onboardingData.role === 'candidate' && !hasCandidateRole)
        ) {
          // Determine which role to set
          const roleToSet: UserRole = hasCompanyRole ? 'company' : 'candidate';

          console.log(`User has ${roleToSet} role in Auth0. Auto-completing onboarding.`);

          // Set the appropriate role and mark onboarding as completed
          setOnboardingData((prev) => ({
            ...prev,
            role: roleToSet,
            completed: true,
            ...(roleToSet === 'company'
              ? {
                  company: prev.company || {
                    companyName: '',
                    industry: '',
                    companySize: '',
                    website: '',
                    logo: null,
                  },
                }
              : {}),
          }));
        }
      } else {
        // If user has completed onboarding but doesn't have any role in Auth0, reset the onboarding state
        if (onboardingData.completed) {
          console.log('User does not have any role in Auth0. Resetting onboarding.');
          setOnboardingData(initialOnboardingState);
        }
      }
    }
  }, [isAuthenticated, isLoading, user.roles]);

  // Update localStorage when onboardingData changes
  useEffect(() => {
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
  }, [onboardingData]);
  // Check if user has a specific role - case insensitive check
  const hasRole = (role: string): boolean => {
    return user.roles.some((r) => r.toLowerCase() === role.toLowerCase());
  };

  // Set the user role - simplified to only handle company role
  const setRole = (role: UserRole) => {
    setOnboardingData((prev) => ({
      ...prev,
      role,
      // Only initialize company data structure
      ...(role === 'company'
        ? {
            company: {
              companyName: '',
              industry: '',
              companySize: '',
              website: '',
              logo: null,
              about: '',
              activities: '',
              headquarters: '',
              yearEstablished: undefined,
              hasOfficesInBulgaria: false,
              employeesInBulgaria: undefined,
              globalEmployees: undefined,
              technologies: [],
              bulgarianOffices: [],
              whyWorkWithUs: '',
              contactEmail: '',
              contactPhone: '',
              contactPerson: '',
            },
          }
        : {}),
    }));
  };

  // Update company form data
  const updateCompanyData = (data: Partial<CompanyFormData>) => {
    setOnboardingData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        ...data,
      } as CompanyFormData,
    }));
  };

  // Complete the onboarding process
  const completeOnboarding = () => {
    if (onboardingData.role) {
      const expectedRole = onboardingData.role === 'company' ? 'Company' : 'Candidate';
      console.log('Debug - Completing onboarding with role:', expectedRole);
      console.log('Debug - User roles:', user.roles);

      // Check if the user already has the expected role
      const hasExpectedRole = hasRole(expectedRole);
      console.log('Debug - Has expected role:', hasExpectedRole);

      // Check if user has any role that could override the selected one
      const hasCompanyRole = user.roles.some((r) => r.toLowerCase() === 'company'.toLowerCase());
      const hasCandidateRole = user.roles.some(
        (r) => r.toLowerCase() === 'candidate'.toLowerCase()
      );

      // If the user has a role in Auth0 that's different from their selection,
      // Use the selected role since the user just changed it and we've refreshed the token
      // The role change may not be immediately reflected in the token
      if (
        (onboardingData.role === 'candidate' && hasCompanyRole && !hasCandidateRole) ||
        (onboardingData.role === 'company' && hasCandidateRole && !hasCompanyRole)
      ) {
        // Token might not be refreshed yet, continue with selected role
        console.log(
          `Selected role differs from Auth0 role, but continuing with selected role ${onboardingData.role} as token may need more time to refresh.`
        );
      }
    }

    // Complete onboarding - always complete regardless of role validation for better user experience
    console.log('Debug - Completing onboarding with selected role');
    setOnboardingData((prev) => ({
      ...prev,
      completed: true,
    }));
  };

  // Reset the onboarding process
  const resetOnboarding = () => {
    setOnboardingData(initialOnboardingState);
  };

  const value = {
    onboardingData,
    userRoles: user.roles,
    hasRole,
    setRole,
    updateCompanyData,
    completeOnboarding,
    resetOnboarding,
    refreshUserRoles,
  };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

// Custom hook to use the onboarding context
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
