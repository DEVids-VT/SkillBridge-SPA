export interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  studentsCount: number;
  rating: number;
  price: number;
  originalPrice: number;
  tags: string[];
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
