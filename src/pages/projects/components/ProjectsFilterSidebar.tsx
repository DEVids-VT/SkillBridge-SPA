import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/lib/design-system';
import { Plus, X, Search, CheckSquare, ChevronDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RoutePage } from '@/types/enums/RoutePage';
import { CategoryFilter } from '../types';

interface ProjectsFilterSidebarProps {
  categories: CategoryFilter[];
  companies: string[];
  selectedCategory: string;
  selectedCompanies: string[];
  deadlineFilter: string;
  searchQuery: string;
  isCompany: boolean;
  onCategoryChange: (category: string) => void;
  onCompanyToggle: (company: string) => void;
  onDeadlineChange: (deadline: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export default function ProjectsFilterSidebar({
  categories,
  companies,
  selectedCategory,
  selectedCompanies,
  deadlineFilter,
  searchQuery,
  isCompany,
  onCategoryChange,
  onCompanyToggle,
  onDeadlineChange,
  onSearchChange,
  onClearFilters,
}: ProjectsFilterSidebarProps) {
  const { t } = useTranslation('project');
  const navigate = useNavigate();
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showDeadlineDropdown, setShowDeadlineDropdown] = useState(false);

  const toggleCompanyDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCompanyDropdown(prev => !prev);
    setShowDeadlineDropdown(false);
  };

  const toggleDeadlineDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeadlineDropdown(prev => !prev);
    setShowCompanyDropdown(false);
  };

  const handleDeadlineChange = (deadline: string) => {
    onDeadlineChange(deadline);
    setShowDeadlineDropdown(false);
  };

  return (
    <div className="space-y-6">
      {/* Search input */}
      <div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('projectsPage.filters.searchPlaceholder')}
            className="pl-8 bg-transparent border-white/20 text-white placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-2 top-2.5 text-gray-400 hover:text-white"
              onClick={() => onSearchChange('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category filters */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-white">
          {t('projectsPage.filters.categories')}
        </h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                selectedCategory === category.id ? 'bg-primary/20' : 'hover:bg-primary/10'
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <div className="flex items-center">
                {category.id !== 'all' && (
                  <div className={`w-2 h-2 rounded-full mr-2 ${category.color || 'bg-gray-200'}`} />
                )}
                <span className="text-sm text-white">
                  {category.name}
                </span>
              </div>

              {selectedCategory === category.id && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke={colors.yellow} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Company filter */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-white">
          {t('projectsPage.filters.companies')}
        </h4>
        <div className="relative">
          <button
            className="flex items-center justify-between w-full p-2.5 rounded-md bg-transparent border border-white/20 text-white text-sm"
            onClick={toggleCompanyDropdown}
          >
            <span>
              {selectedCompanies.length === 0
                ? t('projectsPage.filters.allCompanies')
                : selectedCompanies.length === 1
                ? selectedCompanies[0]
                : `${selectedCompanies.length} ${t('projectsPage.filters.companiesSelected')}`}
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {showCompanyDropdown && (
            <div
              className="absolute z-10 mt-1 w-full bg-slate-800 border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 flex flex-col gap-1">
                {companies.map((company) => (
                  <div
                    key={company}
                    className="flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer"
                    onClick={() => onCompanyToggle(company)}
                  >
                    <CheckSquare
                      className={`h-4 w-4 mr-2 ${
                        selectedCompanies.includes(company)
                          ? 'text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                    <span className="text-sm text-white">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deadline filter */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-white">
          {t('projectsPage.filters.deadline')}
        </h4>
        <div className="relative">
          <button
            className="flex items-center justify-between w-full p-2.5 rounded-md bg-transparent border border-white/20 text-white text-sm"
            onClick={toggleDeadlineDropdown}
          >
            <span>
              {deadlineFilter === 'all' && t('projectsPage.filters.anyTime')}
              {deadlineFilter === 'today' && t('projectsPage.filters.today')}
              {deadlineFilter === 'week' && t('projectsPage.filters.thisWeek')}
              {deadlineFilter === 'month' && t('projectsPage.filters.thisMonth')}
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {showDeadlineDropdown && (
            <div
              className="absolute z-10 mt-1 w-full bg-slate-800 border border-white/20 rounded-md shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-1 flex flex-col">
                <div
                  className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                    deadlineFilter === 'all' ? 'bg-slate-700' : ''
                  }`}
                  onClick={() => handleDeadlineChange('all')}
                >
                  <span className="text-sm text-white">{t('projectsPage.filters.anyTime')}</span>
                </div>
                <div
                  className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                    deadlineFilter === 'today' ? 'bg-slate-700' : ''
                  }`}
                  onClick={() => handleDeadlineChange('today')}
                >
                  <span className="text-sm text-white">{t('projectsPage.filters.today')}</span>
                </div>
                <div
                  className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                    deadlineFilter === 'week' ? 'bg-slate-700' : ''
                  }`}
                  onClick={() => handleDeadlineChange('week')}
                >
                  <span className="text-sm text-white">{t('projectsPage.filters.thisWeek')}</span>
                </div>
                <div
                  className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                    deadlineFilter === 'month' ? 'bg-slate-700' : ''
                  }`}
                  onClick={() => handleDeadlineChange('month')}
                >
                  <span className="text-sm text-white">{t('projectsPage.filters.thisMonth')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Other filter options */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-white">
          {t('projectsPage.filters.otherOptions')}
        </h4>
        <div className="space-y-1">
          <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-primary/10">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm text-white">
              {t('projectsPage.filters.mostRecent')}
            </span>
          </div>
          <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-primary/10">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm text-white">
              {t('projectsPage.filters.upcoming')}
            </span>
          </div>
        </div>
      </div>

      {/* Clear filters button */}
      {(selectedCategory !== 'all' || 
        selectedCompanies.length > 0 || 
        deadlineFilter !== 'all' ||
        searchQuery) && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="w-full mt-4 border-white/20 text-white hover:bg-white/10 hover:text-white"
        >
          {t('projectsPage.filters.clear')}
        </Button>
      )}

      {/* Post New Project button - only visible for companies */}
      {isCompany && (
        <Button
          className="w-full mt-4"
          style={{ backgroundColor: colors.blue, color: colors.white }}
          onClick={() => navigate(RoutePage.CREATE_PROJECT)}
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('projectsPage.actions.postNewProject')}
        </Button>
      )}
    </div>
  );
}
