import { colors, spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import AboutHero from './components/AboutHero';
import AboutCompanies from './components/AboutCompanies';
import AboutStudents from './components/AboutStudents';
import AboutTeam from './components/AboutTeam';

const AboutPage = () => {
  return (
    <section
      className={cn('relative min-h-screen overflow-hidden py-20')}
      style={{ backgroundColor: colors.dark }}
    >
      {/* Modern Dots Background Pattern */}
      <div className="absolute inset-0 opacity-25">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, ${colors.blue} 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />
      </div>

      {/* Solid overlay for better readability */}
      <div className="absolute inset-0" style={{ backgroundColor: colors.dark, opacity: 0.85 }} />

      {/* Content Container */}
      <div className="relative z-10 px-6 lg:px-8">
        {/* Hero Header */}
        <AboutHero />

        {/* Content Grid */}
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16',
            spacing.container,
            'max-w-6xl'
          )}
        >
          <AboutCompanies />
          <AboutStudents />
        </div>

        {/* Team Section */}
        <AboutTeam />
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-1/4 right-20 w-16 h-16 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        style={{ backgroundColor: colors.blue }}
      />
    </section>
  );
};

export default AboutPage;
