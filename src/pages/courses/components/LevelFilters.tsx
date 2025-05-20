import { LevelFilter } from '../types';

interface LevelFiltersProps {
  levels: LevelFilter[];
  selectedLevel: string;
  setSelectedLevel: (levelId: string) => void;
}

export const LevelFilters = ({ levels, selectedLevel, setSelectedLevel }: LevelFiltersProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">Level</h4>
      <div className="space-y-2">
        {levels.map((level) => (
          <div key={level.id} className="flex items-center">
            <input
              type="radio"
              id={`level-${level.id}`}
              name="level"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              checked={selectedLevel === level.id}
              onChange={() => setSelectedLevel(level.id)}
            />
            <label htmlFor={`level-${level.id}`} className="ml-2 text-sm text-gray-700">
              {level.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
