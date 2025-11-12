import {
  ChevronDown,
  ChevronUp,
  Github,
  AlertCircle,
  GitBranch,
  Code,
  BarChart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { cards, colors, typography } from '@/lib/design-system';

export interface DashboardProjectGithubIntegrationProps {
  isExpanded: boolean;
  onToggle: () => void;
  onConnectGithub: () => void;
}

export const DashboardProjectGithubIntegration = ({
  isExpanded,
  onToggle,
  onConnectGithub,
}: DashboardProjectGithubIntegrationProps) => {
  return (
    <div className={cn(cards.base, 'mb-6')}>
      <div className={cn(cards.header, 'cursor-pointer')} onClick={onToggle}>
        <div className="flex items-center justify-between w-full">
          <h3 className={typography.heading[4]}>GitHub Integration</h3>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className={cards.body}>
          {/* eslint-disable-next-line no-constant-condition */}
          {false ? ( // TODO: Replace with actual git repo check when API supports it
            <div>
              {/* Connected Repository Info - Placeholder */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Github size={18} className="text-white" />
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Repository Name
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: colors.blueDark }}>
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <GitBranch size={16} />
                      <span>Latest Commit</span>
                    </div>
                    <p className="text-sm truncate">Latest commit message</p>
                    <p className="text-xs text-gray-400 mt-1">Jan 1, 2024</p>
                  </div>

                  <div className="p-3 rounded-lg" style={{ backgroundColor: colors.blueDark }}>
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Code size={16} />
                      <span>Total Commits</span>
                    </div>
                    <p className="text-xl font-semibold">0</p>
                  </div>

                  <div className="p-3 rounded-lg" style={{ backgroundColor: colors.blueDark }}>
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <BarChart size={16} />
                      <span>Activity</span>
                    </div>
                    <p className="text-sm">Last push: N/A</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* GitHub Connection CTA */}
              <div
                className="flex flex-col items-center text-center p-6 border-2 border-dashed rounded-lg"
                style={{ borderColor: colors.blue }}
              >
                <Github size={40} className="mb-4 text-gray-400" />
                <h4 className={typography.heading[5] + ' mb-2'}>Connect Your GitHub Repository</h4>
                <p className="text-gray-300 mb-6 max-w-md">
                  Link your GitHub repository to this project for automatic progress tracking and
                  assessment when the deadline is reached.
                </p>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 opacity-50 cursor-not-allowed"
                  style={{ backgroundColor: colors.blue, color: colors.dark }}
                  onClick={onConnectGithub}
                  disabled
                >
                  <Github size={18} />
                  Connect GitHub Repository (Coming Soon)
                </button>
              </div>
            </div>
          )}

          {/* GitHub Integration Explanation */}
          <div
            className="mt-6 p-4 rounded-lg bg-opacity-50"
            style={{ backgroundColor: `${colors.blueDark}60` }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-gray-400 mt-1" />
              <div>
                <h5 className="font-medium mb-1">Automatic Project Assessment</h5>
                <p className="text-sm text-gray-400">
                  When the project deadline is reached, SkillBridge will analyze your GitHub
                  repository to assess your implementation, coding practices, and solution quality.
                  This helps provide objective feedback on your work.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
