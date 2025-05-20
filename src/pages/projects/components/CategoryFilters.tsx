import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CategoryFilter } from '../types';

interface CategoryFiltersProps {
  categories: CategoryFilter[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategoryFilters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFiltersProps) => {
  return (
    <div className="flex justify-center mb-12 gap-2 flex-wrap">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          className={cn(
            'rounded-full px-6',
            selectedCategory === category.id && category.id !== 'all' ? category.color : ''
          )}
          onClick={() => setSelectedCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};
