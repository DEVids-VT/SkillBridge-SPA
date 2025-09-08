import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StepFormWrapper from './StepFormWrapper';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { useBecomeCompany } from '@/hooks/useRoleMutations';
import { useCreateCompany } from './hooks/useCreateCompany';
import { CompanyFormStep1, CompanyFormStep2, CompanyFormStep3 } from './components';

interface CompanyFormStepsProps {
  onBackToRoleSelection: () => void;
}

export function CompanyFormSteps({ onBackToRoleSelection }: CompanyFormStepsProps) {
  const { t } = useTranslation('welcome');
  const navigate = useNavigate();
  const { updateCompanyData, onboardingData, completeOnboarding, refreshUserRoles } =
    useOnboarding();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const becomeCompanyMutation = useBecomeCompany();
  const createCompanyMutation = useCreateCompany();

  // Form validation states
  const [errors, setErrors] = useState({
    companyName: false,
    industry: false,
    activities: false,
    headquarters: false,
    technologies: false,
    companySize: false,
    globalEmployees: false,
    website: false,
    yearEstablished: false,
    about: false,
    contactPerson: false,
    contactEmail: false,
    contactPhone: false,
  });

  // Form data from context
  const formData = onboardingData.company || {
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    logo: null,
  };
  // Handle form field changes
  const handleChange = (field: string, value: string | number) => {
    // Handle numeric fields
    if (
      field === 'yearEstablished' ||
      field === 'employeesInBulgaria' ||
      field === 'globalEmployees'
    ) {
      const numValue = value === '' ? undefined : Number(value);
      updateCompanyData({ [field]: numValue });
    } else {
      updateCompanyData({ [field]: value });
    }

    // Clear error for the field being edited
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Handle file upload for logo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      updateCompanyData({ logo: event.target.files[0] });
    }
  };
  // Validate current step
  const validateStep = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (currentStep === 1) {
      // Required fields with length validation
      if (!formData.companyName.trim() || formData.companyName.length > 100) {
        newErrors.companyName = true;
        isValid = false;
      }

      if (!formData.industry) {
        newErrors.industry = true;
        isValid = false;
      }

      if (!formData.activities || formData.activities.length > 500) {
        newErrors.activities = true;
        isValid = false;
      }

      if (!formData.headquarters || formData.headquarters.length > 200) {
        newErrors.headquarters = true;
        isValid = false;
      }

      if (
        !formData.technologies ||
        formData.technologies.length === 0 ||
        formData.technologies.join(', ').length > 1000
      ) {
        newErrors.technologies = true;
        isValid = false;
      }

      if (!formData.yearEstablished || formData.yearEstablished < 1800) {
        newErrors.yearEstablished = true;
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.companySize) {
        newErrors.companySize = true;
        isValid = false;
      }

      if (!formData.website.trim() || formData.website.length > 500) {
        newErrors.website = true;
        isValid = false;
      }

      if (!formData.globalEmployees || formData.globalEmployees <= 0) {
        newErrors.globalEmployees = true;
        isValid = false;
      }
    } else if (currentStep === 3) {
      // About field validation
      if (!formData.about || formData.about.length > 2000) {
        newErrors.about = true;
        isValid = false;
      }

      // Contact person validation
      if (
        !formData.contactPerson ||
        formData.contactPerson.trim().length === 0 ||
        formData.contactPerson.length > 100
      ) {
        newErrors.contactPerson = true;
        isValid = false;
      }

      // Contact email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        !formData.contactEmail ||
        formData.contactEmail.trim().length === 0 ||
        formData.contactEmail.length > 255 ||
        !emailRegex.test(formData.contactEmail)
      ) {
        newErrors.contactEmail = true;
        isValid = false;
      }

      // Contact phone validation
      if (
        !formData.contactPhone ||
        formData.contactPhone.trim().length === 0 ||
        formData.contactPhone.length > 20
      ) {
        newErrors.contactPhone = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }; // Handle next step
  const handleNext = async () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // On final step, submit the form and complete onboarding
        try {
          setIsSubmitting(true);

          // First, register as a company in Auth0 role
          console.log('Registering company role with Auth0...');
          await becomeCompanyMutation.mutateAsync(); // Then create the company profile in our backend
          console.log('Creating company profile in backend...', formData);

          // Convert any form fields as needed before submission
          const submissionData = {
            ...formData,
            yearEstablished: formData.yearEstablished
              ? Number(formData.yearEstablished)
              : undefined,
            employeesInBulgaria: formData.employeesInBulgaria
              ? Number(formData.employeesInBulgaria)
              : undefined,
            globalEmployees: formData.globalEmployees
              ? Number(formData.globalEmployees)
              : undefined,
          };

          await createCompanyMutation.mutateAsync(submissionData);

          // Refresh auth token to get updated roles
          console.log('Refreshing authentication token...');
          await refreshUserRoles();

          // Complete onboarding now that we have submitted the form and refreshed the token
          completeOnboarding();

          // Navigate to projects page
          navigate(RoutePage.PROJECTS);
        } catch (error) {
          console.error('Error during company registration:', error);
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

  // Handler functions for form step components
  const handleTechnologiesChange = (technologies: string[]) => {
    updateCompanyData({ technologies });
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    updateCompanyData({ [field]: checked });
  };

  const handleBulgarianOfficesChange = (offices: string[]) => {
    updateCompanyData({ bulgarianOffices: offices });
  };

  // Render form step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyFormStep1
            formData={{
              companyName: formData.companyName,
              industry: formData.industry,
              activities: formData.activities || '',
              headquarters: formData.headquarters || '',
              yearEstablished: formData.yearEstablished || '',
              technologies: formData.technologies || [],
            }}
            errors={{
              companyName: errors.companyName,
              industry: errors.industry,
              activities: errors.activities,
              headquarters: errors.headquarters,
              yearEstablished: errors.yearEstablished,
              technologies: errors.technologies,
            }}
            onFieldChange={handleChange}
            onTechnologiesChange={handleTechnologiesChange}
          />
        );

      case 2:
        return (
          <CompanyFormStep2
            formData={{
              companySize: formData.companySize,
              website: formData.website,
              globalEmployees: formData.globalEmployees || '',
              hasOfficesInBulgaria: formData.hasOfficesInBulgaria || false,
              employeesInBulgaria: formData.employeesInBulgaria || '',
              bulgarianOffices: formData.bulgarianOffices || [],
            }}
            errors={{
              companySize: errors.companySize,
              website: errors.website,
              globalEmployees: errors.globalEmployees,
            }}
            onFieldChange={handleChange}
            onCheckboxChange={handleCheckboxChange}
            onBulgarianOfficesChange={handleBulgarianOfficesChange}
          />
        );

      case 3:
        return (
          <CompanyFormStep3
            formData={{
              about: formData.about || '',
              contactPerson: formData.contactPerson || '',
              contactEmail: formData.contactEmail || '',
              contactPhone: formData.contactPhone || '',
              whyWorkWithUs: formData.whyWorkWithUs || '',
            }}
            errors={{
              about: errors.about,
              contactPerson: errors.contactPerson,
              contactEmail: errors.contactEmail,
              contactPhone: errors.contactPhone,
            }}
            onFieldChange={handleChange}
            onFileChange={handleFileChange}
          />
        );

      default:
        return null;
    }
  };
  return (
    <StepFormWrapper
      title={t('welcome.companyForm.companyProfileSetup')}
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

export default CompanyFormSteps;
