import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import StepFormWrapper from './StepFormWrapper';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { cn } from '@/lib/utils';

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

// Technology options
const technologyOptions = [
  'React',
  'Angular',
  'Vue.js',
  'Node.js',
  'Python',
  'Java',
  'C#',
  '.NET',
  'PHP',
  'Ruby',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'Flutter',
  'React Native',
  'AWS',
  'Azure',
  'GCP',
  'Docker',
  'Kubernetes',
  'Machine Learning',
  'AI',
  'Blockchain',
  'IoT',
  'Mobile Development',
  'Web Development',
  'DevOps',
  'Cybersecurity',
  'Cloud Computing',
];

export function CompanyFormSteps() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateCompanyData, onboardingData, completeOnboarding } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    onboardingData.company?.technologies || []
  );
  const [techInput, setTechInput] = useState('');

  // Form validation states
  const [errors, setErrors] = useState({
    companyName: false,
    industry: false,
    companySize: false,
    website: false,
    about: false,
    activities: false,
    sector: false,
    headquarters: false,
    yearEstablished: false,
    employeesInBulgaria: false,
    globalEmployees: false,
    contactEmail: false,
  });

  // Form data from context
  const formData = onboardingData.company || {
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    logo: null,
    banner: null,
    about: '',
    activities: '',
    sector: '',
    headquarters: '',
    technologies: [],
    yearEstablished: undefined,
    hasOfficesInBulgaria: false,
    bulgarianOffices: [],
    employeesInBulgaria: undefined,
    globalEmployees: undefined,
    whyWorkWithUs: '',
    contactEmail: '',
    contactPhone: '',
    contactPerson: '',
  };

  // Handle form field changes
  const handleChange = (field: string, value: string | number | boolean | string[]) => {
    updateCompanyData({ [field]: value });

    // Clear error for the field being edited
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'banner') => {
    if (event.target.files && event.target.files[0]) {
      updateCompanyData({ [field]: event.target.files[0] });
    }
  };

  // Handle adding a technology
  const handleAddTechnology = (tech: string) => {
    if (!selectedTechnologies.includes(tech)) {
      const newTechs = [...selectedTechnologies, tech];
      setSelectedTechnologies(newTechs);
      updateCompanyData({ technologies: newTechs });
    }
    setTechInput('');
  };

  // Handle removing a technology
  const handleRemoveTechnology = (tech: string) => {
    const newTechs = selectedTechnologies.filter((t) => t !== tech);
    setSelectedTechnologies(newTechs);
    updateCompanyData({ technologies: newTechs });
  };

  // Filter technologies based on input
  const filteredTechnologies = techInput
    ? technologyOptions.filter(
        (tech) =>
          tech.toLowerCase().includes(techInput.toLowerCase()) && !selectedTechnologies.includes(tech)
      )
    : [];

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
      if (!formData.about?.trim()) {
        newErrors.about = true;
        isValid = false;
      }
      if (!formData.activities?.trim()) {
        newErrors.activities = true;
        isValid = false;
      }
      if (!formData.sector?.trim()) {
        newErrors.sector = true;
        isValid = false;
      }
      if (!formData.headquarters?.trim()) {
        newErrors.headquarters = true;
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.yearEstablished) {
        newErrors.yearEstablished = true;
        isValid = false;
      }
      if (!formData.employeesInBulgaria) {
        newErrors.employeesInBulgaria = true;
        isValid = false;
      }
      if (!formData.globalEmployees) {
        newErrors.globalEmployees = true;
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (!formData.contactEmail?.trim()) {
        newErrors.contactEmail = true;
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
        navigate(RoutePage.PROJECTS);
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
          <div className="space-y-6">
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
                  className={cn(errors.companyName && 'border-red-500')}
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
                  className={cn(
                    'w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    errors.industry ? 'border-red-500' : 'border-input'
                  )}
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
                <Label htmlFor="about">
                  {t('aboutCompany', 'About the Company')}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Textarea
                  id="about"
                  value={formData.about}
                  onChange={(e) => handleChange('about', e.target.value)}
                  className={cn(errors.about && 'border-red-500')}
                  rows={4}
                />
                {errors.about && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('aboutRequired', 'Please provide information about your company')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="activities">
                  {t('activities', 'Activities')}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="activities"
                  value={formData.activities}
                  onChange={(e) => handleChange('activities', e.target.value)}
                  placeholder={t('activitiesPlaceholder', 'e.g., Product company')}
                  className={cn(errors.activities && 'border-red-500')}
                />
                {errors.activities && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('activitiesRequired', 'Please specify your company activities')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">
                  {t('sector', 'Sector')}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="sector"
                  value={formData.sector}
                  onChange={(e) => handleChange('sector', e.target.value)}
                  placeholder={t('sectorPlaceholder', 'e.g., IoT')}
                  className={cn(errors.sector && 'border-red-500')}
                />
                {errors.sector && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('sectorRequired', 'Please specify your company sector')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="headquarters">
                  {t('headquarters', 'Headquarters')}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="headquarters"
                  value={formData.headquarters}
                  onChange={(e) => handleChange('headquarters', e.target.value)}
                  placeholder={t('headquartersPlaceholder', 'e.g., Sofia, Bulgaria')}
                  className={cn(errors.headquarters && 'border-red-500')}
                />
                {errors.headquarters && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('headquartersRequired', 'Please specify your company headquarters')}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yearEstablished">
                  {t('yearEstablished', 'Year of Establishment')}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="yearEstablished"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.yearEstablished || ''}
                  onChange={(e) => handleChange('yearEstablished', parseInt(e.target.value))}
                  className={cn(errors.yearEstablished && 'border-red-500')}
                />
                {errors.yearEstablished && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('yearEstablishedRequired', 'Please specify the year of establishment')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeesInBulgaria">
                  {t('employeesInBulgaria', 'Employees in Bulgaria')}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="employeesInBulgaria"
                  type="number"
                  min="0"
                  value={formData.employeesInBulgaria || ''}
                  onChange={(e) => handleChange('employeesInBulgaria', parseInt(e.target.value))}
                  className={cn(errors.employeesInBulgaria && 'border-red-500')}
                />
                {errors.employeesInBulgaria && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('employeesInBulgariaRequired', 'Please specify the number of employees in Bulgaria')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="globalEmployees">
                  {t('globalEmployees', 'Global Employees')}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="globalEmployees"
                  type="number"
                  min="0"
                  value={formData.globalEmployees || ''}
                  onChange={(e) => handleChange('globalEmployees', parseInt(e.target.value))}
                  className={cn(errors.globalEmployees && 'border-red-500')}
                />
                {errors.globalEmployees && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('globalEmployeesRequired', 'Please specify the total number of employees')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasOfficesInBulgaria"
                    checked={formData.hasOfficesInBulgaria}
                    onCheckedChange={(checked: boolean) => handleChange('hasOfficesInBulgaria', checked)}
                  />
                  <Label htmlFor="hasOfficesInBulgaria">
                    {t('hasOfficesInBulgaria', 'Has offices in Bulgaria')}
                  </Label>
                </div>
              </div>

              {formData.hasOfficesInBulgaria && (
                <div className="space-y-2">
                  <Label htmlFor="bulgarianOffices">
                    {t('bulgarianOffices', 'Office Locations in Bulgaria')}
                  </Label>
                  <Textarea
                    id="bulgarianOffices"
                    value={formData.bulgarianOffices?.join('\n') || ''}
                    onChange={(e) => {
                      const locations = e.target.value.split('\n').filter((loc) => loc.trim());
                      handleChange('bulgarianOffices', locations);
                    }}
                    placeholder={t('bulgarianOfficesPlaceholder', 'Enter each location on a new line')}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technologies">
                  {t('technologies', 'Technologies')}
                </Label>
                <div className="space-y-2">
                  <Input
                    id="technologies"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder={t('technologiesPlaceholder', 'Search or type to add technologies...')}
                  />
                  {filteredTechnologies.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {filteredTechnologies.map((tech) => (
                        <div
                          key={tech}
                          className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 cursor-pointer rounded-md"
                          onClick={() => handleAddTechnology(tech)}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTechnologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(tech)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whyWorkWithUs">
                  {t('whyWorkWithUs', 'Why work with us?')}
                </Label>
                <Textarea
                  id="whyWorkWithUs"
                  value={formData.whyWorkWithUs}
                  onChange={(e) => handleChange('whyWorkWithUs', e.target.value)}
                  placeholder={t('whyWorkWithUsPlaceholder', 'Tell potential candidates why they should join your company...')}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">
                  {t('contactEmail', 'Contact Email')}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  className={cn(errors.contactEmail && 'border-red-500')}
                />
                {errors.contactEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('contactEmailRequired', 'Please provide a valid email address')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">
                  {t('contactPhone', 'Contact Phone')}
                </Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">
                  {t('contactPerson', 'Contact Person')}
                </Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleChange('contactPerson', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">
                  {t('companyLogo', 'Company Logo')}
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'logo')}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {t('logoHelp', 'Upload a square logo, preferably 512x512px or larger')}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner">
                  {t('companyBanner', 'Company Banner')}
                </Label>
                <Input
                  id="banner"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'banner')}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {t('bannerHelp', 'Upload a banner image, recommended size 1920x400px')}
                </p>
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
                  className={cn(errors.website && 'border-red-500')}
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">
                    {t('websiteRequired', 'Website URL is required')}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <StepFormWrapper
      title={t('companyOnboarding', 'Company Onboarding')}
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
