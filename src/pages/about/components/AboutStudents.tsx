import { useTranslation } from 'react-i18next';
import { GraduationCap, Briefcase, LineChart } from 'lucide-react';
import { colors, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';

const AboutStudents = () => {
  const { t } = useTranslation('about');

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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border mb-4"
          style={{ backgroundColor: colors.blue, color: colors.yellow, borderColor: colors.blue }}
        >
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
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                style={{ backgroundColor: colors.blue }}
              >
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
  );
};

export default AboutStudents;
