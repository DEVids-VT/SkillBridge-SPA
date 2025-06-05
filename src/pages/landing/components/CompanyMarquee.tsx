import { useTranslation } from 'react-i18next';
import { Company } from '../../companies/types';

interface CompanyMarqueeProps {
  companies: Company[];
}

export const CompanyMarquee = ({ companies }: CompanyMarqueeProps) => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {t('landingPage.partners.badge', 'Trusted Partners')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('landingPage.partners.title', 'Leading Organizations Choose Us')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t(
              'landingPage.partners.subtitle',
              'Join these innovative companies that trust our platform to connect with top talent'
            )}
          </p>
        </div>

        {/* Company Grid */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {companies.map((company, index) => (
            <div
              key={company.id}
              className="group cursor-pointer"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              <div className="relative flex flex-col items-center space-y-3">
                {/* Company Card */}
                <div className="w-44 h-28 md:w-56 md:h-36 lg:w-64 lg:h-40 flex items-center justify-center p-6 md:p-8 lg:p-10 bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-100 dark:group-hover:shadow-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-600/30 group-hover:-translate-y-2 group-hover:scale-105 animate-float">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-h-full max-w-full object-contain filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Company Name */}
                <div className="text-center">
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {company.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">
                    {company.industry}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {t('landingPage.partners.cta', 'Want to become a partner?')}
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 hover:scale-105">
            {t('landingPage.partners.ctaButton', 'Join Our Network')}
          </button>
        </div>
      </div>
    </section>
  );
};
