// Company profile related types matching API models

export interface CompanyResponse {
  id: string;
  name: string;
  about: string;
  logoUrl?: string;
  bannerUrl?: string;
  activities: string;
  sector: string;
  headOfficeLocation: string;
  technologies: string;
  yearEstablished?: number;
  hasOfficesInBulgaria: boolean;
  bulgarianOfficeLocations?: string;
  employeesInBulgaria?: number;
  employeesWorldwide: number;
  whyWorkWithUs?: string;
  websiteUrl: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  auth0UserId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateCompanyRequest {
  name?: string;
  about?: string;
  logoUrl?: string;
  bannerUrl?: string;
  activities?: string;
  sector?: string;
  headOfficeLocation?: string;
  technologies?: string;
  yearEstablished?: number;
  hasOfficesInBulgaria?: boolean;
  bulgarianOfficeLocations?: string;
  employeesInBulgaria?: number;
  employeesWorldwide?: number;
  whyWorkWithUs?: string;
  websiteUrl?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}
