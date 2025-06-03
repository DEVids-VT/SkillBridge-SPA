import { useTranslation } from 'react-i18next';
import { Company } from '../../companies/types';

type CompanyMarqueeProps = {
  companies: Company[];
};

export const CompanyMarquee = ({ companies }: CompanyMarqueeProps) => {
  const { t } = useTranslation();

  // Create duplicate lists to ensure enough items for the animation
  const allCompanies = [...companies, ...companies, ...companies];

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container px-4 lg:px-8 mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {t('landingPage.partners.title', 'Trusted by Leading Organizations')}
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t(
              'landingPage.partners.subtitle',
              'Join these forward-thinking companies that partner with us'
            )}
          </p>
        </div>

        {/* Marquee container with matching margins */}
        <div className="relative overflow-hidden mx-auto">
          {/* First row - left to right */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]">
            <ul className="flex items-center justify-start [&_li]:mx-4 md:[&_li]:mx-6 [&_img]:max-w-none animate-infinite-scroll">
              {allCompanies.map((company, index) => (
                <li key={`row1-${company.id}-${index}`} className="flex-shrink-0">
                  <div className="group flex flex-col items-center space-y-2">
                    <div className="w-28 h-16 flex items-center justify-center p-2 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-md group-hover:border-blue-200">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="max-h-12 max-w-24 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500 opacity-80 group-hover:text-blue-600 group-hover:opacity-100 transition-all duration-300">
                      {company.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <ul
              className="flex items-center justify-start [&_li]:mx-4 md:[&_li]:mx-6 [&_img]:max-w-none animate-infinite-scroll"
              aria-hidden="true"
            >
              {allCompanies.map((company, index) => (
                <li key={`row1-dup-${company.id}-${index}`} className="flex-shrink-0">
                  <div className="group flex flex-col items-center space-y-2">
                    <div className="w-28 h-16 flex items-center justify-center p-2 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-md group-hover:border-blue-200">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="max-h-12 max-w-24 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500 opacity-80 group-hover:text-blue-600 group-hover:opacity-100 transition-all duration-300">
                      {company.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Second row - right to left (reversed direction) */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden mt-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]">
            <ul className="flex items-center justify-start [&_li]:mx-4 md:[&_li]:mx-6 [&_img]:max-w-none animate-infinite-scroll-reverse">
              {allCompanies.reverse().map((company, index) => (
                <li key={`row2-${company.id}-${index}`} className="flex-shrink-0">
                  <div className="group flex flex-col items-center space-y-2">
                    <div className="w-28 h-16 flex items-center justify-center p-2 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-md group-hover:border-blue-200">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="max-h-12 max-w-24 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500 opacity-80 group-hover:text-blue-600 group-hover:opacity-100 transition-all duration-300">
                      {company.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <ul
              className="flex items-center justify-start [&_li]:mx-4 md:[&_li]:mx-6 [&_img]:max-w-none animate-infinite-scroll-reverse"
              aria-hidden="true"
            >
              {allCompanies.map((company, index) => (
                <li key={`row2-dup-${company.id}-${index}`} className="flex-shrink-0">
                  <div className="group flex flex-col items-center space-y-2">
                    <div className="w-28 h-16 flex items-center justify-center p-2 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-md group-hover:border-blue-200">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="max-h-12 max-w-24 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500 opacity-80 group-hover:text-blue-600 group-hover:opacity-100 transition-all duration-300">
                      {company.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
