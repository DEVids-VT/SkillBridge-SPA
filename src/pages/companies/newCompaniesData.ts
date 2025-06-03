import { Company } from './types';

// New company data that uses actual images from public/images/companies
export const companiesData: Company[] = [
  {
    id: 1,
    name: 'Melon AD',
    logo: '/images/companies/melon_ad_logo.jpg',
    description:
      'We are a software development company focused on building teams & delivering meaningful solutions. We provide dedicated development teams and control over application development projects.',
    industry: 'Software Development',
    location: 'Veliko Tarnovo, Bulgaria',
    website: 'https://www.melontech.com',
    yearFounded: 2001,
    employeeCount: '100-500',
    partnershipLevel: 'Gold',
    partnerSince: 2019,
    tags: ['Software Development', 'Custom Solutions', 'Enterprise'],
    featured: true,
  },
  {
    id: 2,
    name: 'Wealth Bulgaria',
    logo: '/images/companies/wblogo.webp',
    description:
      'Independent website created by a group of students in 2022 as a common project to promote free market ideas. Our team consists of young people with experience in various fields, focusing on business and investment topics.',
    industry: 'Finance',
    location: 'Bulgaria',
    website: 'https://www.wealthbulgaria.com',
    yearFounded: 2022,
    employeeCount: '1-10',
    partnershipLevel: 'Gold',
    partnerSince: 2022,
    tags: ['Finance', 'Free Market', 'Investments'],
    featured: true,
  },
  {
    id: 3,
    name: 'BUL-AI',
    logo: '/images/companies/bulailogo.png',
    description:
      'BUL-AI – Bulgarian Artificial Intelligence is a brand focused on AI development. As AI technology gains global attention and popularity, we focus on making it more accessible and usable by students and employees at all levels.',
    industry: 'Artificial Intelligence',
    location: 'Varna, Bulgaria',
    website: 'https://www.bulai.com',
    yearFounded: 2018,
    employeeCount: '10-50',
    partnershipLevel: 'Gold',
    partnerSince: 2021,
    tags: ['AI', 'Machine Learning', 'Education'],
  },
  {
    id: 5,
    name: 'ICT Cluster Varna',
    logo: '/images/companies/ictlogo.jpg',
    description:
      'Creating opportunities. Building talents. Realizing the potential of the region. ICT Cluster - Varna unites organizations and experts sharing the idea of developing Varna as a natural hub for IT and innovations in the Black Sea region.',
    industry: 'IT Cluster',
    location: 'Varna, Bulgaria',
    website: 'https://www.ictcluster.bg',
    yearFounded: 2015,
    employeeCount: '50-100',
    partnershipLevel: 'Gold',
    partnerSince: 2022,
    tags: ['IT Cluster', 'Innovation', 'Regional Development'],
  },
] as const;

// Industry filter options
export const industryFilters = [
  { id: 'all', name: 'All Industries' },
  { id: 'software-development', name: 'Software Development' },
  { id: 'finance', name: 'Finance' },
  { id: 'artificial-intelligence', name: 'Artificial Intelligence' },
  { id: 'real-estate', name: 'Real Estate' },
  { id: 'it-cluster', name: 'IT Cluster' },
];

// Partnership level filter options
export const partnershipLevelFilters = [
  { id: 'all', name: 'All Partners' },
  { id: 'gold', name: 'Gold Partners' },
  { id: 'silver', name: 'Silver Partners' },
  { id: 'bronze', name: 'Bronze Partners' },
];
