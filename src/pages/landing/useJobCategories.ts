import { useTranslation } from 'react-i18next';
import { CategoryType, SubcategoriesMap } from './types';

export const useJobCategories = () => {
  const { t } = useTranslation();

  // Categories with sample counts and image paths
  const jobCategories: CategoryType[] = [
    {
      id: 'development',
      name: t('categories.development', 'Development'),
      count: 1026,
      color: 'bg-blue-100 text-blue-700',
      description: t(
        'categories.developmentDesc',
        'Build digital products with cutting-edge technologies'
      ),
      skills: [
        t('skills.backend', 'Backend'),
        t('skills.frontend', 'Frontend'),
        t('skills.mobile', 'Mobile'),
        t('skills.fullstack', 'Fullstack'),
      ],
    },
    {
      id: 'design',
      name: t('categories.design', 'Design'),
      count: 458,
      color: 'bg-purple-100 text-purple-700',
      description: t(
        'categories.designDesc',
        'Create beautiful user experiences and visual identities'
      ),
      skills: [
        t('skills.uiDesign', 'UI Design'),
        t('skills.uxDesign', 'UX Design'),
        t('skills.graphicDesign', 'Graphic Design'),
        t('skills.productDesign', 'Product Design'),
      ],
    },
    {
      id: 'marketing',
      name: t('categories.marketing', 'Marketing'),
      count: 326,
      color: 'bg-green-100 text-green-700',
      description: t(
        'categories.marketingDesc',
        'Drive growth and engagement through creative campaigns'
      ),
      skills: [
        t('skills.digitalMarketing', 'Digital Marketing'),
        t('skills.seo', 'SEO'),
        t('skills.socialMedia', 'Social Media'),
        t('skills.contentMarketing', 'Content Marketing'),
      ],
    },
    {
      id: 'content',
      name: t('categories.content', 'Content Creation'),
      count: 294,
      color: 'bg-yellow-100 text-yellow-700',
      description: t(
        'categories.contentDesc',
        'Craft compelling stories across various media formats'
      ),
      skills: [
        t('skills.contentWriting', 'Content Writing'),
        t('skills.videoProduction', 'Video Production'),
        t('skills.podcasts', 'Podcasts'),
        t('skills.photography', 'Photography'),
      ],
    },
    {
      id: 'architecture',
      name: t('categories.architecture', 'Architecture'),
      count: 142,
      color: 'bg-gray-100 text-gray-700',
      description: t(
        'categories.architectureDesc',
        'Design innovative spaces and sustainable structures'
      ),
      skills: [
        t('skills.residential', 'Residential'),
        t('skills.commercial', 'Commercial'),
        t('skills.interiorDesign', 'Interior Design'),
        t('skills.landscape', 'Landscape'),
      ],
    },
    {
      id: 'agencies',
      name: t('categories.agencies', 'Agencies'),
      count: 231,
      color: 'bg-red-100 text-red-700',
      description: t(
        'categories.agenciesDesc',
        'Collaborate with full-service creative and technical agencies'
      ),
      skills: [
        t('skills.creativeAgencies', 'Creative Agencies'),
        t('skills.digitalAgencies', 'Digital Agencies'),
        t('skills.advertising', 'Advertising'),
        t('skills.prAgencies', 'PR Agencies'),
      ],
    },
  ];

  // Subcategories for each main category
  const subcategories: SubcategoriesMap = {
    development: [
      { id: 'backend', name: t('skills.backend', 'Backend'), count: 182, icon: '🔧' },
      { id: 'frontend', name: t('skills.frontend', 'Frontend'), count: 244, icon: '🎨' },
      { id: 'fullstack', name: t('skills.fullstack', 'Fullstack'), count: 156, icon: '🔄' },
      { id: 'mobile', name: t('skills.mobile', 'Mobile Dev'), count: 128, icon: '📱' },
    ],
    design: [
      { id: 'ui', name: t('skills.uiDesign', 'UI Design'), count: 142, icon: '🖌️' },
      { id: 'ux', name: t('skills.uxDesign', 'UX Design'), count: 124, icon: '🧠' },
      { id: 'graphic', name: t('skills.graphicDesign', 'Graphic Design'), count: 86, icon: '🎭' },
      { id: 'product', name: t('skills.productDesign', 'Product Design'), count: 68, icon: '📱' },
    ],
    marketing: [
      {
        id: 'digital',
        name: t('skills.digitalMarketing', 'Digital Marketing'),
        count: 108,
        icon: '💻',
      },
      { id: 'seo', name: t('skills.seo', 'SEO'), count: 76, icon: '🔍' },
      { id: 'social', name: t('skills.socialMedia', 'Social Media'), count: 64, icon: '📱' },
      {
        id: 'content-marketing',
        name: t('skills.contentMarketing', 'Content Marketing'),
        count: 48,
        icon: '📝',
      },
    ],
    content: [
      { id: 'writing', name: t('skills.contentWriting', 'Content Writing'), count: 96, icon: '✍️' },
      { id: 'video', name: t('skills.videoProduction', 'Video Production'), count: 78, icon: '🎥' },
      { id: 'podcasts', name: t('skills.podcasts', 'Podcasts'), count: 42, icon: '🎙️' },
      { id: 'photography', name: t('skills.photography', 'Photography'), count: 38, icon: '📷' },
    ],
    architecture: [
      { id: 'residential', name: t('skills.residential', 'Residential'), count: 54, icon: '🏠' },
      { id: 'commercial', name: t('skills.commercial', 'Commercial'), count: 36, icon: '🏢' },
      {
        id: 'interior',
        name: t('skills.interiorDesign', 'Interior Design'),
        count: 30,
        icon: '🛋️',
      },
      { id: 'landscape', name: t('skills.landscape', 'Landscape'), count: 22, icon: '🌳' },
    ],
    agencies: [
      {
        id: 'creative',
        name: t('skills.creativeAgencies', 'Creative Agencies'),
        count: 84,
        icon: '🎨',
      },
      {
        id: 'digital',
        name: t('skills.digitalAgencies', 'Digital Agencies'),
        count: 76,
        icon: '💻',
      },
      { id: 'advertising', name: t('skills.advertising', 'Advertising'), count: 42, icon: '📣' },
      { id: 'pr', name: t('skills.prAgencies', 'PR Agencies'), count: 29, icon: '🔊' },
    ],
  };

  return { jobCategories, subcategories };
};
