import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RoleSelector from './RoleSelector';
import CompanyFormSteps from './CompanyFormSteps';
import CandidateFormSteps from './CandidateFormSteps';
import { UserRole } from '@/types/user/UserOnboarding';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { WelcomeSection } from './components';

export function WelcomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { onboardingData, setRole, resetOnboarding } = useOnboarding();
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

  // Handle going back to role selection
  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    resetOnboarding();
  };

  // Render form based on selected role
  const renderForm = () => {
    if (!selectedRole) return null;

    return selectedRole === 'company' ? 
      <CompanyFormSteps onBackToRoleSelection={handleBackToRoleSelection} /> : 
      <CandidateFormSteps onBackToRoleSelection={handleBackToRoleSelection} />;
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50"></div>
      
      <WelcomeSection className="relative z-10">
        {/* Logo Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full backdrop-blur-sm border border-blue-200/50">
            <img 
              src="/images/sblogosmall.svg" 
              alt="SkillBridge" 
              className="h-6 object-contain mr-2" 
            />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
              {t('welcomeBadge', 'Let\'s Get Started')}
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
            <span className="text-gray-900 dark:text-white">
              Welcome to <span className="text-blue-600">SkillBridge</span>!
            </span>
          </h1>
          
        </div>

        {/* Main Content */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            {!selectedRole ? (
              <RoleSelector onRoleSelect={handleRoleSelect} />
            ) : (
              <div className="flex justify-center w-full">
                {renderForm()}
              </div>
            )}
          </div>
        </div>
      </WelcomeSection>
    </div>
  );
}

export default WelcomePage;
