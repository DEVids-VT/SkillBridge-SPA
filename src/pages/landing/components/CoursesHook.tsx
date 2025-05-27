import { useTranslation } from 'react-i18next';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CoursesHook = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-blue-50 relative z-30">
      <div className="container px-4 lg:px-8 mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-12 overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t('coursesPage.hero.title1')}{' '}
              <span className="text-yellow-300">{t('coursesPage.hero.titleHighlight')}</span>{' '}
              {t('coursesPage.hero.title2')}
            </h1>
            <p className="text-lg opacity-90 mb-6">{t('coursesPage.hero.description')}</p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                <a href="/projects">{t('coursesPage.hero.projectsButton')}</a>
              </Button>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                {t('coursesPage.hero.learnMore')}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-8">
              <div>
                <div className="text-3xl font-bold">{t('coursesPage.stats.companies')}</div>
                <div className="text-sm opacity-80">{t('coursesPage.stats.companiesLabel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{t('coursesPage.stats.courses')}</div>
                <div className="text-sm opacity-80">{t('coursesPage.stats.coursesLabel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{t('coursesPage.stats.employed')}</div>
                <div className="text-sm opacity-80">{t('coursesPage.stats.employedLabel')}</div>
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
            <GraduationCap className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
