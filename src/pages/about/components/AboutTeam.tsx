import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';
import { colors, typography, spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';

const AboutTeam = () => {
  const { t } = useTranslation('about');

  const teamMembers = [
    {
      name: t('aboutPage.team.members.davidPetkov.name'),
      role: t('aboutPage.team.members.davidPetkov.role'),
      bio: t('aboutPage.team.members.davidPetkov.bio'),
      image: '/images/people/12.png',
    },
    {
      name: t('aboutPage.team.members.davidHristov.name'),
      role: t('aboutPage.team.members.davidHristov.role'),
      bio: t('aboutPage.team.members.davidHristov.bio'),
      image: '/images/people/13.png',
    },
    {
      name: t('aboutPage.team.members.trayanVasilev.name'),
      role: t('aboutPage.team.members.trayanVasilev.role'),
      bio: t('aboutPage.team.members.trayanVasilev.bio'),
      image: '/images/people/14.png',
    },
  ];

  return (
    <div className={cn('mb-16', spacing.container, 'max-w-4xl mx-auto')}>
      <div className="text-center mb-12">
        <div
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border mb-4"
          style={{ backgroundColor: colors.blue, color: colors.yellow, borderColor: colors.blue }}
        >
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
              <div
                className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4"
                style={{ backgroundColor: colors.blue, borderColor: colors.blue }}
              >
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
                <div
                  className="w-full h-full rounded-full flex items-center justify-center hidden"
                  style={{ backgroundColor: colors.blue }}
                >
                  <Users className="h-10 w-10" style={{ color: colors.yellow }} />
                </div>
              </div>
              <div>
                <h3 className={cn('font-bold text-lg', typography.heading[4])}>{member.name}</h3>
                <p className="font-medium" style={{ color: colors.yellow }}>
                  {member.role}
                </p>
              </div>
              <p className={cn('text-sm leading-relaxed', typography.body.sm)}>{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeam;
