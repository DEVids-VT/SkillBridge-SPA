import React, { createContext, useState, useContext, ReactNode } from 'react';
import {
  UserOnboardingData,
  UserRole,
  CompanyFormData,
  CandidateFormData,
} from '@/types/user/UserOnboarding';

// Initial onboarding data
const initialOnboardingState: UserOnboardingData = {
  role: null,
  completed: false,
};

// Create context
interface OnboardingContextType {
  onboardingData: UserOnboardingData;
  setRole: (role: UserRole) => void;
  updateCompanyData: (data: Partial<CompanyFormData>) => void;
  updateCandidateData: (data: Partial<CandidateFormData>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Create provider
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<UserOnboardingData>(() => {
    // Try to get saved onboarding data from localStorage
    const savedData = localStorage.getItem('onboardingData');
    return savedData ? JSON.parse(savedData) : initialOnboardingState;
  });

  // Update localStorage when onboardingData changes
  React.useEffect(() => {
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
  }, [onboardingData]);

  // Set the user role
  const setRole = (role: UserRole) => {
    setOnboardingData((prev) => ({
      ...prev,
      role,
      // Initialize the appropriate form data structure based on role
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
        : {
            candidate: {
              fullName: '',
              dateOfBirth: '',
              cv: null,
              areaOfInterest: [],
            },
          }),
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
    setRole,
    updateCompanyData,
    updateCandidateData,
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
