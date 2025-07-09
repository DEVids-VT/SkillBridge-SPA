import { layouts, colors } from '@/lib/design-system';
import { CreateProjectHeaderProps } from '../../types';

const CreateProjectHeader: React.FC<CreateProjectHeaderProps> = ({
  title1,
  title2,
  subtitle,
}) => {
  return (
    <>
      <h1 className={layouts.pageTitle}>
        <span style={{ color: colors.orange }}>{title1}</span>{' '}
        <span style={{ color: colors.white }}>{title2}</span>
      </h1>
      <p className={layouts.pageDescription}>{subtitle}</p>
    </>
  );
};

export default CreateProjectHeader; 