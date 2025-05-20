import { CategoryFilter } from '../types';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
            selectedCategory === category.id
              ? 'bg-blue-100 text-blue-700 font-semibold'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => setSelectedCategory(category.id)}
        >
          {t(category.name)}
        </button>
      ))}
    </div>
  );
};
