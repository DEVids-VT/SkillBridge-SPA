import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface ProjectsBoardFilterSidebarCompanySectorFilterProps {
  /**
   * Initial value for the company sector input
   */
  initialValue?: string;
  /**
   * Callback function called when the company sector value changes (debounced)
   */
  onChange: (companySector: string) => void;
  /**
   * Debounce delay in milliseconds (default: 300ms)
   */
  debounceMs?: number;
}

export default function ProjectsBoardFilterSidebarCompanySectorFilter({
  initialValue = '',
  onChange,
  debounceMs = 300,
}: ProjectsBoardFilterSidebarCompanySectorFilterProps) {
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
        {t('projectsPage.filters.companySector') || 'Company Sector'}
      </label>
      <Input
        placeholder={
          t('projectsPage.filters.companySectorPlaceholder') || 'e.g., Technology, Finance...'
        }
        className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}
