import { Company, IndustryFilter, PartnershipLevelFilter } from './types';

// Mock company data
export const companiesData: Company[] = [
  {
    id: 1,
    name: 'TechSolutions Inc.',
    logo: '/images/companies/tech-solutions.jpg',
    description:
      'A leading technology solutions provider focused on digital transformation, cloud services, and enterprise software development.',
    industry: 'Information Technology',
    location: 'San Francisco, CA',
    website: 'https://www.techsolutions.example',
    yearFounded: 2005,
    employeeCount: '1,000-5,000',
    partnershipLevel: 'Gold',
    partnerSince: 2018,
    tags: ['Cloud Computing', 'Digital Transformation', 'Enterprise Software'],
    featured: true,
  },
  {
    id: 2,
    name: 'InnovateCorp',
    logo: '/images/companies/innovate-corp.jpg',
    description:
      'Innovation-focused technology company specializing in AI, machine learning, and data analytics solutions.',
    industry: 'Artificial Intelligence',
    location: 'Boston, MA',
    website: 'https://www.innovatecorp.example',
    yearFounded: 2012,
    employeeCount: '500-1,000',
    partnershipLevel: 'Silver',
    partnerSince: 2019,
    tags: ['AI', 'Machine Learning', 'Data Analytics', 'Research'],
  },
  {
    id: 3,
    name: 'GreenTech Solutions',
    logo: '/images/companies/green-tech.jpg',
    description:
      'Sustainable technology company developing eco-friendly solutions for businesses and consumers.',
    industry: 'Clean Technology',
    location: 'Portland, OR',
    website: 'https://www.greentech.example',
    yearFounded: 2015,
    employeeCount: '100-500',
    partnershipLevel: 'Bronze',
    partnerSince: 2020,
    tags: ['Sustainability', 'Clean Energy', 'Green Technology'],
  },
  {
    id: 4,
    name: 'FinSecurity Group',
    logo: '/images/companies/fin-security.jpg',
    description:
      'Financial technology company providing secure payment processing, fraud detection, and cybersecurity services.',
    industry: 'FinTech',
    location: 'New York, NY',
    website: 'https://www.finsecurity.example',
    yearFounded: 2010,
    employeeCount: '1,000-5,000',
    partnershipLevel: 'Gold',
    partnerSince: 2017,
    tags: ['Cybersecurity', 'Finance', 'Fraud Detection', 'Payments'],
  },
  {
    id: 5,
    name: 'HealthPlus Systems',
    logo: '/images/companies/health-plus.jpg',
    description:
      'Healthcare technology company creating innovative solutions for patient care, telemedicine, and medical record management.',
    industry: 'Healthcare Technology',
    location: 'Chicago, IL',
    website: 'https://www.healthplus.example',
    yearFounded: 2008,
    employeeCount: '500-1,000',
    partnershipLevel: 'Silver',
    partnerSince: 2019,
    tags: ['Healthcare', 'Telemedicine', 'Medical Records', 'Patient Care'],
    featured: true,
  },
  {
    id: 6,
    name: 'CreativeLabs',
    logo: '/images/companies/creative-labs.jpg',
    description:
      'Creative technology studio focused on digital design, UX/UI, animation, and interactive experiences.',
    industry: 'Digital Design',
    location: 'Los Angeles, CA',
    website: 'https://www.creativelabs.example',
    yearFounded: 2016,
    employeeCount: '50-100',
    partnershipLevel: 'Bronze',
    partnerSince: 2021,
    tags: ['UX/UI', 'Animation', 'Digital Design', 'Interactive Media'],
  },
] as const;

// Industry filter options
export const industryFilters: IndustryFilter[] = [
  { id: 'all', name: 'All Industries' },
  { id: 'information-technology', name: 'Information Technology' },
  { id: 'artificial-intelligence', name: 'Artificial Intelligence' },
  { id: 'fintech', name: 'FinTech' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'design', name: 'Digital Design' },
];

// Partnership level filter options
export const partnershipLevelFilters: PartnershipLevelFilter[] = [
  { id: 'all', name: 'All Partners' },
  { id: 'gold', name: 'Gold Partners' },
  { id: 'silver', name: 'Silver Partners' },
  { id: 'bronze', name: 'Bronze Partners' },
];
