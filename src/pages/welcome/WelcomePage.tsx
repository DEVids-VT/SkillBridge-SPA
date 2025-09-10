import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelector from './RoleSelector';
import CompanyFormSteps from './CompanyFormSteps';
import CandidateFormSteps from './CandidateFormSteps';
import { UserRole } from '@/types/user/UserOnboarding';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { WelcomeSection, WelcomePageHeader } from './components';
import { colors } from '@/lib/design-system';

export function WelcomePage() {
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
  // Candidate now follows the same in-page step flow

  // Render form based on selected role
  const renderForm = () => {
    if (!selectedRole) return null;

    return selectedRole === 'company' ? (
      <CompanyFormSteps onBackToRoleSelection={handleBackToRoleSelection} />
    ) : (
      <CandidateFormSteps onBackToRoleSelection={handleBackToRoleSelection} />
    );
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0" style={{ backgroundColor: colors.dark }}></div>

      <WelcomeSection className="relative z-10">
        <WelcomePageHeader />

        {/* Main Content */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            {!selectedRole ? (
              <RoleSelector onRoleSelect={handleRoleSelect} />
            ) : (
              <div className="flex justify-center w-full">{renderForm()}</div>
            )}
          </div>
        </div>
      </WelcomeSection>
    </div>
  );
}

export default WelcomePage;
