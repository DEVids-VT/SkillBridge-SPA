import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import StepFormWrapper from './StepFormWrapper';
import { useOnboarding } from './OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';

// Industry options
const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Construction',
  'Entertainment',
  'Transportation',
  'Other',
];

// Company size options
const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

export function CompanyFormSteps() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateCompanyData, onboardingData, completeOnboarding } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Form validation states
  const [errors, setErrors] = useState({
    companyName: false,
    industry: false,
    companySize: false,
    website: false,
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
  const handleChange = (field: string, value: string) => {
    updateCompanyData({ [field]: value });

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
      if (!formData.companyName.trim()) {
        newErrors.companyName = true;
        isValid = false;
      }

      if (!formData.industry) {
        newErrors.industry = true;
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.companySize) {
        newErrors.companySize = true;
        isValid = false;
      }

      if (!formData.website.trim()) {
        newErrors.website = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Complete onboarding on final step
        completeOnboarding();
        navigate(RoutePage.DASHBOARD);
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">
                {t('companyName', 'Company Name')}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className={errors.companyName ? 'border-red-500' : ''}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {t('companyNameRequired', 'Company name is required')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">
                {t('industry', 'Industry')}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                className={`w-full rounded-md border ${
                  errors.industry ? 'border-red-500' : 'border-input'
                } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
              >
                <option value="">{t('selectIndustry', 'Select Industry')}</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <p className="text-red-500 text-sm mt-1">
                  {t('industryRequired', 'Please select your industry')}
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companySize">
                {t('companySize', 'Company Size')}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <select
                id="companySize"
                value={formData.companySize}
                onChange={(e) => handleChange('companySize', e.target.value)}
                className={`w-full rounded-md border ${
                  errors.companySize ? 'border-red-500' : 'border-input'
                } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
              >
                <option value="">{t('selectCompanySize', 'Select Company Size')}</option>
                {companySizes.map((size) => (
                  <option key={size} value={size}>
                    {size} {t('employees', 'employees')}
                  </option>
                ))}
              </select>
              {errors.companySize && (
                <p className="text-red-500 text-sm mt-1">
                  {t('companySizeRequired', 'Please select your company size')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">
                {t('website', 'Company Website')}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className={errors.website ? 'border-red-500' : ''}
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">
                  {t('websiteRequired', 'Website URL is required')}
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo">
                {t('companyLogo', 'Company Logo')} ({t('optional', 'optional')})
              </Label>
              <Input id="logo" type="file" accept="image/*" onChange={handleFileChange} />
              <p className="text-sm text-muted-foreground mt-1">
                {t('logoHelp', 'Upload a square logo, preferably 512x512px or larger')}
              </p>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="summary">
                {t('companySummary', 'Company Summary')} ({t('optional', 'optional')})
              </Label>
              <Textarea
                id="summary"
                placeholder={t('companySummaryPlaceholder', 'Tell us about your company...')}
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <StepFormWrapper
      title={t('companyProfileSetup', 'Company Profile Setup')}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      isLastStep={currentStep === totalSteps}
    >
      {renderStepContent()}
    </StepFormWrapper>
  );
}

export default CompanyFormSteps;
