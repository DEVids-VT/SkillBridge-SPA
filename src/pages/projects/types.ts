// Types for projects
export interface Project {
  id: number;
  company: string;
  logo: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  postedDate: string;
  deadline: string;
}

export interface CategoryFilter {
  id: string;
  name: string;
  color?: string;
}
