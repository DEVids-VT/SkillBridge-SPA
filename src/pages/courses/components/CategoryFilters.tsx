import { Button } from '@/components/ui/button';
import { CategoryFilter } from '../types';

interface CategoryFiltersProps {
  categories: CategoryFilter[];
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
}

export const CategoryFilters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFiltersProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">Category</h4>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <input
              type="radio"
              id={`category-${category.id}`}
              name="category"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              checked={selectedCategory === category.id}
              onChange={() => setSelectedCategory(category.id)}
            />
            <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
