import { useTranslation } from 'react-i18next';
import { cards, colors, typography } from '@/lib/design-system';
import { CreateProjectProgressProps } from '../../types';
import CreateProjectVisualFeedback from './CreateProjectVisualFeedback';

const CreateProjectProgress: React.FC<CreateProjectProgressProps> = ({
  progress,
  formData,
  getProgressMessage,
}) => {
  const { t } = useTranslation('createProject');

  return (
    <div className={`${cards.base} flex flex-col`}>
      <div className={cards.header}>
        <h2 className={typography.heading[3]} style={{ color: colors.white }}>
          <span 
            className="inline-block w-2 h-6 mr-3 rounded"
            style={{ backgroundColor: colors.yellow }}
          ></span>
          {t('createProjectPage.progress.title')}
        </h2>
      </div>
      
      <div className={`${cards.body} flex flex-col items-center justify-start flex-grow`}>
        <div className="relative w-full max-w-md aspect-square">
          <CreateProjectVisualFeedback
            progress={progress}
            formData={formData}
          />
        </div>

        <div className="mt-8 text-center">
          <h3 className={typography.heading[4]} style={{ color: colors.white }}>
            {progress === 100
              ? t('createProjectPage.progress.complete')
              : t('createProjectPage.progress.incomplete')}
          </h3>
          <p 
            className="max-w-md mx-auto mt-3"
            style={{ color: colors.white }}
          >
            {getProgressMessage()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectProgress; 