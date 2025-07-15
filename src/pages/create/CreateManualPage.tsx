import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateProject } from '@/hooks/useCreateProject';
import { spacing, colors, layouts, cards, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { OutputTypeSelector } from './components/shared/OutputTypeSelector';
import { Notification } from './components/persona';
import { ArrowLeft } from 'lucide-react';
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
    <div className="relative min-h-screen" style={{ backgroundColor: colors.dark }}>
      {/* Background accent elements only - no grid pattern */}
      <div 
        className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: colors.orange }}
      />
      <div 
        className="absolute bottom-20 left-20 w-60 h-60 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: colors.blueDark }}
      />

      <div className={cn(spacing.container, spacing.section)}>
        {notification.show && (
          <Notification
            title={notification.title}
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
          />
        )}

        {/* Page Header - Single header div */}
        <div className="text-center mb-12">
          <h1 className={cn(typography.sectionTitle.large, 'mb-4')}>
            <span style={{ color: colors.orange }}>{t('createManualPage.header.title1')}</span>{' '}
            <span style={{ color: colors.white }}>{t('createManualPage.header.title2')}</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t('createManualPage.header.subtitle')}
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
            {t('createManualPage.backButton')}
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {/* Main Form */}
            <div className={cards.base}>
              <div className={cards.header}>
                <h2 className="text-2xl font-bold text-white">
                  <span 
                    className="inline-block w-2 h-6 mr-3 rounded"
                    style={{ backgroundColor: colors.orange }}
                  />
                  {t('createManualPage.form.title')}
                </h2>
              </div>
              
              <div className={cards.body}>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-white font-medium">
                      {t('createManualPage.form.description.label')}
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder={t('createManualPage.form.description.placeholder')}
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`min-h-40 resize-none ${formErrors.description ? 'border-red-500' : ''}`}
                      style={{
                        backgroundColor: colors.blueDark,
                        borderColor: formErrors.description ? '#ef4444' : colors.blue,
                        color: colors.white
                      }}
                    />
                    {formErrors.description && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>
                    )}
                    <p className="text-gray-400 text-sm">
                      {t('createManualPage.form.description.help')}
                    </p>
                  </div>

                  {/* Character Count */}
                  <div className="text-right">
                    <span 
                      className="text-sm"
                      style={{ color: formData.description.length > 50 ? colors.yellow : colors.white }}
                    >
                      {formData.description.length} {t('createManualPage.form.characters')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

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