import { Course, CategoryFilter, LevelFilter, PriceFilter } from './types';

export const aiDevelopmentCourse: Course = {
  id: 1,
  title: 'Modern Software Development with AI',
  instructor: 'Alex Mitchell',
  description:
    'Master AI-assisted development with tools like GitHub Copilot, Claude, ChatGPT. Learn about MPC servers, no-code/low-code platforms, and modern IDEs that will revolutionize your workflow and productivity as a developer.',
  image: '/images/courses/ai-development.jpg',
  category: 'Development',
  level: 'All Levels',
  duration: '12 hours',
  studentsCount: 45230,
  rating: 4.9,
  price: 0, // Free course
  originalPrice: 129.99,
  tags: ['AI Development', 'GitHub Copilot', 'Modern IDEs', 'Low-Code', 'MPC Servers', 'LLMs'],
};

export const coursesData: Course[] = [
  aiDevelopmentCourse,
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
  // Free course
  {
    id: 5,
    title: 'Introduction to Open Source & Git',
    instructor: 'Jane Doe',
    description:
      'A practical, hands-on introduction to open source collaboration and Git version control. Perfect for beginners!',
    image: '/images/courses/git.jpg',
    category: 'Development',
    level: 'Beginner',
    duration: '8 hours',
    studentsCount: 21000,
    rating: 4.9,
    price: 0,
    originalPrice: 0,
    tags: ['Git', 'Open Source', 'Collaboration', 'Version Control'],
  },
] as const;

// Category filter options
export const categories: CategoryFilter[] = [
  { id: 'all', name: 'courses.allCategories' },
  { id: 'development', name: 'categories.development' },
  { id: 'design', name: 'categories.design' },
  { id: 'marketing', name: 'categories.marketing' },
  { id: 'business', name: 'categories.business' },
  { id: 'data-science', name: 'categories.dataScience' },
];

// Level filter options
export const levels: LevelFilter[] = [
  { id: 'all', name: 'All Levels' },
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
];

// Note: In the new concept, courses are accessed after completing projects,
// so price filters are no longer necessary. They are kept here for reference.
export const priceRanges: PriceFilter[] = [
  { id: 'all', name: 'All Prices' },
  { id: 'free', name: 'Free', range: [0, 0] },
];
