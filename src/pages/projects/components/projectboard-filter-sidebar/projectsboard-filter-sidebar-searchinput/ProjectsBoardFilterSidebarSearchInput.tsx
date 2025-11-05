import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProjectsBoardFilterSidebarSearchInputProps {
  initialValue?: string;
  onSearch: (searchValue: string) => void;
  debounceMs?: number;
}

export default function ProjectsBoardFilterSidebarSearchInput({
  initialValue = '',
  onSearch,
  debounceMs = 300,
}: ProjectsBoardFilterSidebarSearchInputProps) {
  const { t } = useTranslation('project');
  const [searchInput, setSearchInput] = useState(initialValue);

  // Initialize search input when initialValue changes
  useEffect(() => {
    setSearchInput(initialValue);
  }, [initialValue]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchInput || '');
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchInput, onSearch, debounceMs]);

  const handleClear = () => {
    setSearchInput('');
  };

  return (
    <div>
      <label className="text-sm font-medium mb-2 block text-white">
        {t('projectsPage.filters.searchByTitle') || 'Search by Title'}
      </label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder={t('projectsPage.filters.searchPlaceholder') || 'Search projects...'}
          className="pl-8 bg-transparent border-white/20 text-white placeholder:text-gray-400"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput && (
          <button
            className="absolute right-2 top-2.5 text-gray-400 hover:text-white"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
