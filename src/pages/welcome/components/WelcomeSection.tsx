import { ReactNode } from 'react';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface WelcomeSectionProps {
  children: ReactNode;
  className?: string;
}

export function WelcomeSection({ children, className }: WelcomeSectionProps) {
  return (
    <section className={cn(spacing.section, 'relative', className)}>
      <div className={spacing.container}>
        {children}
      </div>
    </section>
  );
} 