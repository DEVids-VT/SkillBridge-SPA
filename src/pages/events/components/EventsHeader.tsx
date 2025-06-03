import { useTranslation } from 'react-i18next';
import { layouts } from '@/lib/design-system';

export const EventsHeader = () => {
  const { t } = useTranslation();
  return (
    <div className={layouts.pageHeader}>
      <div className={layouts.pageHeaderBackground}></div>
      <h1 className={layouts.pageTitle}>
        <span className="text-blue-600">Предстоящи</span>{' '}
        <span className="text-gray-600">събития</span>
      </h1>
      <p className={layouts.pageDescription}>
        {t(
          'courses.headerDescription',
          'Browse our library of expert-led courses designed to enhance your skills and advance your career in tech, design, business, and more.'
        )}
      </p>
    </div>
  );
};
