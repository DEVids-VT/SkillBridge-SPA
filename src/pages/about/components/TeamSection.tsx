import { Button } from '@/components/ui/button';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

// Team member type
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export const TeamSection = () => {
  const { t } = useTranslation();

  // Mock team data using translations
  const teamMembers: TeamMember[] = [
    {
      name: t('aboutPage.team.members.david_petkov.name'),
      role: t('aboutPage.team.members.david_petkov.role'),
      image: '/images/team/sarah.jpg',
      bio: t('aboutPage.team.members.david_petkov.bio'),
      linkedin: 'https://linkedin.com/in/davidpetkov',
      twitter: 'https://twitter.com/davidpetkov',
    },
    {
      name: t('aboutPage.team.members.david_hristov.name'),
      role: t('aboutPage.team.members.david_hristov.role'),
      image: '/images/team/david.jpg',
      bio: t('aboutPage.team.members.david_hristov.bio'),
      linkedin: 'https://linkedin.com/in/davidhristov',
      github: 'https://github.com/davidhristov',
    },
    {
      name: t('aboutPage.team.members.trayan_vasilev.name'),
      role: t('aboutPage.team.members.trayan_vasilev.role'),
      image: '/images/team/miguel.jpg',
      bio: t('aboutPage.team.members.trayan_vasilev.bio'),
      linkedin: 'https://linkedin.com/in/trayanvasilev',
      twitter: 'https://twitter.com/trayanvasilev',
    },
    {
      name: t('aboutPage.team.members.kristian.name'),
      role: t('aboutPage.team.members.kristian.role'),
      image: '/images/team/aisha.jpg',
      bio: t('aboutPage.team.members.kristian.bio'),
      linkedin: 'https://linkedin.com/in/kristian',
    },
  ];

  return (
    <section className={cn(spacing.container, spacing.section)}>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-4">{t('aboutPage.team.title')}</h2>
        <p className="text-gray-600">
          {t('aboutPage.team.subtitle')}
        </p>
      </div>

      <div className="space-y-12">
        {teamMembers.map((member, index) => {
          const isEven = index % 2 === 0;
          
          if (isEven) {
            // Picture on left, details on right
            return (
              <div
                key={index}
                className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="w-64 h-64 rounded-xl overflow-hidden bg-gray-100">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="font-bold text-2xl mb-2">{member.name}</h3>
                  <p className="text-blue-600 text-lg font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                  
                  {/* Social links */}
                  <div className="flex gap-3 justify-center lg:justify-start">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          } else {
            // Details on left, picture on right
            return (
              <div
                key={index}
                className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="font-bold text-2xl mb-2">{member.name}</h3>
                  <p className="text-blue-600 text-lg font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                  
                  {/* Social links */}
                  <div className="flex gap-3 justify-center lg:justify-start">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-64 h-64 rounded-xl overflow-hidden bg-gray-100">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};
