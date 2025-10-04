import { useState, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { colors, typography } from '@/lib/design-system';
import { GripVertical, Trash, Plus } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@/components/ui/badge';

export interface ManualTaskItem {
  title: string;
  description?: string;
  sequence: number;
}

interface SortableTaskCardProps {
  task: ManualTaskItem;
  index: number;
  tempId: string;
  onFieldChange: (field: 'title' | 'description', value: string) => void;
  onDelete: () => void;
}

// Memoized task card component for better performance
const SortableTaskCard = memo(
  ({ task, index, tempId, onFieldChange, onDelete }: SortableTaskCardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: tempId,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.7 : 1,
      cursor: 'grab',
    } as React.CSSProperties;

    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          backgroundColor: colors.blueDark,
          borderColor: colors.blue,
        }}
        className="rounded-xl border-2 p-4 transition-all hover:shadow-md"
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 flex-1" {...attributes} {...listeners}>
            <GripVertical
              className="size-5 flex-shrink-0"
              style={{ color: colors.textMuted }}
              aria-label="Drag handle"
            />
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                borderColor: colors.yellow,
                color: colors.yellow,
                backgroundColor: 'transparent',
              }}
            >
              Task #{index + 1}
            </Badge>
          </div>
          <Button
            variant="outline"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="h-8 px-3"
            style={{
              borderColor: '#ef4444',
              color: '#ef4444',
              backgroundColor: 'transparent',
            }}
            title="Delete task"
          >
            <Trash className="size-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <Input
              placeholder="Task title (required)"
              value={task.title}
              onChange={(e) => {
                e.stopPropagation();
                onFieldChange('title', e.target.value);
              }}
              className="bg-transparent h-10 text-sm font-medium"
              style={{
                borderColor: colors.borderLight,
                color: colors.white,
              }}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Task description (optional)"
              value={task.description || ''}
              onChange={(e) => {
                e.stopPropagation();
                onFieldChange('description', e.target.value);
              }}
              rows={3}
              className="bg-transparent text-sm resize-none"
              style={{
                borderColor: colors.borderLight,
                color: colors.textSecondary,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

SortableTaskCard.displayName = 'SortableTaskCard';

interface ManualTaskEditorProps {
  tasks: ManualTaskItem[];
  onTasksChange: (tasks: ManualTaskItem[]) => void;
}

export function ManualTaskEditor({ tasks, onTasksChange }: ManualTaskEditorProps) {
  // Track temp IDs for drag and drop (sequence numbers aren't unique during edits)
  const [taskIds, setTaskIds] = useState<string[]>(() =>
    tasks.map((_, idx) => `task-${idx}-${Date.now()}`)
  );

  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Slightly higher threshold to prevent accidental drags
      },
    })
  );

  // Handle adding a new task
  const handleAddTask = () => {
    const newTask: ManualTaskItem = {
      title: '',
      description: '',
      sequence: tasks.length + 1,
    };
    const newId = `task-${tasks.length}-${Date.now()}`;

    onTasksChange([...tasks, newTask]);
    setTaskIds([...taskIds, newId]);
  };

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = taskIds.indexOf(String(active.id));
    const newIndex = taskIds.indexOf(String(over.id));

    if (oldIndex === -1 || newIndex === -1) return;

    const newTaskIds = arrayMove(taskIds, oldIndex, newIndex);
    const newTasks = arrayMove(tasks, oldIndex, newIndex).map((task, idx) => ({
      ...task,
      sequence: idx + 1,
    }));

    setTaskIds(newTaskIds);
    onTasksChange(newTasks);
  };

  // Handle deleting a task
  const handleDeleteTask = useCallback(
    (index: number) => {
      const newTasks = tasks
        .filter((_, idx) => idx !== index)
        .map((task, idx) => ({
          ...task,
          sequence: idx + 1,
        }));
      const newTaskIds = taskIds.filter((_, idx) => idx !== index);

      onTasksChange(newTasks);
      setTaskIds(newTaskIds);
    },
    [tasks, taskIds, onTasksChange]
  );

  // Handle field changes for a specific task
  const handleTaskFieldChange = useCallback(
    (index: number, field: 'title' | 'description', value: string) => {
      const newTasks = tasks.map((task, idx) =>
        idx === index ? { ...task, [field]: value } : task
      );
      onTasksChange(newTasks);
    },
    [tasks, onTasksChange]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium" style={{ color: colors.textSecondary }}>
            Define the project tasks below
          </h4>
          <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
            Drag and drop to reorder tasks
          </p>
        </div>
        <div className="text-sm" style={{ color: colors.textMuted }}>
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </div>
      </div>

      {tasks.length > 0 ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <SortableTaskCard
                  key={taskIds[index]}
                  task={task}
                  index={index}
                  tempId={taskIds[index]}
                  onFieldChange={(field, value) => handleTaskFieldChange(index, field, value)}
                  onDelete={() => handleDeleteTask(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div
          className="text-center py-12 rounded-xl border-2 border-dashed"
          style={{ borderColor: colors.borderLight, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          <p className="text-sm" style={{ color: colors.textMuted }}>
            No tasks defined yet. Add your first task to get started.
          </p>
        </div>
      )}

      <div className="flex justify-start pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleAddTask}
          className="h-10 px-4"
          style={{
            borderColor: colors.blue,
            color: colors.white,
            backgroundColor: 'transparent',
          }}
        >
          <Plus className="size-4 mr-2" />
          Add Task
        </Button>
      </div>
    </div>
  );
}
