import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { useAuth0 } from '@auth0/auth0-react';

interface OnboardingGuardProps extends PropsWithChildren {
  redirectPath?: RoutePage;
}

/**
 * Guard component that checks if the user has completed onboarding
 * If not, redirects to the welcome page
 */
export default function OnboardingGuard({
  children,
  redirectPath = RoutePage.WELCOME,
}: OnboardingGuardProps) {
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    // Only check onboarding status if the user is authenticated and not in the loading state
    if (!isLoading && isAuthenticated) {
      // If the user has not completed onboarding, redirect to the specified path
      if (!onboardingData.completed) {
        navigate(redirectPath);
      }
    }
  }, [isAuthenticated, isLoading, navigate, onboardingData.completed, redirectPath]);

  // For authenticated users, only render children if onboarding is complete
  // For unauthenticated users, always render children (they'll be handled by AuthorizeRoute)
  return !isAuthenticated || onboardingData.completed ? <>{children}</> : null;
}
