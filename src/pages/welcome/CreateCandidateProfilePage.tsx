import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StepFormWrapper from './StepFormWrapper';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { useBecomeCandidate } from '@/hooks/useRoleMutations';
import { useCreateCandidate } from './hooks/useCreateCandidate';
import { CandidateFormStep1, CandidateFormStep2 } from './components';

interface CreateCandidateProfilePageProps {
  onBackToRoleSelection: () => void;
}

export function CreateCandidateProfilePage({
  onBackToRoleSelection,
}: CreateCandidateProfilePageProps) {
  const { t } = useTranslation('welcome');
  const navigate = useNavigate();
  const { updateCandidateData, onboardingData, completeOnboarding, refreshUserRoles } =
    useOnboarding();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const becomeCandidateMutation = useBecomeCandidate();
  const createCandidateMutation = useCreateCandidate();

  // Form validation states
  const [errors, setErrors] = useState({
    username: false,
    cv: false,
    profilePicture: false,
    externalLink: false,
  });

  // Form data from context
  const formData = onboardingData.candidate || {
    username: '',
    cv: null,
    profilePicture: null,
    externalLink: '',
  };

  // Handle form field changes
  const handleChange = (field: string, value: string) => {
    updateCandidateData({ [field]: value });

    // Clear error for the field being edited
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Handle file upload for CV
  const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      updateCandidateData({ cv: event.target.files[0] });
      // Clear error for CV
      if (errors.cv) {
        setErrors((prev) => ({ ...prev, cv: false }));
      }
    }
  };

  // Handle file upload for profile picture
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      updateCandidateData({ profilePicture: event.target.files[0] });
      // Clear error for profile picture
      if (errors.profilePicture) {
        setErrors((prev) => ({ ...prev, profilePicture: false }));
      }
    }
  };

  // Validate current step
  const validateStep = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (currentStep === 1) {
      // Username validation
      if (
        !formData.username.trim() ||
        formData.username.length < 3 ||
        formData.username.length > 50
      ) {
        newErrors.username = true;
        isValid = false;
      }

      // CV validation
      if (!formData.cv) {
        newErrors.cv = true;
        isValid = false;
      }
    } else if (currentStep === 2) {
      // Profile picture validation (optional but if provided, should be valid)
      if (formData.profilePicture) {
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(formData.profilePicture.type)) {
          newErrors.profilePicture = true;
          isValid = false;
        }
      }

      // External link validation (optional but if provided, should be valid URL)
      if (formData.externalLink && formData.externalLink.trim()) {
        try {
          new URL(formData.externalLink);
        } catch {
          newErrors.externalLink = true;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle next step
  const handleNext = async () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // On final step, submit the form and complete onboarding
        try {
          setIsSubmitting(true);

          // First, register as a candidate in Auth0 role
          console.log('Registering candidate role with Auth0...');
          await becomeCandidateMutation.mutateAsync();

          // Then create the candidate profile in our backend
          console.log('Creating candidate profile in backend...', formData);

          // Convert any form fields as needed before submission
          const submissionData = {
            ...formData,
            externalLink: formData.externalLink || undefined,
          };

          await createCandidateMutation.mutateAsync(submissionData);

          // Refresh auth token to get updated roles
          console.log('Refreshing authentication token...');
          await refreshUserRoles();

          // Complete onboarding now that we have submitted the form and refreshed the token
          completeOnboarding();

          // Navigate to projects page
          navigate(RoutePage.PROJECTS);
        } catch (error) {
          console.error('Error during candidate registration:', error);
          // You might want to show an error message to the user
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  // Handle previous step
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render form step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CandidateFormStep1
            formData={{
              username: formData.username,
              cv: formData.cv,
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
              profilePicture: formData.profilePicture,
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

export default CreateCandidateProfilePage;
