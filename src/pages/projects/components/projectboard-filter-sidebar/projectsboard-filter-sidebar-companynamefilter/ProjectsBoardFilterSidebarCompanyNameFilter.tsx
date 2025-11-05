import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface ProjectsBoardFilterSidebarCompanyNameFilterProps {
  /**
   * Initial value for the company name input
   */
  initialValue?: string;
  /**
   * Callback function called when the company name value changes (debounced)
   */
  onChange: (companyName: string) => void;
  /**
   * Debounce delay in milliseconds (default: 300ms)
   */
  debounceMs?: number;
}

export default function ProjectsBoardFilterSidebarCompanyNameFilter({
  initialValue = '',
  onChange,
  debounceMs = 300,
}: ProjectsBoardFilterSidebarCompanyNameFilterProps) {
  const { t } = useTranslation('project');
  const [inputValue, setInputValue] = useState(initialValue);

  // Initialize input value when initialValue changes
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  // Debounce input value
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue || '');
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputValue, onChange, debounceMs]);

  return (
    <div>
      <label className="text-sm font-medium mb-2 block text-white">
        {t('projectsPage.filters.companyName') || 'Company Name'}
      </label>
      <Input
        placeholder={t('projectsPage.filters.companyNamePlaceholder') || 'Filter by company...'}
        className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}
