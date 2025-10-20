import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/lib/design-system';
import { Plus, X, Search, CheckSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RoutePage } from '@/types/enums/RoutePage';
import { ProjectAssignmentLevel } from '../types';

interface ProjectsFilterSidebarProps {
  searchQuery: string;
  selectedLevel?: ProjectAssignmentLevel;
  companyName: string;
  companySector: string;
  selectedSkills: string[];
  durationAfter?: Date;
  isCompany: boolean;
  onSearchChange: (query: string) => void;
  onLevelChange: (level?: ProjectAssignmentLevel) => void;
  onCompanyNameChange: (name: string) => void;
  onCompanySectorChange: (sector: string) => void;
  onSkillsChange: (skills: string[]) => void;
  onDurationAfterChange: (date?: Date) => void;
  onClearFilters: () => void;
  availableSkills?: string[];
}

export default function ProjectsFilterSidebar({
  searchQuery,
  selectedLevel,
  companyName,
  companySector,
  selectedSkills,
  durationAfter,
  isCompany,
  onSearchChange,
  onLevelChange,
  onCompanyNameChange,
  onCompanySectorChange,
  onSkillsChange,
  onDurationAfterChange,
  onClearFilters,
  availableSkills = [],
}: ProjectsFilterSidebarProps) {
  const { t } = useTranslation('project');
  const navigate = useNavigate();
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);

  const levels = [
    { value: ProjectAssignmentLevel.Beginner, label: 'Beginner' },
    { value: ProjectAssignmentLevel.Intermediate, label: 'Intermediate' },
    { value: ProjectAssignmentLevel.Advanced, label: 'Advanced' },
  ];

  const toggleLevelDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLevelDropdown((prev) => !prev);
    setShowSkillsDropdown(false);
  };

  const toggleSkillsDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSkillsDropdown((prev) => !prev);
    setShowLevelDropdown(false);
  };

  const handleLevelSelect = (level?: ProjectAssignmentLevel) => {
    onLevelChange(level);
    setShowLevelDropdown(false);
  };

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  const getLevelLabel = () => {
    if (selectedLevel === undefined) return t('projectsPage.filters.allLevels') || 'All Levels';
    const level = levels.find((l) => l.value === selectedLevel);
    return level?.label || 'All Levels';
  };

  // Format date for input
  const formatDateForInput = (date?: Date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      onDurationAfterChange(new Date(value));
    } else {
      onDurationAfterChange(undefined);
    }
  };

  const hasActiveFilters =
    searchQuery ||
    selectedLevel !== undefined ||
    companyName ||
    companySector ||
    selectedSkills.length > 0 ||
    durationAfter;

  return (
    <div className="space-y-6">
      {/* Search input */}
      <div>
        <label className="text-sm font-medium mb-2 block text-white">
          {t('projectsPage.filters.searchByTitle') || 'Search by Title'}
        </label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('projectsPage.filters.searchPlaceholder') || 'Search projects...'}
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

      {/* Level filter */}
      <div>
        <label className="text-sm font-medium mb-2 block text-white">
          {t('projectsPage.filters.difficulty') || 'Difficulty Level'}
        </label>
        <div className="relative">
          <button
            className="flex items-center justify-between w-full p-2.5 rounded-md bg-transparent border border-white/20 text-white text-sm"
            onClick={toggleLevelDropdown}
          >
            <span>{getLevelLabel()}</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {showLevelDropdown && (
            <div
              className="absolute z-10 mt-1 w-full bg-slate-800 border border-white/20 rounded-md shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-1 flex flex-col">
                <div
                  className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                    selectedLevel === undefined ? 'bg-slate-700' : ''
                  }`}
                  onClick={() => handleLevelSelect(undefined)}
                >
                  <span className="text-sm text-white">All Levels</span>
                </div>
                {levels.map((level) => (
                  <div
                    key={level.value}
                    className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                      selectedLevel === level.value ? 'bg-slate-700' : ''
                    }`}
                    onClick={() => handleLevelSelect(level.value)}
                  >
                    <span className="text-sm text-white">{level.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Company Name filter */}
      <div>
        <label className="text-sm font-medium mb-2 block text-white">
          {t('projectsPage.filters.companyName') || 'Company Name'}
        </label>
        <Input
          placeholder={t('projectsPage.filters.companyNamePlaceholder') || 'Filter by company...'}
          className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
        />
      </div>

      {/* Company Sector filter */}
      <div>
        <label className="text-sm font-medium mb-2 block text-white">
          {t('projectsPage.filters.companySector') || 'Company Sector'}
        </label>
        <Input
          placeholder={
            t('projectsPage.filters.companySectorPlaceholder') || 'e.g., Technology, Finance...'
          }
          className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
          value={companySector}
          onChange={(e) => onCompanySectorChange(e.target.value)}
        />
      </div>

      {/* Skills filter */}
      {availableSkills.length > 0 && (
        <div>
          <label className="text-sm font-medium mb-2 block text-white">
            {t('projectsPage.filters.skills') || 'Skills'}
          </label>
          <div className="relative">
            <button
              className="flex items-center justify-between w-full p-2.5 rounded-md bg-transparent border border-white/20 text-white text-sm"
              onClick={toggleSkillsDropdown}
            >
              <span>
                {selectedSkills.length === 0
                  ? t('projectsPage.filters.allSkills') || 'All Skills'
                  : selectedSkills.length === 1
                    ? selectedSkills[0]
                    : `${selectedSkills.length} ${t('projectsPage.filters.skillsSelected') || 'skills selected'}`}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {showSkillsDropdown && (
              <div
                className="absolute z-10 mt-1 w-full bg-slate-800 border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2 flex flex-col gap-1">
                  {availableSkills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      <CheckSquare
                        className={`h-4 w-4 mr-2 ${
                          selectedSkills.includes(skill) ? 'text-yellow-400' : 'text-gray-400'
                        }`}
                      />
                      <span className="text-sm text-white">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selected skills tags */}
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-xs"
                  style={{ backgroundColor: colors.blueDark, color: colors.white }}
                >
                  <span>{skill}</span>
                  <button onClick={() => handleSkillToggle(skill)} className="hover:text-gray-300">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Duration After filter */}
      <div>
        <label className="text-sm font-medium mb-2 block text-white">
          {t('projectsPage.filters.durationAfter') || 'Duration After'}
        </label>
        <Input
          type="date"
          className="bg-transparent border-white/20 text-white"
          value={formatDateForInput(durationAfter)}
          onChange={handleDateChange}
        />
        {durationAfter && (
          <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
            {t('projectsPage.filters.showingProjectsAfter') || 'Showing projects after'}{' '}
            {durationAfter.toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Clear filters button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="w-full mt-4 border-white/20 text-white hover:bg-white/10 hover:text-white"
        >
          {t('projectsPage.filters.clear') || 'Clear Filters'}
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
          {t('projectsPage.actions.postNewProject') || 'Post New Project'}
        </Button>
      )}
    </div>
  );
}
