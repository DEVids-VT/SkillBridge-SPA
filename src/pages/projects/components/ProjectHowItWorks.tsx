import { cn } from '@/lib/utils';
import { colors, cards, typography } from '@/lib/design-system';
import { CheckCircle, BrainCircuit } from 'lucide-react';

export default function ProjectHowItWorks() {
  return (
    <div className={cn(cards.base, 'mb-6')}>
      <div className={cards.header}>
        <h3 className={typography.heading[4]}>How SkillBridge Projects Work</h3>
      </div>
      <div className={cards.body}>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
              style={{ backgroundColor: `${colors.blue}30` }}
            >
              <span className="text-sm font-medium" style={{ color: colors.blue }}>
                1
              </span>
            </div>
            <div>
              <h5 className="font-medium mb-1">Claim the Project</h5>
              <p className="text-sm text-gray-400">
                Click "Claim Project" to add it to your dashboard and start working on it.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
              style={{ backgroundColor: `${colors.blue}30` }}
            >
              <span className="text-sm font-medium" style={{ color: colors.blue }}>
                2
              </span>
            </div>
            <div>
              <h5 className="font-medium mb-1">Work on Tasks</h5>
              <p className="text-sm text-gray-400">
                Follow the project requirements and implement the solution at your own pace.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
              style={{ backgroundColor: `${colors.blue}30` }}
            >
              <span className="text-sm font-medium" style={{ color: colors.blue }}>
                3
              </span>
            </div>
            <div>
              <h5 className="font-medium mb-1">Connect GitHub</h5>
              <p className="text-sm text-gray-400">
                Link your repository for automatic assessment and progress tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
              style={{ backgroundColor: `${colors.yellow}30` }}
            >
              <CheckCircle size={16} style={{ color: colors.yellow }} />
            </div>
            <div>
              <h5 className="font-medium mb-1">Get Assessed</h5>
              <p className="text-sm text-gray-400">
                Receive AI-powered feedback on your implementation when the deadline is reached.
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-6 p-4 rounded-lg bg-opacity-50"
          style={{ backgroundColor: `${colors.blueDark}60` }}
        >
          <div className="flex items-start gap-3">
            <BrainCircuit size={20} className="text-yellow-400 mt-1" />
            <div>
              <h5 className="font-medium mb-1">AI-Powered Learning</h5>
              <p className="text-sm text-gray-400">
                SkillBridge uses advanced AI to analyze your code, provide personalized
                feedback, and help you improve your skills through real-world projects from
                actual companies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
