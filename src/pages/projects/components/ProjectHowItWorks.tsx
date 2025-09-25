import { cn } from '@/lib/utils';
import { cards, typography } from '@/lib/design-system';
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
            <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-primary/30">
              <span className="text-sm font-medium text-primary">
                1
              </span>
            </div>
            <div>
              <h5 className="font-medium mb-1 text-foreground">Claim the Project</h5>
              <p className="text-sm text-muted-foreground">
                Click "Claim Project" to add it to your dashboard and start working on it.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-primary/30">
              <span className="text-sm font-medium text-primary">
                2
              </span>
            </div>
            <div>
              <h5 className="font-medium mb-1 text-foreground">Work on Tasks</h5>
              <p className="text-sm text-muted-foreground">
                Follow the project requirements and implement the solution at your own pace.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-primary/30">
              <span className="text-sm font-medium text-primary">
                3
              </span>
            </div>
            <div>
              <h5 className="font-medium mb-1 text-foreground">Connect GitHub</h5>
              <p className="text-sm text-muted-foreground">
                Link your repository for automatic assessment and progress tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-accent/30">
              <CheckCircle size={16} className="text-accent" />
            </div>
            <div>
              <h5 className="font-medium mb-1 text-foreground">Get Assessed</h5>
              <p className="text-sm text-muted-foreground">
                Receive AI-powered feedback on your implementation when the deadline is reached.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/50">
          <div className="flex items-start gap-3">
            <BrainCircuit size={20} className="text-accent mt-1" />
            <div>
              <h5 className="font-medium mb-1 text-foreground">AI-Powered Learning</h5>
              <p className="text-sm text-muted-foreground">
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
