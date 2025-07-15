import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateProject } from '@/hooks/useCreateProject';
import { ProjectRequest } from '@/types/project/project';
import { spacing, colors, layouts, cards, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CreateProjectForm from './components/persona/CreateProjectForm';
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

  // Calculate progress (kept for validation, but not displayed)
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

    if (formErrors[name as keyof CreateProjectFormErrors]) {
      setFormErrors((prev: CreateProjectFormErrors) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData((prev: CreateProjectFormType) => ({
      ...prev,
      seniorityLevel: value,
    }));

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
        title: t('createPersonaPage.notifications.formIncomplete.title'),
        message: t('createPersonaPage.notifications.formIncomplete.message'),
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
      outputType: outputType,
    };

    createProject.mutate(personaData, {
      onSuccess: (data) => {
        setIsSubmitting(false);
        setFormData(initialFormState);
        setSelectedOutputType(null);
        setNotification({
          show: true,
          type: 'success',
          title: t('createProjectPage.notifications.success.title'),
          message: t('createProjectPage.notifications.success.message'),
        });
        setTimeout(() => {
          navigate(`/${outputType}/${data.id}`);
        }, 2000);
      },
      onError: (error) => {
        setIsSubmitting(false);
        setSelectedOutputType(null);
        setNotification({
          show: true,
          type: 'error',
          title: t('createProjectPage.notifications.error.title'),
          message: error.message || t('createProjectPage.notifications.error.defaultMessage'),
        });
      },
    });
  };

  const handleBack = () => {
    navigate('/create');
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.dark }}>
      {/* Background accent elements only - no grid pattern */}
      <div 
        className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: colors.blue }}
      />
      <div 
        className="absolute bottom-20 left-20 w-60 h-60 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: colors.blueDark }}
      />
      <div 
        className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: colors.orange }}
      />

      <div className={cn(spacing.container, spacing.section)}>
        {notification.show && (
          <Notification
            title={notification.title}
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification((prev: NotificationState) => ({ ...prev, show: false }))}
          />
        )}

        {/* Page Header - Single header div */}
        <div className="text-center mb-12">
          <h1 className={cn(typography.sectionTitle.large, 'mb-4')}>
            <span style={{ color: colors.orange }}>{t('createPersonaPage.header.title1')}</span>{' '}
            <span style={{ color: colors.white }}>{t('createPersonaPage.header.title2')}</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t('createPersonaPage.header.subtitle')}
          </p>
        </div>

        {/* Back Button - Positioned above the card */}
        <div className="flex justify-start mb-6">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="flex items-center gap-2 text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            {t('createPersonaPage.backButton')}
          </Button>
        </div>

        {/* Main Content - Single Centered Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className={cards.base}>
              <div className={cards.header}>
                <h2 className="text-2xl font-bold text-white">
                  <span 
                    className="inline-block w-2 h-6 mr-3 rounded"
                    style={{ backgroundColor: colors.orange }}
                  />
                  {t('createProjectPage.form.title')}
                </h2>
              </div>
              
              <div className={cards.body}>
                <CreateProjectForm
                  formData={formData}
                  formErrors={formErrors}
                  isSubmitting={isSubmitting}
                  onInputChange={handleInputChange}
                  onTagInputChange={handleTagInputChange}
                  onSelectChange={handleSelectChange}
                  onSubmit={(e) => e.preventDefault()}
                />
              </div>
            </div>

            {/* Output Type Selector */}
            <div className="mt-8 max-w-4xl mx-auto">
              <OutputTypeSelector
                onSelect={handleOutputTypeSelect}
                disabled={formProgress < 100}
                loading={isSubmitting}
                selectedType={selectedOutputType}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 