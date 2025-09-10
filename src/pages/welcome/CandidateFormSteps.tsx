import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StepFormWrapper from './StepFormWrapper';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { useBecomeCandidate } from '@/hooks/useRoleMutations';
import { useCreateCandidate } from './hooks/useCreateCandidate';
import { CandidateFormStep1, CandidateFormStep2 } from './components';

interface CandidateFormStepsProps {
  onBackToRoleSelection: () => void;
}

export function CandidateFormSteps({ onBackToRoleSelection }: CandidateFormStepsProps) {
  const { t } = useTranslation('welcome');
  const navigate = useNavigate();
  const { updateCandidateData, onboardingData, completeOnboarding, refreshUserRoles } =
    useOnboarding();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const becomeCandidateMutation = useBecomeCandidate();
  const createCandidateMutation = useCreateCandidate();

  // Validation state
  const [errors, setErrors] = useState({
    username: false,
    cv: false,
    profilePicture: false,
    externalLink: false,
  });

  // Form data from context
  const formData = onboardingData.candidate || {
    username: '',
    cv: null as File | null,
    profilePicture: null as File | null,
    externalLink: '',
  };

  const handleChange = (field: string, value: string) => {
    updateCandidateData({ [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    updateCandidateData({ cv: file });
    if (errors.cv) setErrors((prev) => ({ ...prev, cv: false }));
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    updateCandidateData({ profilePicture: file });
    if (errors.profilePicture) setErrors((prev) => ({ ...prev, profilePicture: false }));
  };

  const validateStep = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (currentStep === 1) {
      const username = formData.username?.trim() || '';
      if (!username || username.length < 3 || username.length > 50) {
        newErrors.username = true;
        isValid = false;
      }
      if (!formData.cv) {
        newErrors.cv = true;
        isValid = false;
      }
    } else if (currentStep === 2) {
      const link = formData.externalLink?.trim();
      if (link) {
        try {
          // eslint-disable-next-line no-new
          new URL(link);
        } catch {
          newErrors.externalLink = true;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
      return;
    }

    try {
      setIsSubmitting(true);
      // Assign candidate role first
      await becomeCandidateMutation.mutateAsync();

      // Prepare submission data
      const submissionData = {
        username: formData.username,
        cv: formData.cv || undefined,
        profilePicture: formData.profilePicture || undefined,
        externalLink: formData.externalLink?.trim() || undefined,
      };

      await createCandidateMutation.mutateAsync(submissionData);

      // Refresh roles and complete onboarding
      await refreshUserRoles();
      completeOnboarding();
      navigate(RoutePage.PROJECTS);
    } catch (error) {
      console.error('Error during candidate registration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CandidateFormStep1
            formData={{
              username: formData.username,
              cv: formData.cv || null,
            }}
            errors={{
              username: errors.username,
              cv: errors.cv,
            }}
            onFieldChange={handleChange}
            onCvChange={handleCvChange}
          />
        );
      case 2:
        return (
          <CandidateFormStep2
            formData={{
              profilePicture: formData.profilePicture || null,
              externalLink: formData.externalLink || '',
            }}
            errors={{
              profilePicture: errors.profilePicture,
              externalLink: errors.externalLink,
            }}
            onFieldChange={handleChange}
            onProfilePictureChange={handleProfilePictureChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <StepFormWrapper
      title={t('welcome.candidateForm.candidateProfileSetup')}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      isLastStep={currentStep === totalSteps}
      isLoading={isSubmitting}
      onBackToRoleSelection={onBackToRoleSelection}
    >
      {renderStepContent()}
    </StepFormWrapper>
  );
}

export default CandidateFormSteps;


