import { Download } from 'lucide-react';
import { colors } from '@/lib/design-system';

export interface DashboardProjectResourcesProps {
  // Currently no props needed as this is a placeholder component
}

export const DashboardProjectResources = ({}: DashboardProjectResourcesProps) => {
  return (
    <div className="mb-6">
      <button
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-all duration-200 border-2 opacity-50 cursor-not-allowed"
        style={{
          backgroundColor: `${colors.yellow}10`,
          borderColor: colors.yellow,
          color: colors.yellow,
        }}
        disabled
      >
        <Download size={18} />
        Download Project Resources (Coming Soon)
      </button>
    </div>
  );
};
