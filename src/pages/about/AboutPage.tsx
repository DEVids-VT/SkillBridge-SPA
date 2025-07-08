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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      {/* Modern Dots Background Pattern */}
      <div className="absolute inset-0 opacity-25">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />
      </div>

      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Hero Header - Updated to match CompaniesPage style */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            <span className="text-blue-600">{t('aboutPage.header.title')}</span>{' '}
            <span className="text-gray-600">{t('aboutPage.header.appName')}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('aboutPage.header.subtitle')}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* For Companies */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 mb-4">
                <Building className="h-4 w-4" />
                <span>{t('aboutPage.companies.badge')}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {t('aboutPage.companies.title')}
              </h2>
              <p className="text-gray-600 mb-8">{t('aboutPage.companies.subtitle')}</p>
            </div>

            <div className="space-y-4">
              {companyBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg flex-shrink-0">
                      <div className="text-blue-600">{benefit.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Students */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 mb-4">
                <GraduationCap className="h-4 w-4" />
                <span>{t('aboutPage.students.badge')}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {t('aboutPage.students.title')}
              </h2>
              <p className="text-gray-600 mb-8">{t('aboutPage.students.subtitle')}</p>
            </div>

            <div className="space-y-4">
              {studentBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg flex-shrink-0">
                      <div className="text-blue-600">{benefit.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section - Added back in modern style */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 mb-4">
              <Users className="h-4 w-4" />
              <span>{t('aboutPage.team.badge')}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t('aboutPage.team.title')}
            </h2>
            <p className="text-gray-600">{t('aboutPage.team.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden mx-auto border-4 border-blue-100">
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
                    <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center hidden">
                      <Users className="h-10 w-10 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reduced Floating Elements - Only one static bubble */}
      <div className="absolute top-1/4 right-20 w-16 h-16 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
    </section>
  );
};

export default AboutPage;
