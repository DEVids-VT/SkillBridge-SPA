import { colors } from '@/lib/design-system';

export interface LevelBadgeProps {
  level: number;
}

export const LevelBadge = ({ level }: LevelBadgeProps) => {
  const levelMap = {
    0: { label: 'Beginner', color: colors.blue },
    1: { label: 'Intermediate', color: colors.yellow },
    2: { label: 'Advanced', color: colors.orange },
  };

  const { label, color } = levelMap[level as keyof typeof levelMap] || levelMap[0];

  return (
    <span
      className="px-2 py-1 rounded text-xs font-medium"
      style={{ backgroundColor: color, color: colors.dark }}
    >
      {label}
    </span>
  );
};
