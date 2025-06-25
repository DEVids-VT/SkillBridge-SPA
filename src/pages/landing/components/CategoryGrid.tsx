import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Palette, Megaphone, PenTool, Building, Users } from 'lucide-react';
import { CategoryType } from '../types';

type CategoryGridProps = {
  categories: CategoryType[];
};

// Icon mapping for categories
const getCategoryIcon = (categoryId: string) => {
  const iconMap = {
    development: Code,
    design: Palette,
    marketing: Megaphone,
    content: PenTool,
    architecture: Building,
    agencies: Users,
  };
  return iconMap[categoryId as keyof typeof iconMap] || Code;
};

export const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      {/* Modern Dots Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px'
          }}
        />
      </div>
      
      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
            <div className="flex h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Категории Проекти</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            {t('landingPage.categories.title', 'Discover Projects by Category')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('landingPage.categories.subtitle', 'Explore opportunities in different industries and find your path')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.id);
            
            return (
              <Link
                key={category.id}
                to={`/projects?category=${category.id}`}
                className="group block"
              >
                <div className="h-full bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:-translate-y-2 overflow-hidden">
                  {/* Category Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {category.count} {t('projects', 'projects')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category Content */}
                  <div className="p-6 space-y-6">
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {category.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {category.skills.length > 3 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          +{category.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-blue-600">{category.count}</div>
                        <div className="text-sm text-gray-500">
                          {t('availableProjects', 'available projects')}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                        <span className="text-sm">{t('viewProjects', 'View Projects')}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Link to="/projects" className="flex items-center gap-2">
              {t('viewAll', 'View All Projects')}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Reduced Floating Elements - Only one static bubble */}
      <div className="absolute bottom-1/4 left-20 w-16 h-16 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
    </section>
  );
};
