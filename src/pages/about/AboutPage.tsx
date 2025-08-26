import { useTranslation } from 'react-i18next';
import {
  Building,
  GraduationCap,
  Clock,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Briefcase,
  Code,
  LineChart,
} from 'lucide-react';
import { colors, typography, spacing, layouts } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import img1 from '../../../public/images/people/12.png';
import img2 from '../../../public/images/people/13.png';
import img3 from '../../../public/images/people/14.png';

const AboutPage = () => {
  const { t } = useTranslation('about');

  const companyBenefits = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: t('aboutPage.companies.benefits.saveTime.title'),
      description: t('aboutPage.companies.benefits.saveTime.description'),
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: t('aboutPage.companies.benefits.objectiveAssessment.title'),
      description: t('aboutPage.companies.benefits.objectiveAssessment.description'),
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: t('aboutPage.companies.benefits.fasterSelection.title'),
      description: t('aboutPage.companies.benefits.fasterSelection.description'),
    },
  ];

  const studentBenefits = [
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: t('aboutPage.students.benefits.realBusinessCases.title'),
      description: t('aboutPage.students.benefits.realBusinessCases.description'),
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: t('aboutPage.students.benefits.skillDevelopment.title'),
      description: t('aboutPage.students.benefits.skillDevelopment.description'),
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: t('aboutPage.students.benefits.directOpportunities.title'),
      description: t('aboutPage.students.benefits.directOpportunities.description'),
    },
  ];

  // Team members data
  const teamMembers = [
    {
      name: t('aboutPage.team.members.davidPetkov.name'),
      role: t('aboutPage.team.members.davidPetkov.role'),
      bio: t('aboutPage.team.members.davidPetkov.bio'),
      image: img1,
    },
    {
      name: t('aboutPage.team.members.davidHristov.name'),
      role: t('aboutPage.team.members.davidHristov.role'),
      bio: t('aboutPage.team.members.davidHristov.bio'),
      image: img2,
    },
    {
      name: t('aboutPage.team.members.trayanVasilev.name'),
      role: t('aboutPage.team.members.trayanVasilev.role'),
      bio: t('aboutPage.team.members.trayanVasilev.bio'),
      image: img3,
    },
  ];

  return (
    <section className={cn('relative min-h-screen overflow-hidden py-20')} style={{ backgroundColor: colors.dark }}>
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
        <div className={cn(layouts.pageHeader, spacing.container, 'space-y-6')}>
          <div className="absolute -top-10 left-0 right-0 h-20 rounded-b-3xl -z-10" style={{ backgroundColor: colors.blue }}></div>
          <h1 className={cn(typography.sectionTitle.main, 'leading-[1.1]')}>
            <span style={{ color: colors.yellow }}>{t('aboutPage.header.title')}</span>{' '}
            <span className="text-white">{t('aboutPage.header.appName')}</span>
          </h1>

          <p className={cn('text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed', typography.body.lg)}>
            {t('aboutPage.header.subtitle')}
          </p>
        </div>

        {/* Content Grid */}
        <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16', spacing.container, 'max-w-6xl')}>
          {/* For Companies */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border mb-4" style={{ backgroundColor: colors.blue, color: colors.yellow, borderColor: colors.blue }}>
                <Building className="h-4 w-4" />
                <span>{t('aboutPage.companies.badge')}</span>
              </div>
              <h2 className={cn('text-2xl md:text-3xl font-bold mb-4', typography.heading[3])}>
                {t('aboutPage.companies.title')}
              </h2>
              <p className={cn('mb-8', typography.body.default)}>{t('aboutPage.companies.subtitle')}</p>
            </div>

            <div className="space-y-4">
              {companyBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.blue }}>
                      <div style={{ color: colors.yellow }}>{benefit.icon}</div>
                    </div>
                    <div>
                      <h3 className={cn('font-semibold mb-1', typography.heading[5])}>{benefit.title}</h3>
                      <p className={cn('text-sm', typography.body.sm)}>{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Students */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border mb-4" style={{ backgroundColor: colors.blue, color: colors.yellow, borderColor: colors.blue }}>
                <GraduationCap className="h-4 w-4" />
                <span>{t('aboutPage.students.badge')}</span>
              </div>
              <h2 className={cn('text-2xl md:text-3xl font-bold mb-4', typography.heading[3])}>
                {t('aboutPage.students.title')}
              </h2>
              <p className={cn('mb-8', typography.body.default)}>{t('aboutPage.students.subtitle')}</p>
            </div>

            <div className="space-y-4">
              {studentBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.blue }}>
                      <div style={{ color: colors.yellow }}>{benefit.icon}</div>
                    </div>
                    <div>
                      <h3 className={cn('font-semibold mb-1', typography.heading[5])}>{benefit.title}</h3>
                      <p className={cn('text-sm', typography.body.sm)}>{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className={cn('mb-16', spacing.container, 'max-w-4xl mx-auto')}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border mb-4" style={{ backgroundColor: colors.blue, color: colors.yellow, borderColor: colors.blue }}>
              <Users className="h-4 w-4" />
              <span>{t('aboutPage.team.badge')}</span>
            </div>
            <h2 className={cn('text-2xl md:text-3xl font-bold mb-4', typography.heading[3])}>
              {t('aboutPage.team.title')}
            </h2>
            <p className={typography.body.default}>{t('aboutPage.team.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}
              >
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4" style={{ backgroundColor: colors.blue, borderColor: colors.blue }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to icon if image doesn't exist
                        const img = e.currentTarget;
                        const fallback = img.nextElementSibling as HTMLElement | null;
                        img.style.display = 'none';
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-full h-full rounded-full flex items-center justify-center hidden" style={{ backgroundColor: colors.blue }}>
                      <Users className="h-10 w-10" style={{ color: colors.yellow }} />
                    </div>
                  </div>
                  <div>
                    <h3 className={cn('font-bold text-lg', typography.heading[4])}>{member.name}</h3>
                    <p className="font-medium" style={{ color: colors.yellow }}>{member.role}</p>
                  </div>
                  <p className={cn('text-sm leading-relaxed', typography.body.sm)}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-20 w-16 h-16 rounded-full mix-blend-multiply filter blur-xl opacity-30" style={{ backgroundColor: colors.blue }} />
    </section>
  );
};

export default AboutPage;
