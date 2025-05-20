export type CategoryType = {
  id: string;
  name: string;
  count: number;
  color: string;
  description: string;
  skills: string[];
};

export type SubcategoryType = {
  id: string;
  name: string;
  count: number;
  icon: string;
};

export type SubcategoriesMap = {
  [key: string]: SubcategoryType[];
};
