import { CompanyMarquee } from '../landing/components/CompanyMarquee';
import { companiesData } from './newCompaniesData';

const CompaniesPage = () => {
  return <CompanyMarquee companies={companiesData} />;
};

export default CompaniesPage;
