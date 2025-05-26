import { useTranslation } from 'react-i18next';
import { CategoryFilter } from '../types';
import { CheckIcon, XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">{t('projectsPage.filters.title')}</h3>
        
        {selectedCategory !== 'all' && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="h-7 px-2 text-sm text-gray-500 hover:text-gray-700"
          >
            {t('projectsPage.filters.clear')}
          </Button>
        )}
      </div>
      
      <div className="border-t border-gray-100 pt-4 pb-2">
        <h4 className="text-sm font-medium text-gray-700 mb-3">{t('projectsPage.filters.categories')}</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <div className="flex items-center">
                {category.id !== 'all' && (
                  <Badge className={cn('w-2 h-2 rounded-full mr-2', category.color || 'bg-gray-200')} />
                )}
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              
              {selectedCategory === category.id && (
                <CheckIcon className="w-4 h-4 text-blue-600" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4 mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">{t('projectsPage.filters.otherOptions')}</h4>
        <div className="space-y-1">
          <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-gray-700">{t('projectsPage.filters.mostRecent')}</span>
          </div>
          <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-gray-700">{t('projectsPage.filters.upcoming')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import { cn } from '@/lib/utils'; 