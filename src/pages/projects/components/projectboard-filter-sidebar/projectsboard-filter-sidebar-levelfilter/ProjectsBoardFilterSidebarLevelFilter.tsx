import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProjectAssignmentLevel } from '@/types/enums/ProjectAssignmentLevel';

interface ProjectsBoardFilterSidebarLevelFilterProps {
  selectedLevel?: ProjectAssignmentLevel;

  onLevelChange: (level?: ProjectAssignmentLevel) => void;

  isOpen?: boolean;

  onToggle?: () => void;
}

export default function ProjectsBoardFilterSidebarLevelFilter({
  selectedLevel,
  onLevelChange,
  isOpen = false,
  onToggle,
}: ProjectsBoardFilterSidebarLevelFilterProps) {
  const { t } = useTranslation('project');
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use internal state if not controlled externally
  const showDropdown = onToggle ? isOpen : internalIsOpen;
  const toggleDropdown = onToggle || (() => setInternalIsOpen((prev) => !prev));

  const levels = [
    { value: ProjectAssignmentLevel.Beginner, label: 'Beginner' },
    { value: ProjectAssignmentLevel.Intermediate, label: 'Intermediate' },
    { value: ProjectAssignmentLevel.Advanced, label: 'Advanced' },
  ];

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleDropdown();
  };

  const handleLevelSelect = (level?: ProjectAssignmentLevel) => {
    onLevelChange(level);
    if (!onToggle) {
      setInternalIsOpen(false);
    }
  };

  const getLevelLabel = () => {
    if (selectedLevel === undefined) return t('projectsPage.filters.allLevels') || 'All Levels';
    const level = levels.find((l) => l.value === selectedLevel);
    return level?.label || 'All Levels';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (!onToggle) {
          setInternalIsOpen(false);
        }
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown, onToggle]);

  return (
    <div>
      <label className="text-sm font-medium mb-2 block text-white">
        {t('projectsPage.filters.difficulty') || 'Difficulty Level'}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center justify-between w-full p-2.5 rounded-md bg-transparent border border-white/20 text-white text-sm"
          onClick={handleToggleDropdown}
        >
          <span>{getLevelLabel()}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {showDropdown && (
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
                <span className="text-sm text-white">
                  {t('projectsPage.filters.allLevels') || 'All Levels'}
                </span>
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
  );
}
