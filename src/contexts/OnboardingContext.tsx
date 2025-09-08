import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserOnboardingData, UserRole, CompanyFormData, CandidateFormData } from '@/types/user/UserOnboarding';
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
  updateCandidateData: (data: Partial<CandidateFormData>) => void;
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
      await getAccessTokenSilently({
        authorizationParams: {
          audience: 'http://skillbridgeapi',
          scope: 'openid profile email default:company default:candidate offline_access',
        },
        cacheMode: 'off',
      });
      queryClient.invalidateQueries();
    } catch (error) {
      console.error('Failed to refresh user roles:', error);

      // Re-throw the error so calling code can handle it
      throw error;
    }
  }, [getAccessTokenSilently, queryClient]);

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

  // Set the user role - handle both company and candidate roles
  const setRole = (role: UserRole) => {
    setOnboardingData((prev) => ({
      ...prev,
      role,
      // Initialize appropriate data structure based on role
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
        : role === 'candidate'
        ? {
            candidate: {
              username: '',
              cv: null,
              profilePicture: null,
              externalLink: '',
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

  // Update candidate form data
  const updateCandidateData = (data: Partial<CandidateFormData>) => {
    setOnboardingData((prev) => ({
      ...prev,
      candidate: {
        ...prev.candidate,
        ...data,
      } as CandidateFormData,
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
    updateCandidateData,
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
