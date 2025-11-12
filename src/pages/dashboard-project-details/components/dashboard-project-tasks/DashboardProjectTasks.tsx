import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cards, typography } from '@/lib/design-system';
import { TaskItem } from './components/task-item/TaskItem';

export interface DashboardProjectTasksProps {
  project: {
    tasks: Array<{
      id: string;
      title: string;
      description: string;
      sequence: number;
      isCompleted: boolean;
    }>;
  };
  isExpanded: boolean;
  onToggle: () => void;
  onTaskToggle: (taskId: string) => void;
}

export const DashboardProjectTasks = ({
  project,
  isExpanded,
  onToggle,
  onTaskToggle,
}: DashboardProjectTasksProps) => {
  return (
    <div className={cn(cards.base, 'mb-6')}>
      <div className={cn(cards.header, 'cursor-pointer')} onClick={onToggle}>
        <div className="flex items-center justify-between w-full">
          <h3 className={typography.heading[4]}>Tasks</h3>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className={cards.body}>
          <div className="space-y-4">
            {project.tasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onTaskToggle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
