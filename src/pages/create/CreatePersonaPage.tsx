import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateScenario } from './hooks/useCreateScenario';
import type { CandidateRequirementsRequest } from '@/types/candidate/requirements';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import {
  CreatePageBackground,
  CreatePageHeader,
  CreatePageBackButton,
  CandidateRequirementsForm,
  Notification,
  OutputTypeSelector
} from './components';
import { CandidateRequirementsFormErrors, CandidateRequirementsFormState } from './components/persona/CandidateRequirementsForm';
import { NotificationState } from './types';

// Initial form state
const initialFormState: CandidateRequirementsFormState = {
  positionTitle: '',
  departmentOrArea: '',
  companyIndustry: '',
  experienceLevel: '',
  minExperienceYears: '',
  maxExperienceYears: '',
  minEducationLevel: '',
  preferredEducationFields: '',
  requiredCertifications: '',
  preferredCertifications: '',
  requiredCompetencies: [],
  preferredCompetencies: [],
  workConditions: [],
  languageRequirements: '',
  positionSummary: '',
  idealCandidateProfile: '',
  keyResponsibilities: '',
  desiredPersonalityTraits: [],
  cultureFitDescription: '',
  customCriteria: [],
};

export default function CreatePersonaPage() {
  const { t } = useTranslation('createProject');
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CandidateRequirementsFormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<CandidateRequirementsFormErrors>({});
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
  const createScenario = useCreateScenario();

  const splitCSV = (value: string): string[] =>
    value ? value.split(',').map((s) => s.trim()).filter(Boolean) : [];

  // Calculate progress (kept for validation, but not displayed)
  useEffect(() => {
    const requiredFields = [
      'positionTitle',
      'experienceLevel',
      'minExperienceYears',
      'minEducationLevel',
      'positionSummary',
    ];
    const completedFields = requiredFields.filter((field) =>
      Boolean(formData[field as keyof CandidateRequirementsFormState])
    );
    const progress = (completedFields.length / requiredFields.length) * 100;
    setFormProgress(progress);
  }, [formData]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CandidateRequirementsFormState) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof CandidateRequirementsFormErrors]) {
      setFormErrors((prev: CandidateRequirementsFormErrors) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle tag input changes
  const handleTagInputChange = (name: string, value: string) => {
    setFormData((prev: CandidateRequirementsFormState) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof CandidateRequirementsFormErrors]) {
      setFormErrors((prev: CandidateRequirementsFormErrors) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle select change
  const handleSelectChange = (name: 'experienceLevel' | 'minEducationLevel', value: string) => {
    setFormData((prev: CandidateRequirementsFormState) => ({
      ...prev,
      [name]: value as any,
    }));

    if (formErrors[name]) {
      setFormErrors((prev: CandidateRequirementsFormErrors) => ({
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
    const errors: CandidateRequirementsFormErrors = {};
    let isValid = true;

    if (!formData.positionTitle.trim()) {
      errors.positionTitle = t('createPersonaPage.form.positionTitle.error');
      isValid = false;
    }

    if (!formData.experienceLevel) {
      errors.experienceLevel = t('createPersonaPage.form.experienceLevel.error');
      isValid = false;
    }

    if (!formData.minExperienceYears.trim()) {
      errors.minExperienceYears = t('createPersonaPage.form.minExperienceYears.errorRequired');
      isValid = false;
    } else if (isNaN(Number(formData.minExperienceYears))) {
      errors.minExperienceYears = t('createPersonaPage.form.minExperienceYears.errorNumber');
      isValid = false;
    }

    if (!formData.minEducationLevel) {
      errors.minEducationLevel = t('createPersonaPage.form.minEducationLevel.error');
      isValid = false;
    }

    if (!formData.positionSummary.trim()) {
      errors.positionSummary = t('createPersonaPage.form.positionSummary.error');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle generation
  const handleGenerate = (outputType: 'scenario' | 'quiz') => {
    setIsSubmitting(true);

    const payload: CandidateRequirementsRequest = {
      positionTitle: formData.positionTitle,
      departmentOrArea: formData.departmentOrArea,
      companyIndustry: formData.companyIndustry,
      experienceLevel: formData.experienceLevel as any,
      minExperienceYears: Number(formData.minExperienceYears || 0),
      maxExperienceYears: formData.maxExperienceYears ? Number(formData.maxExperienceYears) : null,
      minEducationLevel: formData.minEducationLevel as any,
      preferredEducationFields: splitCSV(formData.preferredEducationFields),
      requiredCertifications: splitCSV(formData.requiredCertifications),
      preferredCertifications: splitCSV(formData.preferredCertifications),
      requiredCompetencies: formData.requiredCompetencies,
      preferredCompetencies: formData.preferredCompetencies,
      workConditions: formData.workConditions,
      languageRequirements: splitCSV(formData.languageRequirements),
      positionSummary: formData.positionSummary,
      idealCandidateProfile: formData.idealCandidateProfile,
      keyResponsibilities: splitCSV(formData.keyResponsibilities),
      desiredPersonalityTraits: formData.desiredPersonalityTraits,
      cultureFitDescription: formData.cultureFitDescription,
      customCriteria: formData.customCriteria.reduce<Record<string, unknown>>((acc, kv) => {
        if (kv.key.trim()) acc[kv.key] = kv.value;
        return acc;
      }, {}),
      outputType,
    };

    createScenario.mutate(payload, {
      onSuccess: (data) => {
        setIsSubmitting(false);
        setFormData(initialFormState);
        setSelectedOutputType(null);
        setNotification({
          show: true,
          type: 'success',
          title: t('createPersonaPage.notifications.success.title'),
          message: t('createPersonaPage.notifications.success.message'),
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
          title: t('createPersonaPage.notifications.error.title'),
          message: error.message || t('createPersonaPage.notifications.error.defaultMessage'),
        });
      },
    });
  };

  const handleBack = () => {
    navigate('/create');
  };

  return (
    <div className="relative min-h-screen bg-background">
      <CreatePageBackground variant="persona" />

      <div className={cn(spacing.container, spacing.section)}>
        {notification.show && (
          <Notification
            title={notification.title}
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification((prev: NotificationState) => ({ ...prev, show: false }))}
          />
        )}

        <CreatePageHeader
          title1={t('createPersonaPage.header.title1')}
          title2={t('createPersonaPage.header.title2')}
          subtitle={t('createPersonaPage.header.subtitle')}
        />

        <CreatePageBackButton
          onBack={handleBack}
          label={t('createPersonaPage.backButton')}
        />

        {/* Main Content - Simplified Layout */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            {/* Form */}
            <CandidateRequirementsForm
              formData={formData}
              errors={formErrors}
              onFieldChange={handleInputChange}
              onCSVChange={(name, value) => handleTagInputChange(name, value)}
              onSelectChange={handleSelectChange}
              onUpdateRequiredCompetencies={(list) => setFormData((p) => ({ ...p, requiredCompetencies: list }))}
              onUpdatePreferredCompetencies={(list) => setFormData((p) => ({ ...p, preferredCompetencies: list }))}
              onUpdateWorkConditions={(list) => setFormData((p) => ({ ...p, workConditions: list }))}
              onUpdatePersonalityTraits={(list) => setFormData((p) => ({ ...p, desiredPersonalityTraits: list }))}
              onUpdateCustomCriteria={(list) => setFormData((p) => ({ ...p, customCriteria: list }))}
            />

            {/* Output Type Selector */}
            <div className="mt-8">
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