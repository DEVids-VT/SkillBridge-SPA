import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProject } from '@/hooks/useCreateProject';
import { spacing, colors, layouts, cards, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { OutputTypeSelector } from './components/shared/OutputTypeSelector';
import { Notification } from './components/persona';
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
        title: 'Form Incomplete',
        message: 'Please provide a description before selecting output type.',
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
      errors.description = 'Description is required';
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

         // Call the API (using the same hook but with different data structure)
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
          title: 'Success!',
          message: 'Your content has been generated successfully.',
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
          title: 'Error',
          message: error.message || 'Something went wrong. Please try again.',
        });
      },
    });
  };

  const handleBack = () => {
    navigate('/create');
  };

  const isFormValid = formData.description.trim().length > 0;

  return (
    <div className={cn(spacing.container, spacing.section, 'relative min-h-screen')} style={{ backgroundColor: colors.dark }}>
      {/* Background pattern */}
      <div 
        className="absolute top-8 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl -z-10"
        style={{ backgroundColor: colors.orange }}
      ></div>
      <div 
        className="absolute bottom-12 left-8 w-48 h-48 rounded-full opacity-20 blur-3xl -z-10"
        style={{ backgroundColor: colors.blueDark }}
      ></div>

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
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            ← Back
          </Button>
          <div className="text-center">
            <h1 className={layouts.pageTitle}>
              <span style={{ color: colors.orange }}>Create Manually</span>{' '}
              <span style={{ color: colors.white }}>Direct Input</span>
            </h1>
            <p className={layouts.pageDescription}>
              Directly describe what you want to create without using a persona profile
            </p>
          </div>
          <div></div> {/* Spacer for center alignment */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Main Form */}
        <div className={cards.base}>
          <div className={cards.header}>
            <h2 className={typography.heading[3]} style={{ color: colors.white }}>
              <span 
                className="inline-block w-2 h-6 mr-3 rounded"
                style={{ backgroundColor: colors.orange }}
              ></span>
              Manual Description
            </h2>
          </div>
          
          <div className={cards.body}>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="description" style={{ color: colors.white }}>
                  Describe what you want to create *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe in detail what you want to create. For example: 'Create a scenario for testing a junior developer's React skills' or 'Generate quiz questions about advanced TypeScript concepts'..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`min-h-40 ${formErrors.description ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: colors.blueDark,
                    borderColor: colors.blue,
                    color: colors.white
                  }}
                />
                {formErrors.description && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>
                )}
                <p className="text-gray-400 text-sm">
                  Be as specific as possible. Include details about difficulty level, topics, requirements, etc.
                </p>
              </div>

              {/* Character/Word Count */}
              <div className="text-right">
                <span 
                  className="text-sm"
                  style={{ color: formData.description.length > 50 ? colors.yellow : colors.white }}
                >
                  {formData.description.length} characters
                </span>
              </div>
            </div>

            {/* Output Type Selector */}
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
  );
} 