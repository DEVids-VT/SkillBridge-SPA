import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { CompanyFormData } from '@/types/user/UserOnboarding';

export interface ICreateCompanyResponse {
  id: string; // Changed to string (Guid)
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
  yearEstablished: number; // Made required
  hasOfficesInBulgaria: boolean;
  bulgarianOfficeLocations?: string; // Made optional to match entity
  employeesInBulgaria?: number; // Made optional to match entity
  employeesWorldwide: number;
  whyWorkWithUs?: string; // Made optional to match entity
  websiteUrl: string;
  contactName: string; // Separated contact fields
  contactEmail: string;
  contactPhone: string;
}

const createCompany = async (data: ICreateCompanyData): Promise<ICreateCompanyResponse> => {
  // Validate required fields based on backend model
  if (!data.companyName || data.companyName.length > 100) {
    throw new Error('Company name is required and must be 100 characters or less');
  }

  if (!data.about || data.about.length > 2000) {
    throw new Error('About is required and must be 2000 characters or less');
  }

  if (!data.activities || data.activities.length > 500) {
    throw new Error('Activities is required and must be 500 characters or less');
  }

  if (!data.industry || data.industry.length > 100) {
    throw new Error('Industry/Sector is required and must be 100 characters or less');
  }

  if (!data.headquarters || data.headquarters.length > 200) {
    throw new Error('Head office location is required and must be 200 characters or less');
  }

  if (!data.technologies || data.technologies.join(', ').length > 1000) {
    throw new Error('Technologies is required and must be 1000 characters or less');
  }

  if (!data.yearEstablished || data.yearEstablished < 1800) {
    throw new Error('Year established is required and must be 1800 or later');
  }

  if (!data.globalEmployees || data.globalEmployees <= 0) {
    throw new Error('Global employees count is required and must be greater than 0');
  }

  if (!data.website || data.website.length > 500) {
    throw new Error('Website URL is required and must be 500 characters or less');
  }

  if (!data.contactPerson || data.contactPerson.length > 100) {
    throw new Error('Contact person is required and must be 100 characters or less');
  }

  if (!data.contactEmail || data.contactEmail.length > 255) {
    throw new Error('Contact email is required and must be 255 characters or less');
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.contactEmail)) {
    throw new Error('Contact email must be a valid email address');
  }

  if (!data.contactPhone || data.contactPhone.length > 20) {
    throw new Error('Contact phone is required and must be 20 characters or less');
  }

  // Map our form data to the expected API payload format
  const payload: CompanyPayload = {
    name: data.companyName,
    about: data.about,
    activities: data.activities,
    sector: data.industry,
    headOfficeLocation: data.headquarters,
    technologies: data.technologies.join(', '),
    yearEstablished: data.yearEstablished, // Now required
    hasOfficesInBulgaria: data.hasOfficesInBulgaria || false,
    bulgarianOfficeLocations: data.bulgarianOffices ? data.bulgarianOffices.join(', ') : undefined,
    employeesInBulgaria: data.employeesInBulgaria,
    employeesWorldwide: data.globalEmployees,
    whyWorkWithUs: data.whyWorkWithUs,
    websiteUrl: data.website,
    contactName: data.contactPerson,
    contactEmail: data.contactEmail,
    contactPhone: data.contactPhone,
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
