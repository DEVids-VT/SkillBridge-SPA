export interface Course {
  id: number;
  title: string;
  company: string;
  description: string;
  image: string;
  category?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  requiredProject: string;
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
  courses: number;
  projects: number;
}

export interface CategoryFilter {
  id: string;
  name: string;
}

export interface LevelFilter {
  id: string;
  name: string;
}

export interface PriceFilter {
  id: string;
  name: string;
  range?: [number, number];
}

export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}
