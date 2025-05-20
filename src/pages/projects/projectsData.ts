import { Project, CategoryFilter } from './types';

// Mock company logos (would be replaced with actual images in production)
const companyLogos = [
  '/images/companies/company1.webp',
  '/images/companies/company2.webp',
  '/images/companies/company3.webp',
  '/images/companies/company4.webp',
  '/images/companies/company5.webp',
  '/images/companies/company6.webp',
];

// Mock project requirement data
export const projectRequirements: Project[] = [
  {
    id: 1,
    company: 'TechCorp Solutions',
    logo: companyLogos[0],
    title: 'Mobile App Development',
    description:
      'Looking for a talented React Native developer to build a cross-platform mobile application for our health tech startup. The project involves integrating with health APIs and creating an intuitive user interface.',
    category: 'development',
    skills: ['React Native', 'JavaScript', 'API Integration', 'UI/UX'],
    postedDate: '2023-05-15',
    deadline: '2023-06-30',
  },
  {
    id: 2,
    company: 'CreativeMinds Agency',
    logo: companyLogos[1],
    title: 'UX/UI Redesign for SaaS Platform',
    description:
      "Our client's SaaS platform needs a complete UX/UI overhaul to improve user experience and modernize the interface. Looking for a designer with strong experience in SaaS products.",
    category: 'design',
    skills: ['Figma', 'UX Design', 'UI Design', 'SaaS Experience'],
    postedDate: '2023-05-10',
    deadline: '2023-06-15',
  },
  {
    id: 3,
    company: 'GrowthMarketing',
    logo: companyLogos[2],
    title: 'Content Strategy for Fintech',
    description:
      "Develop a comprehensive content strategy for our fintech client's blog and social media channels. The ideal candidate has experience in financial content and understands SEO principles.",
    category: 'marketing',
    skills: ['Content Strategy', 'SEO', 'Financial Knowledge', 'Social Media'],
    postedDate: '2023-05-18',
    deadline: '2023-06-01',
  },
  {
    id: 4,
    company: 'Archiplex Studio',
    logo: companyLogos[3],
    title: '3D Visualization for Commercial Building',
    description:
      'Create photorealistic 3D renderings of a new commercial building complex. This project requires expertise in architectural visualization and attention to detail.',
    category: 'architecture',
    skills: ['3D Modeling', 'Rendering', 'Architectural Visualization', 'Blender'],
    postedDate: '2023-05-05',
    deadline: '2023-07-10',
  },
  {
    id: 5,
    company: 'DataSmart Analytics',
    logo: companyLogos[4],
    title: 'Data Dashboard Development',
    description:
      'Build an interactive data dashboard using React and D3.js to visualize complex datasets for our analytics platform. Experience with large data visualization is a must.',
    category: 'development',
    skills: ['React', 'D3.js', 'Data Visualization', 'JavaScript'],
    postedDate: '2023-05-12',
    deadline: '2023-06-25',
  },
  {
    id: 6,
    company: 'SocialBoost Media',
    logo: companyLogos[5],
    title: 'Social Media Campaign for Product Launch',
    description:
      'Plan and execute a comprehensive social media campaign for a new eco-friendly product launch. Looking for creative marketers with experience in sustainable product marketing.',
    category: 'marketing',
    skills: ['Social Media', 'Campaign Planning', 'Green Marketing', 'Analytics'],
    postedDate: '2023-05-20',
    deadline: '2023-06-10',
  },
];

// Category filter options
export const categories: CategoryFilter[] = [
  { id: 'all', name: 'All Categories' },
  { id: 'development', name: 'Development', color: 'bg-blue-100 text-blue-700' },
  { id: 'design', name: 'Design', color: 'bg-purple-100 text-purple-700' },
  { id: 'marketing', name: 'Marketing', color: 'bg-green-100 text-green-700' },
  { id: 'content', name: 'Content', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'architecture', name: 'Architecture', color: 'bg-gray-100 text-gray-700' },
];
