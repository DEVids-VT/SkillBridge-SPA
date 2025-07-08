import { useTranslation } from 'react-i18next';
import { CategoryFilter } from '../types';
import { CheckIcon } from 'lucide-react';
import { cards, colors } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  categories: CategoryFilter[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

export const FilterSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const { t } = useTranslation('project');

  return (
    <div className={`${cards.base} sticky top-24`}>
      <div className={cards.header}>
        <h3 className="font-medium" style={{ color: colors.white }}>
          {t('projectsPage.filters.title')}
        </h3>

        {selectedCategory !== 'all' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-7 px-2 text-sm"
            style={{ color: colors.white }}
          >
            {t('projectsPage.filters.clear')}
          </Button>
        )}
      </div>

      <div className={cards.body}>
        <h4 className="text-sm font-medium mb-3" style={{ color: colors.white }}>
          {t('projectsPage.filters.categories')}
        </h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                selectedCategory === category.id ? 'bg-primary/20' : 'hover:bg-primary/10'
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <div className="flex items-center">
                {category.id !== 'all' && (
                  <Badge
                    className={cn('w-2 h-2 rounded-full mr-2', category.color || 'bg-gray-200')}
                  />
                )}
                <span className="text-sm" style={{ color: colors.white }}>
                  {category.name}
                </span>
              </div>

              {selectedCategory === category.id && (
                <CheckIcon className="w-4 h-4" style={{ color: colors.yellow }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={cards.footer}>
        <h4 className="text-sm font-medium mb-3" style={{ color: colors.white }}>
          {t('projectsPage.filters.otherOptions')}
        </h4>
        <div className="space-y-1">
          <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-primary/10">
            <span className="text-sm" style={{ color: colors.white }}>
              {t('projectsPage.filters.mostRecent')}
            </span>
          </div>
          <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-primary/10">
            <span className="text-sm" style={{ color: colors.white }}>
              {t('projectsPage.filters.upcoming')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
