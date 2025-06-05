import { HeroSection } from './components/HeroSection';
import { CompaniesSection } from './components/MissionSection';
import { StudentsSection } from './components/CoreValuesSection';
import { TeamSection } from './components/TeamSection';
import { CTASection } from './components/CTASection';
import { cn } from '@/lib/utils';
import { spacing } from '@/lib/design-system';

const AboutPage = () => {
  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8')}>
      <HeroSection />
      <CompaniesSection />
      <StudentsSection />
      <TeamSection />
      <CTASection />
    </div>
  );
};

export default AboutPage;
