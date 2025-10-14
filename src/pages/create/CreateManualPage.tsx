import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateProject } from './hooks/useCreateProject';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import {
  CreatePageBackground,
  CreatePageHeader,
  CreatePageBackButton,
  CreateManualForm as CreateManualFormComponent,
  OutputTypeSelector,
  Notification
} from './components';
import {
  CreateManualForm,
  CreateManualFormErrors,
  NotificationState,
} from './types';

// Initial form state
const initialFormState: CreateManualForm = {
  description: '',
};

export default function CreateManualPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('createProject');
  const [formData, setFormData] = useState<CreateManualForm>(initialFormState);
  const [formErrors, setFormErrors] = useState<CreateManualFormErrors>({});
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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    if (formErrors[name as keyof CreateManualFormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle output type selection
  const handleOutputTypeSelect = (type: 'scenario' | 'quiz') => {
    if (!validateForm()) {
      setNotification({
        show: true,
        type: 'error',
        title: t('createManualPage.notifications.formIncomplete.title'),
        message: t('createManualPage.notifications.formIncomplete.message'),
      });
      return;
    }
    
    setSelectedOutputType(type);
    handleGenerate(type);
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: CreateManualFormErrors = {};
    let isValid = true;

    if (!formData.description.trim()) {
      errors.description = t('createManualPage.form.description.error');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle generation
  const handleGenerate = (outputType: 'scenario' | 'quiz') => {
    setIsSubmitting(true);
    console.log('Manual Description Submitted:', formData, 'Output Type:', outputType);

    // Prepare data for API request (simplified for manual input)
    const manualData = {
      description: formData.description,
      outputType: outputType,
      type: 'manual', // Flag to indicate this is manual input
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createProject.mutate(manualData as any, {
      onSuccess: (data) => {
        console.log('Manual input processed successfully:', data);
        setIsSubmitting(false);

        // Reset form after successful submission
        setFormData(initialFormState);
        setSelectedOutputType(null);

        // Show success notification
        setNotification({
          show: true,
          type: 'success',
          title: t('createManualPage.notifications.success.title'),
          message: t('createManualPage.notifications.success.message'),
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
          title: t('createManualPage.notifications.error.title'),
          message: error.message || t('createManualPage.notifications.error.defaultMessage'),
        });
      },
    });
  };

  const handleBack = () => {
    navigate('/create');
  };

  const isFormValid = formData.description.trim().length > 0;

  return (
    <div className="relative min-h-screen bg-background">
      <CreatePageBackground variant="manual" />

      <div className={cn(spacing.container, spacing.section)}>
        {notification.show && (
          <Notification
            title={notification.title}
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
          />
        )}

        <CreatePageHeader
          title1={t('createManualPage.header.title1')}
          title2={t('createManualPage.header.title2')}
          subtitle={t('createManualPage.header.subtitle')}
        />

        <CreatePageBackButton
          onBack={handleBack}
          label={t('createManualPage.backButton')}
        />

        {/* Main Content */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <CreateManualFormComponent
              formData={formData}
              formErrors={formErrors}
              onInputChange={handleInputChange}
            />

            {/* Output Type Selector */}
            <div className="mt-8 max-w-4xl mx-auto">
              <OutputTypeSelector
                onSelect={handleOutputTypeSelect}
                disabled={!isFormValid}
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