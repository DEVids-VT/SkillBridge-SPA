import { Course, CategoryFilter, LevelFilter, PriceFilter } from './types';

export const coursesData: Course[] = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp 2023',
    instructor: 'Dr. Angela Yu',
    description:
      'Become a full-stack web developer with just one course. HTML, CSS, Javascript, React, Node, MongoDB and more!',
    image: '/images/courses/web-dev.jpg',
    category: 'Development',
    level: 'All Levels',
    duration: '63 hours',
    studentsCount: 125430,
    rating: 4.7,
    price: 89.99,
    originalPrice: 199.99,
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'UX/UI Design Essentials: Adobe XD & Figma',
    instructor: 'Daniel Scott',
    description:
      'Master UX/UI Design with Adobe XD and Figma. Complete real-world projects that improve your portfolio.',
    image: '/images/courses/uxui.jpg',
    category: 'Design',
    level: 'Beginner',
    duration: '32 hours',
    studentsCount: 87542,
    rating: 4.8,
    price: 79.99,
    originalPrice: 149.99,
    tags: ['Figma', 'Adobe XD', 'UI Design', 'UX Design', 'Wireframing'],
  },
  {
    id: 3,
    title: 'Digital Marketing Strategy: SEO, Social Media & More',
    instructor: 'Sarah Johnson',
    description:
      'Learn to create effective digital marketing campaigns across SEO, PPC, social media, and content marketing.',
    image: '/images/courses/marketing.jpg',
    category: 'Marketing',
    level: 'Intermediate',
    duration: '28 hours',
    studentsCount: 65234,
    rating: 4.6,
    price: 69.99,
    originalPrice: 129.99,
    tags: ['SEO', 'Social Media', 'Content Marketing', 'PPC', 'Analytics'],
  },
] as const;

// Category filter options
export const categories: CategoryFilter[] = [
  { id: 'all', name: 'All Categories' },
  { id: 'development', name: 'Development' },
  { id: 'design', name: 'Design' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'business', name: 'Business' },
  { id: 'data-science', name: 'Data Science' },
];

// Level filter options
export const levels: LevelFilter[] = [
  { id: 'all', name: 'All Levels' },
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
];

// Price filter options
export const priceRanges: PriceFilter[] = [
  { id: 'all', name: 'All Prices' },
  { id: 'free', name: 'Free', range: [0, 0] },
  { id: 'paid', name: 'Paid', range: [0.01, 999999] },
  { id: 'under-50', name: 'Under $50', range: [0.01, 49.99] },
  { id: '50-100', name: '$50 - $100', range: [50, 100] },
  { id: 'over-100', name: 'Over $100', range: [100.01, 999999] },
];
