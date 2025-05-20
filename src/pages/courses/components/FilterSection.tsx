import { Button } from '@/components/ui/button';
import { CategoryFilter } from '../types';
import { CategoryFilters } from './CategoryFilters';
import { useTranslation } from 'react-i18next';

interface FilterSectionProps {
  categories: CategoryFilter[];
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  resetFilters: () => void;
}

export const FilterSection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  resetFilters,
}: FilterSectionProps) => {
  const { t } = useTranslation();
  const hasActiveFilters = selectedCategory !== 'all';

  return (
    <div className="lg:w-1/4 space-y-6">
      <div className="p-6 border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{t('courses.filters', 'Filters')}</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 h-8 px-2"
              onClick={resetFilters}
            >
              {t('courses.clearAll', 'Clear All')}
            </Button>
          )}
        </div>
        {/* Category filter */}
        <CategoryFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};
