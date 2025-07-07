import { useTranslation } from 'react-i18next';
import { Search, TrendingUp, BookOpen } from 'lucide-react';
import { layouts } from '@/lib/design-system';

interface ProjectsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProjectsHeader = ({ searchQuery, setSearchQuery }: ProjectsHeaderProps) => {
  const { t } = useTranslation('project');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search query is already being updated via the input's onChange
    // No need to do anything else here as filtering is handled in the parent component
  };

  return (
    <div className={layouts.pageHeader + ' text-white'}>
      <div className={layouts.pageHeaderBackground}></div>
      <h1 className={layouts.pageTitle}>
        <span className="text-[#ffd60a]">{t('projectsPage.title1')}</span>{' '}
        <span className="text-white">{t('projectsPage.title2')}</span>
      </h1>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">{t('projectsPage.subtitle')}</p>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder={t('projectsPage.searchPlaceholder')}
            className="w-full px-6 py-4 pr-12 border border-[#003566] rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] bg-[#001d3d] text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 bg-[#ffc300] hover:bg-[#ffd60a] text-[#001d3d] rounded-full p-2 transition-colors"
            aria-label={t('projectsPage.searchAriaLabel')}
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <TrendingUp size={14} /> {t('projectsPage.trending')}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={14} /> {t('projectsPage.activeProjects')}
          </span>
        </div>
      </form>
    </div>
  );
};
