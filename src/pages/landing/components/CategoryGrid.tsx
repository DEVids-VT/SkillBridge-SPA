import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CategoryType } from '../types';

type CategoryGridProps = {
  categories: CategoryType[];
};

export const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-blue-50 relative z-30">
      <div className="container px-4 lg:px-8 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-blue-600">
              {t('landingPage.categories.title', 'Discover Projects by Category')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t(
              'landingPage.categories.subtitle',
              'Explore opportunities in different industries and find your path'
            )}
          </p>
        </div>

        {/* Categories grid with enhanced card design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:border-blue-300 group transform hover:-translate-y-1"
            >
              {/* Category header */}
              <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <div
                  className={cn(
                    'w-14 h-14 rounded-lg overflow-hidden flex items-center justify-center',
                    category.color.split(' ')[0]
                  )}
                >
                  <span className="text-2xl font-bold">{category.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.count} {t('projects', 'projects')}
                  </p>
                </div>
              </div>

              {/* Category details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{category.description}</p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {category.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={cn('px-3 py-1 rounded-full text-xs font-medium', category.color)}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {category.count} {t('availableProjects', 'available projects')}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    asChild
                  >
                    <Link to={`/categories/${category.id}`}>
                      {t('viewProjects', 'View Projects')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
