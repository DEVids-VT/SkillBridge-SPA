import { HeroSection } from './components/HeroSection';
import { MissionSection } from './components/MissionSection';
import { CoreValuesSection } from './components/CoreValuesSection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { CTASection } from './components/CTASection';
import { spacing } from '@/lib/design-system';

const AboutPage = () => {
  return (
    <div className={spacing.headerOffset}>
      <HeroSection />
      <MissionSection />
      <CoreValuesSection />
      <TeamSection />
      <ContactSection />
      <CTASection />
    </div>
  );
};

export default AboutPage;
