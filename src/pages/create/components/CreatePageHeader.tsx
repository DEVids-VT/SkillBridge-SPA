import { cn } from '@/lib/utils';
import { colors, typography } from '@/lib/design-system';

interface CreatePageHeaderProps {
  title1: string;
  title2: string;
  subtitle: string;
}

export default function CreatePageHeader({ title1, title2, subtitle }: CreatePageHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className={cn(typography.sectionTitle.large, 'mb-4')}>
        <span style={{ color: colors.orange }}>{title1}</span>{' '}
        <span style={{ color: colors.white }}>{title2}</span>
      </h1>
      <p className="text-gray-300 text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
