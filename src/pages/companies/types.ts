// Types for companies
export interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  yearFounded: number;
  employeeCount: string;
  partnershipLevel: string;
  partnerSince: number;
  tags: string[];
  featured?: boolean;
}

export interface IndustryFilter {
  id: string;
  name: string;
}

export interface PartnershipLevelFilter {
  id: string;
  name: string;
}
