import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RoleSelector from './RoleSelector';
import CompanyFormSteps from './CompanyFormSteps';
import CandidateFormSteps from './CandidateFormSteps';
import { UserRole } from '@/types/user/UserOnboarding';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { colors, typography } from '@/lib/design-system';

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
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
          <img src="/images/sblogosmall.svg" alt="SkillBridge" className="h-14" />
        </div>

        {/* Header */}
        <div className="text-center mb-12 max-w-3xl">
          <h1
            className={`${typography.heading[2]} mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600`}
          >
            {t('welcomeToSkillBridge', 'Welcome to SkillBridge!')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t(
              'welcomeDesc',
              `Let's get to know you better. Please tell us who you are so we can personalize your experience.`
            )}
          </p>
        </div>

        {/* Role Selection or Form Steps */}
        <div className="w-full flex justify-center">
          {!selectedRole ? <RoleSelector onRoleSelect={handleRoleSelect} /> : renderForm()}
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
