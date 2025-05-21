import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UserRole } from '@/types/user/UserOnboarding';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { colors, typography, spacing, layouts } from '@/lib/design-system';
import CompanyFormSteps from './components/CompanyFormSteps';
import CandidateFormSteps from './components/CandidateFormSteps';
import RoleSelector from './components/RoleSelector';

export function WelcomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { onboardingData, setRole } = useOnboarding();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(onboardingData.role);

  // If onboarding is already completed, redirect to projects
  useEffect(() => {
    if (onboardingData.completed) {
      navigate(RoutePage.PROJECTS);
    }
  }, [onboardingData.completed, navigate]);

  // Handle role selection
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setRole(role);
  };

  // Render form based on selected role
  const renderForm = () => {
    if (!selectedRole) return null;
    return selectedRole === 'company' ? <CompanyFormSteps /> : <CandidateFormSteps />;
  };

  return (
    <div
      className={`min-h-screen bg-background ${spacing.section} flex items-center justify-center`}
    >
      <div className={`${spacing.container} max-w-6xl`}>
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src="/images/sblogosmall.svg" alt="SkillBridge" className="h-14" />
        </div>

        {/* Header */}
        <div className={layouts.pageHeader}>
          <div className={layouts.pageHeaderBackground} />
          <h1
            className={`${typography.heading[1]} bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 mb-6`}
          >
            {t('welcomeToSkillBridge', 'Welcome to SkillBridge!')}
          </h1>
          <p className={typography.body.lg}>
            {t(
              'welcomeDesc',
              `Let's get to know you better. Please tell us who you are so we can personalize your experience.`
            )}
          </p>
        </div>

        {/* Role Selection or Form Steps */}
        <div className="w-full flex justify-center mt-12">
          {!selectedRole ? <RoleSelector onRoleSelect={handleRoleSelect} /> : renderForm()}
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
