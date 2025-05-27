import { cn } from '@/lib/utils';
import { spacing } from '@/lib/design-system';
import { HeroSection, HowItWorksSection, BenefitsSection, CallToAction } from './components';

const CoursesPage = () => {
  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8')}>
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CallToAction />
    </div>
  );
};

export default CoursesPage;
