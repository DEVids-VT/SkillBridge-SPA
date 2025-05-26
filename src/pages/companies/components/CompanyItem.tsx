import { useTranslation } from 'react-i18next';
import { Building, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Company } from '../types';

interface CompanyItemProps {
  company: Company;
  onViewDetails?: (company: Company) => void;
}

export const CompanyItem = ({ company, onViewDetails }: CompanyItemProps) => {
  const { t } = useTranslation('companies');
  const {
    name,
    logo,
    description,
    industry,
    location,
    website,
    partnershipLevel,
  } = company;

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(company);
    }
  };

  // Get partnership level color
  const getPartnershipLevelClass = (level: string) => {
    const levelClasses: Record<string, string> = {
      'Gold': 'bg-yellow-100 text-yellow-700',
      'Silver': 'bg-gray-200 text-gray-700',
      'Bronze': 'bg-amber-100 text-amber-700',
    };
    
    return levelClasses[level] || 'bg-gray-100 text-gray-700';
  };

  const companyKey = name.toLowerCase().replace(/\s+/g, '');

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 border rounded-lg hover:shadow-md transition-shadow bg-white">
      {/* Company logo */}
      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
        {logo ? (
          <img 
            src={logo} 
            alt={`${name} logo`}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <Building className="h-10 w-10 text-gray-400" />
        )}
      </div>
      
      {/* Company info */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t(`companies.${companyKey}.name`, name)}</h3>
            <div className="flex flex-wrap items-center gap-x-4 text-sm text-gray-500 mt-1">
              <span>{t(`companies.${companyKey}.industry`, industry)}</span>
              <span className="flex items-center gap-1">
                <Globe size={14} className="text-gray-400" />
                {t(`companies.${companyKey}.location`, location)}
              </span>
            </div>
          </div>
          
          {/* Partnership level */}
          <div className={cn(
            "text-xs font-medium px-3 py-1 rounded-full self-start md:self-center",
            getPartnershipLevelClass(partnershipLevel)
          )}>
            {t(`companies.${companyKey}.partnershipLevel`, `${partnershipLevel} Partner`)}
          </div>
        </div>
        
        {/* Description */}
        <p className="mt-3 text-gray-700 line-clamp-2">
          {t(`companies.${companyKey}.description`, description)}
        </p>
        
        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Button 
            variant="default" 
            size="sm"
            onClick={handleViewDetails}
          >
            {t('viewProfile')}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="gap-1"
            onClick={() => window.open(website, '_blank')}
          >
            {t('learnMore')}
            <ExternalLink size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}; 