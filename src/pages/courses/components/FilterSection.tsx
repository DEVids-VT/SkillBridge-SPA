import { Button } from '@/components/ui/button';
import { CategoryFilter, LevelFilter, PriceFilter } from '../types';
import { CategoryFilters } from './CategoryFilters';
import { LevelFilters } from './LevelFilters';
import { PriceFilters } from './PriceFilters';
import { Filter, Sliders } from 'lucide-react';

interface FilterSectionProps {
  categories: CategoryFilter[];
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  levels: LevelFilter[];
  selectedLevel: string;
  setSelectedLevel: (levelId: string) => void;
  priceRanges: PriceFilter[];
  selectedPrice: string;
  setSelectedPrice: (priceId: string) => void;
  resetFilters: () => void;
}

export const FilterSection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  levels,
  selectedLevel,
  setSelectedLevel,
  priceRanges,
  selectedPrice,
  setSelectedPrice,
  resetFilters,
}: FilterSectionProps) => {
  const hasActiveFilters =
    selectedCategory !== 'all' || selectedLevel !== 'all' || selectedPrice !== 'all';

  return (
    <div className="lg:w-1/4 space-y-6">
      <div className="p-6 border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 h-8 px-2"
              onClick={resetFilters}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Category filter */}
        <CategoryFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <hr className="my-6" />

        {/* Level filter */}
        <LevelFilters
          levels={levels}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />

        <hr className="my-6" />

        {/* Price filter */}
        <PriceFilters
          priceRanges={priceRanges}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />
      </div>
    </div>
  );
};
