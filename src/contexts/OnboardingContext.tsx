import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserOnboardingData, UserRole, CompanyFormData } from '@/types/user/UserOnboarding';
import useUserCredentials, { Auth0Role } from '@/hooks/useUserCredentials';

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
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Create provider
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const { user } = useUserCredentials();
  const [onboardingData, setOnboardingData] = useState<UserOnboardingData>(() => {
    // Try to get saved onboarding data from localStorage
    const savedData = localStorage.getItem('onboardingData');
    return savedData ? JSON.parse(savedData) : initialOnboardingState;
  });
  // Check and update onboarding state based on user roles from Auth0
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Check if the user has any roles in Auth0
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

      // If the user has a role in Auth0 that's different from their selection, use the Auth0 role instead
      if (
        (onboardingData.role === 'candidate' && hasCompanyRole && !hasCandidateRole) ||
        (onboardingData.role === 'company' && hasCandidateRole && !hasCompanyRole)
      ) {
        const correctedRole: UserRole = hasCompanyRole ? 'company' : 'candidate';
        console.log(
          `User has ${expectedRole} role in Auth0. Correcting selection to ${correctedRole}.`
        );

        setOnboardingData((prev) => ({
          ...prev,
          role: correctedRole,
          completed: true,
        }));
        return;
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
