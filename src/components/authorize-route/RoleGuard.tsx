import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { UserRole } from '@/types/user/UserOnboarding';
import { RoutePage } from '@/types/enums/RoutePage';

interface RoleGuardProps extends PropsWithChildren {
  allowedRole: UserRole;
}

/**
 * Guard component that checks if the user has the correct role
 * If not, redirects to the home page
 */
export default function RoleGuard({ children, allowedRole }: RoleGuardProps) {
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();

  useEffect(() => {
    // If the user doesn't have the correct role, redirect to home
    if (onboardingData.role && onboardingData.role !== allowedRole) {
      navigate(RoutePage.HOME);
    }
  }, [onboardingData.role, allowedRole, navigate]);

  // Only render children if the user has the correct role
  return onboardingData.role === allowedRole ? <>{children}</> : null;
} 