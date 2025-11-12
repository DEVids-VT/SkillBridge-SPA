import { CheckCircle2, Circle } from 'lucide-react';
import { colors, typography } from '@/lib/design-system';

export interface TaskItemProps {
  task: {
    id: string;
    title: string;
    description: string;
    sequence: number;
    isCompleted: boolean;
  };
  onToggle: (taskId: string) => void;
}

export const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: colors.blueDark,
        borderColor: task.isCompleted ? colors.yellow : colors.blue,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 cursor-pointer" onClick={() => onToggle(task.id)}>
          {task.isCompleted ? (
            <CheckCircle2 size={20} style={{ color: colors.yellow }} />
          ) : (
            <Circle size={20} className="text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4
              className={`${typography.heading[5]} ${task.isCompleted ? 'line-through opacity-70' : ''}`}
            >
              {task.title}
            </h4>
            <span className="text-sm text-gray-400">Task {task.sequence}</span>
          </div>
          <p className={`text-gray-300 mt-1 ${task.isCompleted ? 'line-through opacity-70' : ''}`}>
            {task.description}
          </p>
        </div>
      </div>
    </div>
  );
};
