import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { CompanyFormData } from '@/types/user/UserOnboarding';

export interface ICreateCompanyResponse {
  id: number;
}

export type ICreateCompanyData = CompanyFormData;

interface CompanyPayload {
  name: string;
  about: string;
  logoUrl?: string;
  bannerUrl?: string;
  activities: string;
  sector: string;
  headOfficeLocation: string;
  technologies: string;
  yearEstablished: number;
  hasOfficesInBulgaria: boolean;
  bulgarianOfficeLocations: string;
  employeesInBulgaria: number;
  employeesWorldwide: number;
  whyWorkWithUs: string;
  websiteUrl: string;
  contactInfo: string;
}

const createCompany = async (data: ICreateCompanyData): Promise<ICreateCompanyResponse> => {
  // Map our form data to the expected API payload format
  const payload: CompanyPayload = {
    name: data.companyName,
    about: data.about || '',
    activities: data.activities || '',
    sector: data.sector || '',
    headOfficeLocation: data.headquarters || '',
    technologies: data.technologies ? data.technologies.join(', ') : '',
    yearEstablished: data.yearEstablished || 0,
    hasOfficesInBulgaria: data.hasOfficesInBulgaria || false,
    bulgarianOfficeLocations: data.bulgarianOffices ? data.bulgarianOffices.join(', ') : '',
    employeesInBulgaria: data.employeesInBulgaria || 0,
    employeesWorldwide: data.globalEmployees || 0,
    whyWorkWithUs: data.whyWorkWithUs || '',
    websiteUrl: data.website,
    contactInfo: [
      data.contactEmail,
      data.contactPhone,
      data.contactPerson
    ].filter(Boolean).join(' | ')
  };

  const response = await axiosInstance.post('/c', payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data;
};

export const useCreateCompany = () => {
  return useMutation<ICreateCompanyResponse, Error, ICreateCompanyData>({
    mutationFn: (data: ICreateCompanyData) => createCompany(data),
  });
};
