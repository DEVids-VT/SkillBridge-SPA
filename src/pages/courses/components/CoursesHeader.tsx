import { useTranslation } from 'react-i18next';
import { Search, TrendingUp, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { layouts } from '@/lib/design-system';
import { coursesData } from '../coursesData';

interface CoursesHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export const CoursesHeader = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: CoursesHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className={layouts.pageHeader}>
      <div className={layouts.pageHeaderBackground}></div>
      <h1 className={layouts.pageTitle}>
        <span className="text-blue-600">Expand</span>{' '}
        <span className="text-gray-600">Your Knowledge</span>
      </h1>
      <p className={layouts.pageDescription}>
        Browse our library of expert-led courses designed to enhance your skills and advance your
        career in tech, design, business, and more.
      </p>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder={t(
              'searchCoursesPlaceholder',
              'Search for any course, topic or instructor'
            )}
            className="h-14 pl-6 pr-12 rounded-full shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <TrendingUp size={14} /> Trending: React, AI, UX/UI, Python
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={14} /> {coursesData.length}+ courses available
          </span>
        </div>
      </form>
    </div>
  );
};
