import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import StepFormWrapper from './StepFormWrapper';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { useBecomeCompany } from '@/hooks/useRoleMutations';
import { useCreateCompany } from '@/hooks/useCreateCompany';

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

interface CompanyFormStepsProps {
  onBackToRoleSelection: () => void;
}

export function CompanyFormSteps({ onBackToRoleSelection }: CompanyFormStepsProps) {
  const { t } = useTranslation();
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
    companySize: false,
    website: false,
    contactInfo: false,
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
    } else if (currentStep === 3) {
      // At least one contact method should be provided
      const hasContactInfo =
        (formData.contactEmail && formData.contactEmail.trim()) ||
        (formData.contactPerson && formData.contactPerson.trim());

      if (!hasContactInfo) {
        newErrors.contactInfo = true;
        isValid = false;
      } else {
        newErrors.contactInfo = false;
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
            </div>{' '}
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
            <div className="space-y-2">
              <Label htmlFor="activities">
                {t('activities', 'Company Activities')} ({t('optional', 'optional')})
              </Label>
              <Textarea
                id="activities"
                placeholder={t('activitiesPlaceholder', 'Describe your company activities...')}
                value={formData.activities || ''}
                onChange={(e) => handleChange('activities', e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headquarters">
                {t('headquarters', 'Headquarters Location')} ({t('optional', 'optional')})
              </Label>
              <Input
                id="headquarters"
                placeholder={t('headquartersPlaceholder', 'e.g., San Francisco, CA')}
                value={formData.headquarters || ''}
                onChange={(e) => handleChange('headquarters', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearEstablished">
                {t('yearEstablished', 'Year Established')} ({t('optional', 'optional')})
              </Label>
              <Input
                id="yearEstablished"
                type="number"
                placeholder="2000"
                value={formData.yearEstablished || ''}
                onChange={(e) => handleChange('yearEstablished', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technologies">
                {t('technologies', 'Technologies Used')} ({t('optional', 'optional')})
              </Label>
              <Input
                id="technologies"
                placeholder="e.g., React, TypeScript, Node.js"
                value={formData.technologies?.join(', ') || ''}
                onChange={(e) => {
                  const techArray = e.target.value.split(', ').filter(Boolean);
                  updateCompanyData({ technologies: techArray });
                }}
              />
              <p className="text-sm text-muted-foreground">
                {t('technologiesHelp', 'Separate multiple technologies with commas')}
              </p>
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

            <div className="space-y-2">
              <Label htmlFor="employeesWorldwide">
                {t('globalEmployees', 'Employees Worldwide')} ({t('optional', 'optional')})
              </Label>
              <Input
                id="employeesWorldwide"
                type="number"
                placeholder="e.g., 500"
                value={formData.globalEmployees || ''}
                onChange={(e) => handleChange('globalEmployees', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hasOfficesInBulgaria">
                {t('hasOfficesInBulgaria', 'Offices in Bulgaria')} ({t('optional', 'optional')})
              </Label>
              <div className="flex items-center space-x-3">
                {' '}
                <input
                  type="checkbox"
                  id="hasOfficesInBulgaria"
                  checked={formData.hasOfficesInBulgaria || false}
                  onChange={(e) => updateCompanyData({ hasOfficesInBulgaria: e.target.checked })}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('hasOfficesInBulgaria', 'Company has offices in Bulgaria')}
                </span>
              </div>
            </div>

            {formData.hasOfficesInBulgaria && (
              <div className="space-y-2">
                <Label htmlFor="employeesInBulgaria">
                  {t('employeesInBulgaria', 'Employees in Bulgaria')} ({t('optional', 'optional')})
                </Label>
                <Input
                  id="employeesInBulgaria"
                  type="number"
                  placeholder="e.g., 50"
                  value={formData.employeesInBulgaria || ''}
                  onChange={(e) => handleChange('employeesInBulgaria', e.target.value)}
                />
              </div>
            )}

            {formData.hasOfficesInBulgaria && (
              <div className="space-y-2">
                <Label htmlFor="bulgarianOffices">
                  {t('bulgarianOffices', 'Bulgarian Office Locations')} ({t('optional', 'optional')}
                  )
                </Label>{' '}
                <Input
                  id="bulgarianOffices"
                  placeholder="e.g., Sofia, Plovdiv"
                  value={formData.bulgarianOffices?.join(', ') || ''}
                  onChange={(e) => {
                    const officesArray = e.target.value.split(', ');
                    updateCompanyData({ bulgarianOffices: officesArray });
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  {t('bulgarianOfficesHelp', 'Separate multiple locations with commas')}
                </p>
              </div>
            )}
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
              <Label htmlFor="about">
                {t('companyAbout', 'About Company')} ({t('optional', 'optional')})
              </Label>
              <Textarea
                id="about"
                placeholder={t('companyAboutPlaceholder', 'Tell us about your company...')}
                rows={3}
                value={formData.about || ''}
                onChange={(e) => handleChange('about', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson">
                {t('contactPerson', 'Contact Person')}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson || ''}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
                className={errors.contactInfo ? 'border-red-500' : ''}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              {' '}
              <Label htmlFor="contactEmail">
                {t('contactEmail', 'Contact Email')}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail || ''}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className={errors.contactInfo ? 'border-red-500' : ''}
                placeholder="contact@example.com"
              />
              {errors.contactInfo && (
                <p className="text-red-500 text-sm mt-1">
                  {t('contactInfoRequired', 'At least one contact method is required')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">
                {t('contactPhone', 'Contact Phone')} ({t('optional', 'optional')})
              </Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone || ''}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                placeholder="+1 234 567 890"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whyWorkWithUs">
                {t('whyWorkWithUs', 'Why Work With Us')} ({t('optional', 'optional')})
              </Label>
              <Textarea
                id="whyWorkWithUs"
                value={formData.whyWorkWithUs || ''}
                onChange={(e) => handleChange('whyWorkWithUs', e.target.value)}
                placeholder="Tell candidates why they should work with your company..."
                rows={3}
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
      isLoading={isSubmitting}
      onBackToRoleSelection={onBackToRoleSelection}
    >
      {renderStepContent()}
    </StepFormWrapper>
  );
}

export default CompanyFormSteps;
