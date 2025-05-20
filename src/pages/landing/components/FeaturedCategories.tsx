import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CategoryType } from '../types';

type FeaturedCategoriesProps = {
  categories: CategoryType[];
};

export const FeaturedCategories = ({ categories }: FeaturedCategoriesProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative pb-16 md:pb-24 w-full">
      <div className="w-full px-4 lg:px-0 mx-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-500 text-center mb-8 drop-shadow-md">
            {t('topCategories', 'Top Categories')}
          </h2>

          <div className="flex justify-center items-center w-full">
            <div className="flex flex-wrap w-full max-w-4xl gap-4">
              {categories.slice(0, 3).map((category) => (
                <Link
                  to={`/categories/${category.id}`}
                  key={category.id}
                  className="group flex flex-col items-center justify-center p-4 rounded-xl bg-white/90 backdrop-blur shadow-lg hover:bg-white transition-all hover:scale-105 hover:shadow-xl w-1/2 md:w-1/4 flex-grow m-2"
                  style={{ minWidth: '150px', maxWidth: '250px', flex: '1 0 auto' }}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full overflow-hidden flex items-center justify-center mb-2',
                      category.color.split(' ')[0]
                    )}
                  >
                    <span className="text-xl font-bold">{category.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-center line-clamp-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {category.count}+ {t('projects', 'projects')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
