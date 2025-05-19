// Types
export interface CompanyProps {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  yearFounded: number;
  employeeCount: string;
  partnershipLevel: "Gold" | "Silver" | "Bronze";
  partnerSince: number;
  tags: string[];
  featured?: boolean;
}

export interface CourseProps {
  id: number;
  title: string;
  instructor: string;
  description: string;
  image: string;
  category: string;
  level: "All Levels" | "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  studentsCount: number;
  rating: number;
  price: number;
  originalPrice: number;
  tags: string[];
}

export interface EventProps {
  id: number;
  title: string;
  description: string;
  image: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  organizer: string;
  attendeesCount: number;
  maxAttendees: number;
  tags: string[];
}

export type EventType = "hackathon" | "conference" | "workshop" | "meetup" | "competition" | "lecture";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
  twitter?: string;
  github?: string;
}

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  company: {
    name: string;
    logo: string;
    description: string;
    location: string;
    website: string;
    size: string;
    founded: string;
    industry: string;
  };
  postedDate: string;
  deadline: string;
  categories: string[];
  requirements: string[];
  benefits: string[];
  projectDetails: {
    duration: string;
    budget: string;
    teamSize: string;
    location: string;
    experienceLevel: string;
  };
}

export interface RelatedProject {
  id: number;
  title: string;
  company: string;
  postedDate: string;
  categories: string[];
}

export interface JobCategory {
  id: string;
  name: string;
  count: number;
  color: string;
  description: string;
  skills: string[];
}

export interface SubCategory {
  id: string;
  name: string;
  count: number;
  icon: string;
}

// Mock Data
export const companiesData: CompanyProps[] = [
  {
    id: 1,
    name: "TechSolutions Inc.",
    logo: "/images/companies/tech-solutions.jpg",
    description: "A leading technology solutions provider focused on digital transformation, cloud services, and enterprise software development.",
    industry: "Information Technology",
    location: "San Francisco, CA",
    website: "https://www.techsolutions.example",
    yearFounded: 2005,
    employeeCount: "1,000-5,000",
    partnershipLevel: "Gold",
    partnerSince: 2018,
    tags: ["Cloud Computing", "Digital Transformation", "Enterprise Software"],
    featured: true
  },
  {
    id: 2,
    name: "InnovateCorp",
    logo: "/images/companies/innovate-corp.jpg",
    description: "Innovation-focused technology company specializing in AI, machine learning, and data analytics solutions.",
    industry: "Artificial Intelligence",
    location: "Boston, MA",
    website: "https://www.innovatecorp.example",
    yearFounded: 2012,
    employeeCount: "500-1,000",
    partnershipLevel: "Silver",
    partnerSince: 2019,
    tags: ["AI", "Machine Learning", "Data Analytics", "Research"]
  },
  {
    id: 3,
    name: "GreenTech Solutions",
    logo: "/images/companies/green-tech.jpg",
    description: "Sustainable technology company developing eco-friendly solutions for businesses and consumers.",
    industry: "Clean Technology",
    location: "Portland, OR",
    website: "https://www.greentech.example",
    yearFounded: 2015,
    employeeCount: "100-500",
    partnershipLevel: "Bronze",
    partnerSince: 2020,
    tags: ["Sustainability", "Clean Energy", "Green Technology"]
  },
  {
    id: 4,
    name: "FinSecurity Group",
    logo: "/images/companies/fin-security.jpg",
    description: "Financial technology company providing secure payment processing, fraud detection, and cybersecurity services.",
    industry: "FinTech",
    location: "New York, NY",
    website: "https://www.finsecurity.example",
    yearFounded: 2010,
    employeeCount: "1,000-5,000",
    partnershipLevel: "Gold",
    partnerSince: 2017,
    tags: ["Cybersecurity", "Finance", "Fraud Detection", "Payments"]
  },
  {
    id: 5,
    name: "HealthPlus Systems",
    logo: "/images/companies/health-plus.jpg",
    description: "Healthcare technology company creating innovative solutions for patient care, telemedicine, and medical record management.",
    industry: "Healthcare Technology",
    location: "Chicago, IL",
    website: "https://www.healthplus.example",
    yearFounded: 2008,
    employeeCount: "500-1,000",
    partnershipLevel: "Silver",
    partnerSince: 2019,
    tags: ["Healthcare", "Telemedicine", "Patient Care", "MedTech"]
  },
  {
    id: 6,
    name: "CreativeWorks Media",
    logo: "/images/companies/creative-works.jpg",
    description: "Creative digital agency specializing in interactive experiences, digital marketing, and content creation.",
    industry: "Digital Media",
    location: "Los Angeles, CA",
    website: "https://www.creativeworks.example",
    yearFounded: 2013,
    employeeCount: "100-500",
    partnershipLevel: "Bronze",
    partnerSince: 2021,
    tags: ["Digital Marketing", "Content Creation", "Interactive Media"]
  },
  {
    id: 7,
    name: "Quantum Dynamics",
    logo: "/images/companies/quantum-dynamics.jpg",
    description: "Cutting-edge research and development firm focused on quantum computing and advanced algorithms.",
    industry: "Quantum Computing",
    location: "Austin, TX",
    website: "https://www.quantumdynamics.example",
    yearFounded: 2016,
    employeeCount: "100-500",
    partnershipLevel: "Silver",
    partnerSince: 2020,
    tags: ["Quantum Computing", "Research", "Algorithms"]
  },
  {
    id: 8,
    name: "EduTech Innovations",
    logo: "/images/companies/edutech.jpg",
    description: "Educational technology company revolutionizing learning with interactive platforms, AI tutoring, and virtual classrooms.",
    industry: "Education Technology",
    location: "Seattle, WA",
    website: "https://www.edutech.example",
    yearFounded: 2014,
    employeeCount: "100-500",
    partnershipLevel: "Bronze",
    partnerSince: 2021,
    tags: ["Education", "E-Learning", "EdTech", "Virtual Learning"]
  }
];

export const coursesData: CourseProps[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2023",
    instructor: "Dr. Angela Yu",
    description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, React, Node, MongoDB and more!",
    image: "/images/courses/web-dev.jpg",
    category: "Development",
    level: "All Levels",
    duration: "63 hours",
    studentsCount: 125430,
    rating: 4.7,
    price: 89.99,
    originalPrice: 199.99,
    tags: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "UX/UI Design Essentials: Adobe XD & Figma",
    instructor: "Daniel Scott",
    description: "Master UX/UI Design with Adobe XD and Figma. Complete real-world projects that improve your portfolio.",
    image: "/images/courses/uxui.jpg",
    category: "Design",
    level: "Beginner",
    duration: "32 hours",
    studentsCount: 87542,
    rating: 4.8,
    price: 79.99,
    originalPrice: 149.99,
    tags: ["Figma", "Adobe XD", "UI Design", "UX Design", "Wireframing"]
  },
  {
    id: 3,
    title: "Digital Marketing Strategy: SEO, Social Media & More",
    instructor: "Sarah Johnson",
    description: "Learn to create effective digital marketing campaigns across SEO, PPC, social media, and content marketing.",
    image: "/images/courses/marketing.jpg",
    category: "Marketing",
    level: "Intermediate",
    duration: "28 hours",
    studentsCount: 65234,
    rating: 4.6,
    price: 69.99,
    originalPrice: 129.99,
    tags: ["SEO", "Social Media", "PPC", "Content Marketing"]
  },
  {
    id: 4,
    title: "Machine Learning A-Z: Hands-On Python & R",
    instructor: "Kirill Eremenko",
    description: "Learn to create Machine Learning algorithms in Python and R. Master Data Science, ML, and AI fundamentals.",
    image: "/images/courses/machine-learning.jpg",
    category: "Technology",
    level: "Advanced",
    duration: "44 hours",
    studentsCount: 157890,
    rating: 4.9,
    price: 99.99,
    originalPrice: 189.99,
    tags: ["Python", "R", "Machine Learning", "AI", "Data Science"]
  },
  {
    id: 5,
    title: "Financial Analysis & Financial Modeling",
    instructor: "Chris Haroun",
    description: "Complete Financial Analyst Training: Excel, Financial Statement Analysis, DCF, Accounting, Business Valuation.",
    image: "/images/courses/finance.jpg",
    category: "Business",
    level: "Intermediate",
    duration: "36 hours",
    studentsCount: 42567,
    rating: 4.5,
    price: 84.99,
    originalPrice: 169.99,
    tags: ["Excel", "Financial Analysis", "Accounting", "Valuation"]
  },
  {
    id: 6,
    title: "Photography Masterclass: A Complete Guide",
    instructor: "Phil Ebiner",
    description: "The best online photography course that will teach you how to take amazing photos and sell them.",
    image: "/images/courses/photography.jpg",
    category: "Design",
    level: "All Levels",
    duration: "25 hours",
    studentsCount: 96432,
    rating: 4.6,
    price: 59.99,
    originalPrice: 119.99,
    tags: ["Photography", "Lightroom", "Photoshop", "DSLR", "Editing"]
  },
  {
    id: 7,
    title: "Modern JavaScript From The Beginning",
    instructor: "Brad Traversy",
    description: "Learn and build projects with pure JavaScript (No frameworks or libraries).",
    image: "/images/courses/javascript.jpg",
    category: "Development",
    level: "Beginner",
    duration: "21 hours",
    studentsCount: 83214,
    rating: 4.7,
    price: 74.99,
    originalPrice: 149.99,
    tags: ["JavaScript", "ES6", "DOM", "Fetch API", "Projects"]
  },
  {
    id: 8,
    title: "Public Speaking & Presentation Skills",
    instructor: "TJ Walker",
    description: "Communicate effectively in business presentations, speeches, and meetings. Overcome fear of public speaking.",
    image: "/images/courses/public-speaking.jpg",
    category: "Personal-Dev",
    level: "All Levels",
    duration: "18 hours",
    studentsCount: 37546,
    rating: 4.4,
    price: 49.99,
    originalPrice: 99.99,
    tags: ["Public Speaking", "Communication", "Presentation Skills"]
  },
  {
    id: 9,
    title: "iOS App Development with Swift 5",
    instructor: "Nick Walter",
    description: "Learn iOS app development by building real apps with Swift 5 and Xcode 13.",
    image: "/images/courses/ios-dev.jpg",
    category: "Development",
    level: "Intermediate",
    duration: "39 hours",
    studentsCount: 56789,
    rating: 4.8,
    price: 94.99,
    originalPrice: 179.99,
    tags: ["iOS", "Swift", "Xcode", "UIKit", "ARKit"]
  }
];

export const eventsData: EventProps[] = [
  {
    id: 1,
    title: "TechConnect Hackathon 2023",
    description: "Join us for a 48-hour coding challenge to build innovative solutions for sustainability challenges.",
    image: "/images/events/hackathon.jpg",
    type: "hackathon",
    date: "2023-06-15",
    time: "09:00 AM - 6:00 PM",
    location: "Innovation Hub, San Francisco",
    isVirtual: false,
    organizer: "TechConnect Foundation",
    attendeesCount: 120,
    maxAttendees: 150,
    tags: ["Coding", "Innovation", "Sustainability", "Teamwork"]
  },
  {
    id: 2,
    title: "Design Systems Conference",
    description: "A virtual conference focused on design systems, component libraries, and scaling design in organizations.",
    image: "/images/events/conference.jpg",
    type: "conference",
    date: "2023-07-10",
    time: "10:00 AM - 5:00 PM",
    location: "Online",
    isVirtual: true,
    organizer: "DesignOps Global",
    attendeesCount: 450,
    maxAttendees: 1000,
    tags: ["Design Systems", "UX", "DesignOps", "Figma"]
  },
  {
    id: 3,
    title: "AI and Machine Learning Workshop",
    description: "Hands-on workshop about practical applications of AI and ML in business. Bring your laptop!",
    image: "/images/events/workshop.jpg",
    type: "workshop",
    date: "2023-06-22",
    time: "1:00 PM - 5:00 PM",
    location: "Tech Campus, Building 3, New York",
    isVirtual: false,
    organizer: "AI Academy",
    attendeesCount: 35,
    maxAttendees: 40,
    tags: ["AI", "Machine Learning", "Python", "Data Science"]
  },
  {
    id: 4,
    title: "Frontend Developers Meetup",
    description: "Monthly meetup for frontend developers to network, share knowledge, and discuss latest trends.",
    image: "/images/events/meetup.jpg",
    type: "meetup",
    date: "2023-06-08",
    time: "6:30 PM - 9:00 PM",
    location: "Coworking Space XYZ, Austin",
    isVirtual: false,
    organizer: "Frontend Community",
    attendeesCount: 65,
    maxAttendees: 100,
    tags: ["Frontend", "React", "JavaScript", "CSS", "Networking"]
  },
  {
    id: 5,
    title: "Global Data Science Competition",
    description: "A 2-week online competition to solve real-world data challenges and win prizes.",
    image: "/images/events/competition.jpg",
    type: "competition",
    date: "2023-07-01",
    time: "Starts at 12:00 PM",
    location: "Online",
    isVirtual: true,
    organizer: "DataSci Networks",
    attendeesCount: 320,
    maxAttendees: 500,
    tags: ["Data Science", "Competition", "Analytics", "Prizes"]
  },
  {
    id: 6,
    title: "Building Scalable Cloud Architecture",
    description: "Technical lecture on designing scalable and resilient cloud architectures for enterprise applications.",
    image: "/images/events/lecture.jpg",
    type: "lecture",
    date: "2023-06-28",
    time: "3:00 PM - 4:30 PM",
    location: "Online",
    isVirtual: true,
    organizer: "Cloud Professionals Association",
    attendeesCount: 210,
    maxAttendees: 500,
    tags: ["Cloud", "AWS", "Architecture", "Scalability"]
  },
  {
    id: 7,
    title: "Women in Tech Hackathon",
    description: "A hackathon aimed at encouraging women's participation in technology and coding.",
    image: "/images/events/women-hackathon.jpg",
    type: "hackathon",
    date: "2023-07-15",
    time: "9:00 AM - 9:00 PM",
    location: "Diversity Tech Hub, Boston",
    isVirtual: false,
    organizer: "Women in Tech Alliance",
    attendeesCount: 85,
    maxAttendees: 120,
    tags: ["WomenInTech", "Diversity", "Coding", "Mentorship"]
  },
  {
    id: 8,
    title: "Product Management Workshop",
    description: "Learn practical product management skills from industry leaders. Ideal for aspiring and junior PMs.",
    image: "/images/events/pm-workshop.jpg",
    type: "workshop",
    date: "2023-06-18",
    time: "10:00 AM - 4:00 PM",
    location: "Business Center, Chicago",
    isVirtual: false,
    organizer: "Product School",
    attendeesCount: 28,
    maxAttendees: 30,
    tags: ["Product Management", "Agile", "Strategy", "UX"]
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/images/team/sarah.jpg",
    bio: "With over 15 years of experience in tech and education, Sarah founded Endorsify to bridge the gap between talent and opportunity.",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    twitter: "https://twitter.com/sarahjohnson"
  },
  {
    name: "David Chen",
    role: "CTO",
    image: "/images/team/david.jpg",
    bio: "David leads our engineering team with expertise in scalable architectures, AI, and creating seamless user experiences.",
    linkedin: "https://linkedin.com/in/davidchen",
    github: "https://github.com/davidchen"
  },
  {
    name: "Miguel Rodriguez",
    role: "Head of Partnerships",
    image: "/images/team/miguel.jpg",
    bio: "Miguel builds and maintains our extensive partner network, developing strategic relationships with companies and institutions.",
    linkedin: "https://linkedin.com/in/miguelrodriguez",
    twitter: "https://twitter.com/miguelrodriguez"
  },
  {
    name: "Aisha Patel",
    role: "Director of Education",
    image: "/images/team/aisha.jpg",
    bio: "Aisha curates our educational content and courses, ensuring we provide cutting-edge learning experiences.",
    linkedin: "https://linkedin.com/in/aishapatel"
  }
];

export const projectData: ProjectData = {
  id: 1,
  title: "Mobile App Development for Health Tech Platform",
  description: "We are seeking a talented React Native developer to build a cross-platform mobile application for our health tech startup. The project involves integrating with health APIs and creating an intuitive user interface that helps users track their health metrics and connect with healthcare providers.",
  company: {
    name: "TechCorp Solutions",
    logo: "/images/companies/company1.webp",
    description: "A leading technology solutions provider focused on digital transformation and healthcare innovation.",
    location: "San Francisco, CA",
    website: "https://techcorp.example.com",
    size: "50-200 employees",
    founded: "2018",
    industry: "Healthcare Technology"
  },
  postedDate: "2024-03-15",
  deadline: "2024-06-30",
  categories: ["Mobile Development", "Healthcare", "React Native", "API Integration"],
  requirements: [
    "3+ years of experience with React Native",
    "Strong understanding of mobile app architecture",
    "Experience with healthcare APIs and data security",
    "Knowledge of TypeScript and modern JavaScript",
    "Experience with state management solutions"
  ],
  benefits: [
    "Competitive compensation package",
    "Remote work opportunity",
    "Flexible working hours",
    "Professional development budget",
    "Healthcare coverage"
  ],
  projectDetails: {
    duration: "6 months",
    budget: "$50,000 - $75,000",
    teamSize: "3-5 people",
    location: "Remote",
    experienceLevel: "Mid to Senior"
  }
};

export const relatedProjects: RelatedProject[] = [
  {
    id: 2,
    title: "Healthcare Analytics Dashboard",
    company: "MedTech Solutions",
    postedDate: "2024-03-10",
    categories: ["Healthcare", "Data Analytics"]
  },
  {
    id: 3,
    title: "Patient Management System",
    company: "HealthCare Plus",
    postedDate: "2024-03-12",
    categories: ["Healthcare", "System Development"]
  },
  {
    id: 4,
    title: "Medical Records API Integration",
    company: "Digital Health",
    postedDate: "2024-03-14",
    categories: ["Healthcare", "API Integration"]
  },
  {
    id: 5,
    title: "E-commerce Platform Development",
    company: "RetailTech",
    postedDate: "2024-03-15",
    categories: ["E-commerce", "Web Development"]
  },
  {
    id: 6,
    title: "AI-Powered Customer Service Bot",
    company: "AI Solutions Inc",
    postedDate: "2024-03-16",
    categories: ["AI", "Customer Service"]
  },
  {
    id: 7,
    title: "Blockchain Supply Chain System",
    company: "ChainTech",
    postedDate: "2024-03-17",
    categories: ["Blockchain", "Supply Chain"]
  },
  {
    id: 8,
    title: "Mobile Banking App Redesign",
    company: "FinTech Innovations",
    postedDate: "2024-03-18",
    categories: ["FinTech", "Mobile Development"]
  },
  {
    id: 9,
    title: "Smart Home Automation System",
    company: "IoT Solutions",
    postedDate: "2024-03-19",
    categories: ["IoT", "Home Automation"]
  },
  {
    id: 10,
    title: "Virtual Reality Training Platform",
    company: "VR Education",
    postedDate: "2024-03-20",
    categories: ["VR", "Education"]
  },
  {
    id: 11,
    title: "Cybersecurity Monitoring Tool",
    company: "SecureNet",
    postedDate: "2024-03-21",
    categories: ["Cybersecurity", "Monitoring"]
  },
  {
    id: 12,
    title: "Social Media Analytics Dashboard",
    company: "SocialMetrics",
    postedDate: "2024-03-22",
    categories: ["Social Media", "Analytics"]
  },
  {
    id: 13,
    title: "Cloud Migration Project",
    company: "CloudTech",
    postedDate: "2024-03-23",
    categories: ["Cloud", "DevOps"]
  },
  {
    id: 14,
    title: "Machine Learning Model for Fraud Detection",
    company: "AI Security",
    postedDate: "2024-03-24",
    categories: ["Machine Learning", "Security"]
  },
  {
    id: 15,
    title: "Digital Marketing Campaign Platform",
    company: "MarketingPro",
    postedDate: "2024-03-25",
    categories: ["Marketing", "Web Development"]
  }
];

export const jobCategories: JobCategory[] = [
  { 
    id: "development", 
    name: "Development", 
    count: 1026, 
    color: "bg-blue-100 text-blue-700",
    description: "Build digital products with cutting-edge technologies",
    skills: ["Backend", "Frontend", "Mobile", "Fullstack"]
  },
  { 
    id: "design", 
    name: "Design", 
    count: 458, 
    color: "bg-purple-100 text-purple-700",
    description: "Create beautiful user experiences and visual identities",
    skills: ["UI Design", "UX Design", "Graphic Design", "Product Design"]
  },
  { 
    id: "marketing", 
    name: "Marketing", 
    count: 326, 
    color: "bg-green-100 text-green-700",
    description: "Drive growth and engagement through creative campaigns",
    skills: ["Digital Marketing", "SEO", "Social Media", "Content Marketing"]
  },
  { 
    id: "content", 
    name: "Content Creation", 
    count: 294, 
    color: "bg-yellow-100 text-yellow-700",
    description: "Craft compelling stories across various media formats",
    skills: ["Content Writing", "Video Production", "Podcasts", "Photography"]
  },
  { 
    id: "architecture", 
    name: "Architecture", 
    count: 142, 
    color: "bg-gray-100 text-gray-700",
    description: "Design innovative spaces and sustainable structures",
    skills: ["Residential", "Commercial", "Interior Design", "Landscape"]
  },
  { 
    id: "agencies", 
    name: "Agencies", 
    count: 231, 
    color: "bg-red-100 text-red-700",
    description: "Collaborate with full-service creative and technical agencies",
    skills: ["Creative Agencies", "Digital Agencies", "Advertising", "PR Agencies"]
  }
];

export const subcategories: Record<string, SubCategory[]> = {
  development: [
    { id: "backend", name: "Backend", count: 182, icon: "🔧" },
    { id: "frontend", name: "Frontend", count: 244, icon: "🎨" },
    { id: "fullstack", name: "Fullstack", count: 156, icon: "🔄" },
    { id: "mobile", name: "Mobile Dev", count: 128, icon: "📱" },
  ],
  design: [
    { id: "ui", name: "UI Design", count: 142, icon: "🖌️" },
    { id: "ux", name: "UX Design", count: 124, icon: "🧠" },
    { id: "graphic", name: "Graphic Design", count: 86, icon: "🎭" },
    { id: "product", name: "Product Design", count: 68, icon: "📱" },
  ],
  marketing: [
    { id: "digital", name: "Digital Marketing", count: 108, icon: "💻" },
    { id: "seo", name: "SEO", count: 76, icon: "🔍" },
    { id: "social", name: "Social Media", count: 64, icon: "📱" },
    { id: "content-marketing", name: "Content Marketing", count: 48, icon: "📝" },
  ],
  content: [
    { id: "writing", name: "Content Writing", count: 96, icon: "✍️" },
    { id: "video", name: "Video Production", count: 78, icon: "🎥" },
    { id: "podcasts", name: "Podcasts", count: 42, icon: "🎙️" },
    { id: "photography", name: "Photography", count: 38, icon: "📷" },
  ],
  architecture: [
    { id: "residential", name: "Residential", count: 54, icon: "🏠" },
    { id: "commercial", name: "Commercial", count: 36, icon: "🏢" },
    { id: "interior", name: "Interior Design", count: 30, icon: "🛋️" },
    { id: "landscape", name: "Landscape", count: 22, icon: "🌳" },
  ],
  agencies: [
    { id: "creative", name: "Creative Agencies", count: 84, icon: "🎨" },
    { id: "digital", name: "Digital Agencies", count: 76, icon: "💻" },
    { id: "advertising", name: "Advertising", count: 42, icon: "📣" },
    { id: "pr", name: "PR Agencies", count: 29, icon: "🔊" },
  ],
};

// Filter options
export const industryFilters = [
  { id: "all", name: "All Industries" },
  { id: "it", name: "Information Technology" },
  { id: "ai", name: "Artificial Intelligence" },
  { id: "fintech", name: "FinTech" },
  { id: "healthcare", name: "Healthcare" },
  { id: "education", name: "Education" },
  { id: "clean-tech", name: "Clean Technology" }
];

export const eventTypeFilters: { id: EventType | "all"; name: string }[] = [
  { id: "all", name: "All Events" },
  { id: "hackathon", name: "Hackathons" },
  { id: "conference", name: "Conferences" },
  { id: "workshop", name: "Workshops" },
  { id: "meetup", name: "Meetups" },
  { id: "competition", name: "Competitions" },
  { id: "lecture", name: "Lectures" }
];

export const categories = [
  { id: "all", name: "All Categories" },
  { id: "development", name: "Development" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
  { id: "business", name: "Business" },
  { id: "personal-dev", name: "Personal Development" },
  { id: "technology", name: "Technology" },
];

export const levels = [
  { id: "all", name: "All Levels" },
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" },
]; 