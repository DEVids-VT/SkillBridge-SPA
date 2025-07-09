import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateProject } from '@/hooks/useCreateProject';
import { ProjectRequest } from '@/types/project/project';
import { spacing, colors, layouts } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import CreateProjectForm from './components/persona/CreateProjectForm';
import CreateProjectHeader from './components/persona/CreateProjectHeader';
import CreateProjectProgress from './components/persona/CreateProjectProgress';
import Notification from './components/persona/Notification';
import { OutputTypeSelector } from './components/shared/OutputTypeSelector';
import {
  CreateProjectForm as CreateProjectFormType,
  CreateProjectFormErrors,
  NotificationState,
} from './types.ts';

// Initial form state
const initialFormState: CreateProjectFormType = {
  roleTitle: '',
  requiredSkills: '',
  yearsExperience: '',
  seniorityLevel: '',
  relevantTechnologies: '',
  industryExperience: '', // optional
  description: '',
};

export default function CreatePersonaPage() {
  const { t } = useTranslation('createProject');
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateProjectFormType>(initialFormState);
  const [formErrors, setFormErrors] = useState<CreateProjectFormErrors>({});
  const [formProgress, setFormProgress] = useState(0);
  const [selectedOutputType, setSelectedOutputType] = useState<'scenario' | 'quiz' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
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
      Boolean(formData[field as keyof CreateProjectFormType])
    );
    const progress = (completedFields.length / requiredFields.length) * 100;
    setFormProgress(progress);
  }, [formData]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CreateProjectFormType) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    if (formErrors[name as keyof CreateProjectFormErrors]) {
      setFormErrors((prev: CreateProjectFormErrors) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle tag input changes
  const handleTagInputChange = (name: string, value: string) => {
    setFormData((prev: CreateProjectFormType) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    if (formErrors[name as keyof CreateProjectFormErrors]) {
      setFormErrors((prev: CreateProjectFormErrors) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle select change for dropdown
  const handleSelectChange = (value: string) => {
    setFormData((prev: CreateProjectFormType) => ({
      ...prev,
      seniorityLevel: value,
    }));

    // Clear error for seniority level
    if (formErrors.seniorityLevel) {
      setFormErrors((prev: CreateProjectFormErrors) => ({
        ...prev,
        seniorityLevel: undefined,
      }));
    }
  };

  // Handle output type selection
  const handleOutputTypeSelect = (type: 'scenario' | 'quiz') => {
    if (!validateForm()) {
      setNotification({
        show: true,
        type: 'error',
        title: 'Form Incomplete',
        message: 'Please complete all required fields before selecting output type.',
      });
      return;
    }
    
    setSelectedOutputType(type);
    handleGenerate(type);
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: CreateProjectFormErrors = {};
    let isValid = true;

    // Validate required fields
    if (!formData.roleTitle.trim()) {
      errors.roleTitle = t('createProjectPage.form.roleTitle.error');
      isValid = false;
    }

    if (!formData.requiredSkills.trim()) {
      errors.requiredSkills = t('createProjectPage.form.requiredSkills.error');
      isValid = false;
    }

    if (!formData.yearsExperience.trim()) {
      errors.yearsExperience = t('createProjectPage.form.yearsExperience.errorRequired');
      isValid = false;
    } else if (isNaN(Number(formData.yearsExperience))) {
      errors.yearsExperience = t('createProjectPage.form.yearsExperience.errorNumber');
      isValid = false;
    }

    if (!formData.seniorityLevel) {
      errors.seniorityLevel = t('createProjectPage.form.seniorityLevel.error');
      isValid = false;
    }

    if (!formData.relevantTechnologies.trim()) {
      errors.relevantTechnologies = t('createProjectPage.form.relevantTechnologies.error');
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = t('createProjectPage.form.description.error');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle generation
  const handleGenerate = (outputType: 'scenario' | 'quiz') => {
    setIsSubmitting(true);
    console.log('Create Persona Requirements Submitted:', formData, 'Output Type:', outputType);

    // Prepare data for API request
    const personaData: ProjectRequest & { outputType: 'scenario' | 'quiz' } = {
      roleTitle: formData.roleTitle,
      yearsOfExperience: Number(formData.yearsExperience),
      seniorityLevel: formData.seniorityLevel,
              requiredSkills: formData.requiredSkills.split(',').map((skill: string) => skill.trim()),
        relevantTechnologies: formData.relevantTechnologies.split(',').map((tech: string) => tech.trim()),
        industryExperience: formData.industryExperience
          ? formData.industryExperience.split(',').map((exp: string) => exp.trim())
        : [],
      description: formData.description,
      outputType: outputType, // Add the output type to the request
    };

    // Call the API
    createProject.mutate(personaData, {
      onSuccess: (data) => {
        console.log('Persona processed successfully:', data);
        setIsSubmitting(false);

        // Reset form after successful submission
        setFormData(initialFormState);
        setSelectedOutputType(null);

        // Show success notification
        setNotification({
          show: true,
          type: 'success',
          title: t('createProjectPage.notifications.success.title'),
          message: t('createProjectPage.notifications.success.message'),
        });

        // Redirect to the appropriate result page based on output type
        setTimeout(() => {
          navigate(`/${outputType}/${data.id}`);
        }, 2000);
      },
      onError: (error) => {
        setIsSubmitting(false);
        setSelectedOutputType(null);
        // Show error notification
        setNotification({
          show: true,
          type: 'error',
          title: t('createProjectPage.notifications.error.title'),
          message: error.message || t('createProjectPage.notifications.error.defaultMessage'),
        });
      },
    });
  };

  // Get progress message based on completion percentage
  const getProgressMessage = () => {
    if (formProgress === 0) {
      return t('createProjectPage.progress.messages.start');
    } else if (formProgress < 50) {
      return t('createProjectPage.progress.messages.quarter');
    } else if (formProgress < 100) {
      return t('createProjectPage.progress.messages.half');
    } else {
      return t('createProjectPage.progress.messages.ready');
    }
  };

  const handleBack = () => {
    navigate('/create');
  };

  return (
    <div className={cn(spacing.container, spacing.section, 'relative min-h-screen')} style={{ backgroundColor: colors.dark }}>
      {/* Background pattern using design system colors */}
      <div 
        className="absolute top-8 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl -z-10"
        style={{ backgroundColor: colors.blue }}
      ></div>
      <div 
        className="absolute bottom-12 left-8 w-48 h-48 rounded-full opacity-20 blur-3xl -z-10"
        style={{ backgroundColor: colors.blueDark }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full opacity-15 blur-3xl -z-10"
        style={{ backgroundColor: colors.orange }}
      ></div>

      {notification.show && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification((prev: NotificationState) => ({ ...prev, show: false }))}
        />
      )}

      {/* Page Header */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            ← Back
          </Button>
          <CreateProjectHeader
            title1="Create via Persona"
            title2="Describe the Profile"
            subtitle="Provide detailed information about the persona to generate appropriate content"
          />
          <div></div> {/* Spacer for center alignment */}
        </div>
      </div>

      <div className={layouts.grid.cards2}>
        {/* Left Column - Form */}
        <div>
          <CreateProjectForm
            formData={formData}
            formErrors={formErrors}
            isSubmitting={isSubmitting}
            onInputChange={handleInputChange}
            onTagInputChange={handleTagInputChange}
            onSelectChange={handleSelectChange}
            onSubmit={(e) => e.preventDefault()} // Prevent default form submission
          />
          
          {/* Output Type Selector */}
          <OutputTypeSelector
            onSelect={handleOutputTypeSelect}
            disabled={formProgress < 100}
            loading={isSubmitting}
            selectedType={selectedOutputType}
          />
        </div>

        {/* Right Column - Progress */}
        <CreateProjectProgress
          progress={formProgress}
          formData={{
            roleTitle: formData.roleTitle,
            requiredSkills: formData.requiredSkills,
            seniorityLevel: formData.seniorityLevel,
          }}
          getProgressMessage={getProgressMessage}
        />
      </div>
    </div>
  );
} 