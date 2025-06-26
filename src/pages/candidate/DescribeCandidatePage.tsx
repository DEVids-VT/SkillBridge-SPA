import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CandidateForm, FormErrors } from './types';
import CandidateVisualFeedback from './components/CandidateVisualFeedback';
import TagInput from './components/TagInput';
import Notification from './components/Notification';
import { layouts, spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useCreateProject } from '@/hooks/useCreateProject';
import { ProjectRequest } from '@/types/project/project';

// Initial form state
const initialFormState: CandidateForm = {
  roleTitle: '',
  requiredSkills: '',
  yearsExperience: '',
  seniorityLevel: '',
  relevantTechnologies: '',
  industryExperience: '', // optional
  description: '',
};

export default function DescribeCandidatePage() {
  const { t } = useTranslation('candidate');
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CandidateForm>(initialFormState);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formProgress, setFormProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    show: false,
    type: 'info',
    title: '',
    message: '',
  });
  
  // Use the createProject mutation
  const createProject = useCreateProject();

  // Calculate progress based on required fields
  useEffect(() => {
    const requiredFields = [
      'roleTitle',
      'requiredSkills',
      'yearsExperience',
      'seniorityLevel',
      'relevantTechnologies',
      'description',
    ];
    const completedFields = requiredFields.filter((field) =>
      Boolean(formData[field as keyof CandidateForm])
    );
    const progress = (completedFields.length / requiredFields.length) * 100;
    setFormProgress(progress);
  }, [formData]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle tag input changes
  const handleTagInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle select change for dropdown
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      seniorityLevel: value,
    }));

    // Clear error for seniority level
    if (formErrors.seniorityLevel) {
      setFormErrors((prev) => ({
        ...prev,
        seniorityLevel: undefined,
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Validate required fields
    if (!formData.roleTitle.trim()) {
      errors.roleTitle = t('candidatePage.form.roleTitle.error');
      isValid = false;
    }

    if (!formData.requiredSkills.trim()) {
      errors.requiredSkills = t('candidatePage.form.requiredSkills.error');
      isValid = false;
    }

    if (!formData.yearsExperience.trim()) {
      errors.yearsExperience = t('candidatePage.form.yearsExperience.errorRequired');
      isValid = false;
    } else if (isNaN(Number(formData.yearsExperience))) {
      errors.yearsExperience = t('candidatePage.form.yearsExperience.errorNumber');
      isValid = false;
    }

    if (!formData.seniorityLevel) {
      errors.seniorityLevel = t('candidatePage.form.seniorityLevel.error');
      isValid = false;
    }

    if (!formData.relevantTechnologies.trim()) {
      errors.relevantTechnologies = t('candidatePage.form.relevantTechnologies.error');
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = t('candidatePage.form.description.error');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      console.log('Candidate Requirements Submitted:', formData);
      
      // Prepare data for API request
      const projectData: ProjectRequest = {
        roleTitle: formData.roleTitle,
        yearsOfExperience: Number(formData.yearsExperience),
        seniorityLevel: formData.seniorityLevel,
        requiredSkills: formData.requiredSkills.split(',').map(skill => skill.trim()),
        relevantTechnologies: formData.relevantTechnologies.split(',').map(tech => tech.trim()),
        industryExperience: formData.industryExperience ? 
          formData.industryExperience.split(',').map(exp => exp.trim()) : 
          [],
        description: formData.description
      };
      
      // Call the API
      createProject.mutate(projectData, {
        onSuccess: (data) => {
          console.log('Project created successfully:', data);
          setIsSubmitting(false);
          
          // Reset form after successful submission
          setFormData(initialFormState);

          // Show success notification
          setNotification({
            show: true,
            type: 'success',
            title: t('candidatePage.notifications.success.title'),
            message: t('candidatePage.notifications.success.message')
          });
          
          // Redirect to the project detail page after a short delay
          setTimeout(() => {
            navigate(`/projects/${data.id}`);
          }, 2000);
        },
        onError: (error) => {
          setIsSubmitting(false);
          // Show error notification
          setNotification({
            show: true,
            type: 'error',
            title: t('candidatePage.notifications.error.title'),
            message: error.message || t('candidatePage.notifications.error.defaultMessage'),
          });
        },
      });
    }
  };

  // Get progress message based on completion percentage
  const getProgressMessage = () => {
    if (formProgress === 0) {
      return t('candidatePage.progress.messages.start');
    } else if (formProgress < 50) {
      return t('candidatePage.progress.messages.quarter');
    } else if (formProgress < 100) {
      return t('candidatePage.progress.messages.half');
    } else {
      return t('candidatePage.progress.messages.ready');
    }
  };

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8 relative')}>
      {/* Background pattern */}
      <div className="absolute top-8 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute bottom-12 left-8 w-48 h-48 bg-purple-50 dark:bg-purple-900/20 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-green-50 dark:bg-green-900/10 rounded-full opacity-20 blur-3xl -z-10"></div>
      
      {notification.show && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
        />
      )}
      
      {/* Page Header */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">{t('candidatePage.header.title1')}</span>{' '}
          <span className="text-gray-600">{t('candidatePage.header.title2')}</span>
        </h1>
        <p className={layouts.pageDescription}>
          {t('candidatePage.header.subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex items-center">
            <span className="inline-block w-2 h-6 bg-blue-600 mr-3 rounded"></span>
            {t('candidatePage.form.title')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="roleTitle">{t('candidatePage.form.roleTitle.label')}</Label>
              <Input
                id="roleTitle"
                name="roleTitle"
                placeholder={t('candidatePage.form.roleTitle.placeholder')}
                value={formData.roleTitle}
                onChange={handleInputChange}
                className={formErrors.roleTitle ? 'border-red-500' : ''}
              />
              {formErrors.roleTitle && (
                <p className="text-red-500 text-sm mt-1">{formErrors.roleTitle}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="requiredSkills">{t('candidatePage.form.requiredSkills.label')}</Label>
              <TagInput
                id="requiredSkills"
                name="requiredSkills"
                placeholder={t('candidatePage.form.requiredSkills.placeholder')}
                value={formData.requiredSkills}
                onChange={handleTagInputChange}
                hasError={!!formErrors.requiredSkills}
              />
              {formErrors.requiredSkills && (
                <p className="text-red-500 text-sm mt-1">{formErrors.requiredSkills}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="yearsExperience">{t('candidatePage.form.yearsExperience.label')}</Label>
              <div className="relative">
                <Input
                  id="yearsExperience"
                  name="yearsExperience"
                  placeholder={t('candidatePage.form.yearsExperience.placeholder')}
                  type="number"
                  min="0"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  className={`pl-4 pr-12 ${formErrors.yearsExperience ? 'border-red-500' : ''}`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  {t('candidatePage.form.yearsExperience.suffix')}
                </span>
              </div>
              {formErrors.yearsExperience && (
                <p className="text-red-500 text-sm mt-1">{formErrors.yearsExperience}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="seniorityLevel">{t('candidatePage.form.seniorityLevel.label')}</Label>
              <Select value={formData.seniorityLevel} onValueChange={handleSelectChange}>
                <SelectTrigger
                  id="seniorityLevel"
                  className={formErrors.seniorityLevel ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder={t('candidatePage.form.seniorityLevel.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junior">{t('candidatePage.form.seniorityLevel.options.junior')}</SelectItem>
                  <SelectItem value="mid">{t('candidatePage.form.seniorityLevel.options.mid')}</SelectItem>
                  <SelectItem value="senior">{t('candidatePage.form.seniorityLevel.options.senior')}</SelectItem>
                  <SelectItem value="lead">{t('candidatePage.form.seniorityLevel.options.lead')}</SelectItem>
                  <SelectItem value="principal">{t('candidatePage.form.seniorityLevel.options.principal')}</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.seniorityLevel && (
                <p className="text-red-500 text-sm mt-1">{formErrors.seniorityLevel}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="relevantTechnologies">{t('candidatePage.form.relevantTechnologies.label')}</Label>
              <TagInput
                id="relevantTechnologies"
                name="relevantTechnologies"
                placeholder={t('candidatePage.form.relevantTechnologies.placeholder')}
                value={formData.relevantTechnologies}
                onChange={handleTagInputChange}
                hasError={!!formErrors.relevantTechnologies}
              />
              {formErrors.relevantTechnologies && (
                <p className="text-red-500 text-sm mt-1">{formErrors.relevantTechnologies}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="industryExperience">{t('candidatePage.form.industryExperience.label')}</Label>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  {t('candidatePage.form.industryExperience.optional')}
                </span>
              </div>
              <TagInput
                id="industryExperience"
                name="industryExperience"
                placeholder={t('candidatePage.form.industryExperience.placeholder')}
                value={formData.industryExperience}
                onChange={handleTagInputChange}
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="description">{t('candidatePage.form.description.label')}</Label>
              <Textarea
                id="description"
                name="description"
                placeholder={t('candidatePage.form.description.placeholder')}
                value={formData.description}
                onChange={handleInputChange}
                className={`min-h-32 ${formErrors.description ? 'border-red-500' : ''}`}
              />
              {formErrors.description && (
                <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
              )}
            </div>
            
            <div className="pt-4">
              <Button
                type="submit"
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white transition-all ${
                  formProgress === 100 && !isSubmitting ? 'shadow-md hover:shadow-lg' : ''
                }`}
                disabled={formProgress !== 100 || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    {t('candidatePage.form.submit.submitting')}
                  </span>
                ) : (
                  t('candidatePage.form.submit.button')
                )}
              </Button>
              {formProgress < 100 && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {t('candidatePage.form.submit.completeFields')}
                </p>
              )}
            </div>
          </form>
        </div>
        
        {/* Right Column - Visual Feedback */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col">
          <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex items-center">
            <span className="inline-block w-2 h-6 bg-purple-600 mr-3 rounded"></span>
            {t('candidatePage.progress.title')}
          </h2>
          <div className="flex flex-col items-center justify-start flex-grow">
            <div className="relative w-full max-w-md aspect-square">
              <CandidateVisualFeedback
                progress={formProgress}
                formData={{
                  roleTitle: formData.roleTitle,
                  requiredSkills: formData.requiredSkills,
                  seniorityLevel: formData.seniorityLevel,
                }}
              />
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-xl font-medium mb-3">
                {formProgress === 100
                  ? t('candidatePage.progress.complete')
                  : t('candidatePage.progress.incomplete')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                {getProgressMessage()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
