import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import StepFormWrapper from './StepFormWrapper';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { useBecomeCompany } from '@/hooks/useRoleMutations';
import { useCreateCompany } from './hooks/useCreateCompany';
import { colors } from '@/lib/design-system';

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

  // Render form step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">
                {t('welcome.companyForm.companyName')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                style={errors.companyName ? { borderColor: colors.error } : undefined}
              />
              {errors.companyName && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.companyNameRequired')}
                </p>
              )}
            </div>{' '}
            <div className="space-y-2">
              <Label htmlFor="industry">
                {t('welcome.companyForm.industry')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleChange('industry', value)}
              >
                <SelectTrigger
                  id="industry"
                  className="w-full"
                  style={errors.industry ? { borderColor: colors.error } : undefined}
                >
                  <SelectValue placeholder={t('welcome.companyForm.selectIndustry') as string} />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: colors.surface, borderColor: colors.blue }}>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.industryRequired')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="activities">
                {t('welcome.companyForm.activities')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Textarea
                id="activities"
                placeholder={t('welcome.companyForm.activitiesPlaceholder')}
                value={formData.activities || ''}
                onChange={(e) => handleChange('activities', e.target.value)}
                rows={2}
                style={errors.activities ? { borderColor: colors.error } : undefined}
              />
              {errors.activities && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.activitiesRequired')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="headquarters">
                {t('welcome.companyForm.headquarters')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="headquarters"
                placeholder={t('welcome.companyForm.headquartersPlaceholder')}
                value={formData.headquarters || ''}
                onChange={(e) => handleChange('headquarters', e.target.value)}
                style={errors.headquarters ? { borderColor: colors.error } : undefined}
              />
              {errors.headquarters && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.headquartersRequired')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearEstablished">
                {t('welcome.companyForm.yearEstablished')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="yearEstablished"
                type="number"
                min="1800"
                max={new Date().getFullYear()}
                placeholder={t('welcome.companyForm.placeholders.yearEstablished')}
                value={formData.yearEstablished || ''}
                onChange={(e) => handleChange('yearEstablished', e.target.value)}
                style={errors.yearEstablished ? { borderColor: colors.error } : undefined}
              />
              {errors.yearEstablished && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.yearEstablishedRequired')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="technologies">
                {t('welcome.companyForm.technologies')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="technologies"
                placeholder={t('welcome.companyForm.placeholders.technologies')}
                value={formData.technologies?.join(', ') || ''}
                onChange={(e) => {
                  const techArray = e.target.value.split(', ').filter(Boolean);
                  updateCompanyData({ technologies: techArray });
                }}
                style={errors.technologies ? { borderColor: colors.error } : undefined}
              />
              {errors.technologies && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.technologiesRequired')}
                </p>
              )}
              <p className="text-sm" style={{ color: colors.textMuted }}>
                {t('welcome.companyForm.technologiesHelp')}
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companySize">
                {t('welcome.companyForm.companySize')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Select
                value={formData.companySize}
                onValueChange={(value) => handleChange('companySize', value)}
              >
                <SelectTrigger
                  id="companySize"
                  className="w-full"
                  style={errors.companySize ? { borderColor: colors.error } : undefined}
                >
                  <SelectValue placeholder={t('welcome.companyForm.selectCompanySize') as string} />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: colors.surface, borderColor: colors.blue }}>
                  {companySizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size} {t('welcome.companyForm.employees')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.companySize && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.companySizeRequired')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">
                {t('welcome.companyForm.website')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="website"
                type="url"
                placeholder={t('welcome.companyForm.placeholders.website')}
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                style={errors.website ? { borderColor: colors.error } : undefined}
              />
              {errors.website && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.websiteRequired')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeesWorldwide">
                {t('welcome.companyForm.globalEmployees')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="employeesWorldwide"
                type="number"
                min="1"
                placeholder={t('welcome.companyForm.placeholders.globalEmployees')}
                value={formData.globalEmployees || ''}
                onChange={(e) => handleChange('globalEmployees', e.target.value)}
                style={errors.globalEmployees ? { borderColor: colors.error } : undefined}
              />
              {errors.globalEmployees && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.globalEmployeesRequired')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hasOfficesInBulgaria">
                {t('welcome.companyForm.hasOfficesInBulgaria')} ({t('welcome.companyForm.optional')}
                )
              </Label>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="hasOfficesInBulgaria"
                  checked={formData.hasOfficesInBulgaria || false}
                  onCheckedChange={(checked) =>
                    updateCompanyData({ hasOfficesInBulgaria: Boolean(checked) })
                  }
                />
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('welcome.companyForm.hasOfficesInBulgaria')}
                </span>
              </div>
            </div>

            {formData.hasOfficesInBulgaria && (
              <div className="space-y-2">
                <Label htmlFor="employeesInBulgaria">
                  {t('welcome.companyForm.employeesInBulgaria')} (
                  {t('welcome.companyForm.optional')})
                </Label>
                <Input
                  id="employeesInBulgaria"
                  type="number"
                  placeholder={t('welcome.companyForm.placeholders.employeesInBulgaria')}
                  value={formData.employeesInBulgaria || ''}
                  onChange={(e) => handleChange('employeesInBulgaria', e.target.value)}
                />
              </div>
            )}

            {formData.hasOfficesInBulgaria && (
              <div className="space-y-2">
                <Label htmlFor="bulgarianOffices">
                  {t('welcome.companyForm.bulgarianOffices')} ({t('welcome.companyForm.optional')})
                </Label>{' '}
                <Input
                  id="bulgarianOffices"
                  placeholder={t('welcome.companyForm.placeholders.bulgarianOffices')}
                  value={formData.bulgarianOffices?.join(', ') || ''}
                  onChange={(e) => {
                    const officesArray = e.target.value.split(', ');
                    updateCompanyData({ bulgarianOffices: officesArray });
                  }}
                />
                <p className="text-sm" style={{ color: colors.textMuted }}>
                  {t('welcome.companyForm.bulgarianOfficesHelp')}
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
                {t('welcome.companyForm.companyLogo')} ({t('welcome.companyForm.optional')})
              </Label>
              <Input id="logo" type="file" accept="image/*" onChange={handleFileChange} />
              <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
                {t('welcome.companyForm.logoHelp')}
              </p>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="about">
                {t('welcome.companyForm.companyAbout')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Textarea
                id="about"
                placeholder={t('welcome.companyForm.companyAboutPlaceholder')}
                rows={3}
                value={formData.about || ''}
                onChange={(e) => handleChange('about', e.target.value)}
                style={errors.about ? { borderColor: colors.error } : undefined}
              />
              {errors.about && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.aboutRequired')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson">
                {t('welcome.companyForm.contactPerson')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson || ''}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
                style={errors.contactPerson ? { borderColor: colors.error } : undefined}
                placeholder={t('welcome.companyForm.placeholders.contactPerson')}
              />
              {errors.contactPerson && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.contactPersonRequired')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              {' '}
              <Label htmlFor="contactEmail">
                {t('welcome.companyForm.contactEmail')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail || ''}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                style={errors.contactEmail ? { borderColor: colors.error } : undefined}
                placeholder={t('welcome.companyForm.placeholders.contactEmail')}
              />
              {errors.contactEmail && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.contactEmailRequired')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">
                {t('welcome.companyForm.contactPhone')}
                <span className="ml-1" style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone || ''}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                style={errors.contactPhone ? { borderColor: colors.error } : undefined}
                placeholder={t('welcome.companyForm.placeholders.contactPhone')}
              />
              {errors.contactPhone && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {t('welcome.companyForm.contactPhoneRequired')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whyWorkWithUs">
                {t('welcome.companyForm.whyWorkWithUs')} ({t('welcome.companyForm.optional')})
              </Label>
              <Textarea
                id="whyWorkWithUs"
                value={formData.whyWorkWithUs || ''}
                onChange={(e) => handleChange('whyWorkWithUs', e.target.value)}
                placeholder={t('welcome.companyForm.placeholders.whyWorkWithUs')}
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
