import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Guard component that checks if the user has completed onboarding
 * If not, redirects to the welcome page
 */
export default function OnboardingGuard({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    // Only check onboarding status if the user is authenticated and not in the loading state
    if (!isLoading && isAuthenticated) {
      // If the user has not completed onboarding, redirect to the welcome page
      if (!onboardingData.completed) {
        navigate(RoutePage.WELCOME);
      }
    }
  }, [isAuthenticated, isLoading, navigate, onboardingData.completed]);

  // Only render children if onboarding is complete
  return onboardingData.completed ? <>{children}</> : null;
}
