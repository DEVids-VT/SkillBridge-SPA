import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateProjectAssignment } from './hooks/useCreateProjectAssignment';
import { spacing, colors } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import {
  CreatePageBackground,
  CreatePageHeader,
  CreatePageBackButton,
  ProjectAssignmentManualForm,
  Notification
} from './components';
import { NotificationState, CreateProjectAssignmentRequest } from './types';
import { ProjectAssignmentManualFormState, TaskEditorItem } from './components/ProjectAssignmentManualForm';

// Initial manual assignment state
const initialFormState: ProjectAssignmentManualFormState = {
  title: '',
  description: '',
  summary: '',
  learningBenefits: '',
  suggestedApproach: '',
  level: '1',
  status: '0',
  deadline: '',
  skillIdsInput: '',
  tasks: [],
};

export default function CreateManualPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('createProject');
  const [formData, setFormData] = useState<ProjectAssignmentManualFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    type: 'info',
    title: '',
    message: '',
  });

  // Use the create assignment mutation
  const createAssignment = useCreateProjectAssignment();

  const setState = (patch: Partial<ProjectAssignmentManualFormState>) => setFormData((prev) => ({ ...prev, ...patch }));
  const onTasksChange = (tasks: TaskEditorItem[]) => setFormData((prev) => ({ ...prev, tasks }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // simple validation
    if (!formData.title.trim() || !formData.summary.trim() || !formData.learningBenefits.trim() || !formData.suggestedApproach.trim()) {
      setNotification({ show: true, type: 'error', title: 'Missing fields', message: 'Please fill title, summary, learning benefits, and suggested approach.' });
      return;
    }
    if (!formData.deadline) {
      setNotification({ show: true, type: 'error', title: 'Missing deadline', message: 'Please select a deadline.' });
      return;
    }

    const skillIds = formData.skillIdsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: CreateProjectAssignmentRequest = {
      title: formData.title.trim(),
      description: formData.description?.trim() || undefined,
      summary: formData.summary.trim(),
      learningBenefits: formData.learningBenefits.trim(),
      suggestedApproach: formData.suggestedApproach.trim(),
      level: Number(formData.level) as 0 | 1 | 2,
      deadline: new Date(formData.deadline).toISOString(),
      status: Number(formData.status) as 0 | 1 | 2 | 3,
      skillIds,
      tasks: formData.tasks.map((t, idx) => ({
        title: t.title.trim(),
        description: t.description?.trim() || undefined,
        isCompleted: false,
        sequence: t.sequence || idx + 1,
      })),
    };

    setIsSubmitting(true);
    createAssignment.mutate(payload, {
      onSuccess: (data) => {
        setIsSubmitting(false);
        setFormData(initialFormState);
        setNotification({ show: true, type: 'success', title: t('createManualPage.notifications.success.title'), message: t('createManualPage.notifications.success.message') });
        setTimeout(() => navigate(`/projects/${data.id}`), 1000);
      },
      onError: (error) => {
        setIsSubmitting(false);
        setNotification({ show: true, type: 'error', title: t('createManualPage.notifications.error.title'), message: error.message || t('createManualPage.notifications.error.defaultMessage') });
      },
    });
  };

  const handleBack = () => {
    navigate('/create');
  };

  const isFormValid = formData.description.trim().length > 0;

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.dark }}>
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
            <ProjectAssignmentManualForm
              state={formData}
              onChange={setState}
              onTasksChange={onTasksChange}
              onSubmit={onSubmit}
              submitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 