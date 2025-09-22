import { useState, useEffect, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { colors, typography } from '@/lib/design-system';
import { GripVertical, Trash, Loader2 } from 'lucide-react';
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
import { useUpdateTask, useDeleteTask, useCreateTask } from '../hooks/useTaskMutations';

type TaskItem = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  sequence?: number;
};

// Separate memoized component for each task card
const SortableTaskCard = memo(
  ({
    task,
    index,
    isDirty,
    isUpdating,
    isDeleting,
    updateError,
    values,
    onFieldChange,
    onSave,
    onDelete,
  }: {
    task: TaskItem;
    index: number;
    isDirty: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    updateError: Error | null;
    values: { title: string; description: string };
    onFieldChange: (field: 'title' | 'description', value: string) => void;
    onSave: () => void;
    onDelete: () => void;
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: String(task.id),
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.85 : 1,
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
        className="rounded-xl border p-3 transition-shadow hover:shadow-sm"
      >
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3" {...attributes} {...listeners}>
            <GripVertical className="size-4" />
            <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs">
              #{index + 1}
            </Badge>
          </div>
          <div className="flex gap-2">
            {(isDirty || task.id.startsWith('temp-')) && (
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave();
                }}
                disabled={isUpdating}
                className="h-8 px-3 text-xs"
                style={{
                  backgroundColor: colors.blue,
                  color: colors.white,
                  border: `1px solid ${colors.blue}`,
                }}
                title="Save changes"
              >
                {isUpdating ? <Loader2 className="size-3 animate-spin" /> : 'Save'}
              </Button>
            )}
            <Button
              variant="outline"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              disabled={isDeleting}
              className="h-8 px-2"
              style={{
                borderColor: colors.yellow,
                color: colors.yellow,
                backgroundColor: 'transparent',
              }}
              title="Delete task"
            >
              {isDeleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash className="size-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <Input
              placeholder="Task title"
              value={values.title}
              onChange={(e) => {
                e.stopPropagation();
                onFieldChange('title', e.target.value);
              }}
              className="bg-transparent h-9 text-sm"
              style={{ borderColor: colors.borderLight, color: colors.white }}
            />
          </div>
          <div>
            <Textarea
              placeholder="Short description (optional)"
              value={values.description}
              onChange={(e) => {
                e.stopPropagation();
                onFieldChange('description', e.target.value);
              }}
              rows={2}
              className="bg-transparent text-sm"
              style={{ borderColor: colors.borderLight, color: colors.white }}
            />
          </div>
          {updateError && (
            <div className="text-xs" style={{ color: colors.error }}>
              Failed to save: {updateError.message}
            </div>
          )}
        </div>
      </div>
    );
  }
);

interface TaskManagementEditorProps {
  projectId: string;
  initialTasks: TaskItem[];
  onTasksChange: (tasks: TaskItem[]) => void;
  showSaveButton?: boolean;
}

export default function TaskManagementEditor({
  projectId,
  initialTasks,
  onTasksChange,
  showSaveButton = true,
}: TaskManagementEditorProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  // Track dirty state for each task
  const [dirtyTasks, setDirtyTasks] = useState<Record<string, boolean>>({});

  // Track task values for controlled inputs
  const [taskValues, setTaskValues] = useState<
    Record<string, { title: string; description: string }>
  >({});

  // Hooks for task mutations
  const { mutate: updateTask, isPending: isUpdating, error: updateError } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const { mutate: createTask, isPending: isCreating, error: createError } = useCreateTask();

  // Initialize task values when tasks change
  useEffect(() => {
    const values: Record<string, { title: string; description: string }> = {};
    tasks.forEach((task) => {
      values[task.id] = {
        title: task.title,
        description: task.description,
      };
    });
    setTaskValues(values);
  }, [tasks]);

  const generateTempId = () => `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const handleAddTask = () => {
    const nextSequence = tasks.length + 1;
    const newTask: TaskItem = {
      id: generateTempId(),
      title: '',
      description: '',
      isCompleted: false,
      sequence: nextSequence,
    };
    const updatedTasks = [...tasks, newTask].map((t, idx) => ({ ...t, sequence: idx + 1 }));
    setTasks(updatedTasks);
    onTasksChange(updatedTasks);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => String(t.id) === String(active.id));
    const newIndex = tasks.findIndex((t) => String(t.id) === String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    const moved = arrayMove(tasks, oldIndex, newIndex);
    const updatedTasks = moved.map((t, idx) => ({ ...t, sequence: idx + 1 }));
    setTasks(updatedTasks);
    onTasksChange(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    // Check if it's a temp task (not saved to backend yet)
    if (taskId.startsWith('temp-')) {
      const updatedTasks = tasks
        .filter((t) => String(t.id) !== String(taskId))
        .map((t, idx) => ({ ...t, sequence: idx + 1 }));
      setTasks(updatedTasks);
      onTasksChange(updatedTasks);

      // Clean up local state
      setDirtyTasks((prev) => {
        const { [taskId]: _deleted, ...rest } = prev;
        return rest;
      });
      setTaskValues((prev) => {
        const { [taskId]: _deleted, ...rest } = prev;
        return rest;
      });
      return;
    }

    // Delete from backend
    deleteTask(
      { projectId, taskId },
      {
        onSuccess: () => {
          const updatedTasks = tasks
            .filter((t) => String(t.id) !== String(taskId))
            .map((t, idx) => ({ ...t, sequence: idx + 1 }));
          setTasks(updatedTasks);
          onTasksChange(updatedTasks);

          // Clean up local state
          setDirtyTasks((prev) => {
            const { [taskId]: _deleted, ...rest } = prev;
            return rest;
          });
          setTaskValues((prev) => {
            const { [taskId]: _deleted, ...rest } = prev;
            return rest;
          });
        },
      }
    );
  };

  // Handle task field changes
  const handleTaskFieldChange = useCallback(
    (taskId: string, field: 'title' | 'description', value: string) => {
      setTaskValues((prev) => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          [field]: value,
        },
      }));

      // Mark task as dirty
      setDirtyTasks((prev) => ({
        ...prev,
        [taskId]: true,
      }));
    },
    []
  );

  // Save individual task
  const handleSaveTask = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      const values = taskValues[taskId];
      if (!task || !values) return;

      // Check if this is a new task (temp ID)
      if (taskId.startsWith('temp-')) {
        // Create new task on backend
        createTask(
          {
            projectId,
            data: {
              title: values.title,
              description: values.description,
              isCompleted: task.isCompleted || false,
              sequence: task.sequence || 0,
            },
          },
          {
            onSuccess: (newTask) => {
              // Replace temp task with real task
              const updatedTasks = tasks
                .map((t) => (t.id === taskId ? newTask : t))
                .map((t, idx) => ({ ...t, sequence: idx + 1 }));
              setTasks(updatedTasks);
              onTasksChange(updatedTasks);

              // Clean up temp task state
              setDirtyTasks((prev) => {
                const { [taskId]: _deleted, ...rest } = prev;
                return { ...rest, [newTask.id]: false };
              });
              setTaskValues((prev) => {
                const { [taskId]: _deleted, ...rest } = prev;
                return {
                  ...rest,
                  [newTask.id]: { title: newTask.title, description: newTask.description },
                };
              });
            },
          }
        );
      } else {
        // Update existing task
        updateTask(
          {
            projectId,
            taskId,
            data: {
              title: values.title,
              description: values.description,
              isCompleted: task.isCompleted || false,
              sequence: task.sequence || 0,
            },
          },
          {
            onSuccess: () => {
              // Update local tasks state
              const updatedTasks = tasks.map((t) =>
                t.id === taskId ? { ...t, title: values.title, description: values.description } : t
              );
              setTasks(updatedTasks);
              onTasksChange(updatedTasks);

              // Mark as not dirty
              setDirtyTasks((prev) => ({
                ...prev,
                [taskId]: false,
              }));
            },
          }
        );
      }
    },
    [tasks, taskValues, projectId, updateTask, createTask, onTasksChange]
  );

  return (
    <div
      className="rounded-2xl border p-6 shadow-md hover:shadow-lg transition"
      style={{ backgroundColor: colors.blueDark, borderColor: colors.borderLight }}
    >
      <div className="mb-4">
        <h3 className={typography.heading[4]}>Project Tasks</h3>
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          Manage and reorder the tasks below
        </p>
      </div>
      <div>
        <div className="space-y-4">
          {tasks.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                  Drag and drop tasks to reorder them
                </p>
              </div>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={tasks.map((t) => String(t.id))}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {tasks.map((task, index) => {
                      const taskId = String(task.id);
                      const isDirty = dirtyTasks[taskId] || false;
                      const values = taskValues[taskId] || {
                        title: task.title,
                        description: task.description,
                      };

                      return (
                        <SortableTaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          isDirty={isDirty}
                          isUpdating={isUpdating || isCreating}
                          isDeleting={isDeleting}
                          updateError={updateError || createError}
                          values={values}
                          onFieldChange={(field, value) =>
                            handleTaskFieldChange(taskId, field, value)
                          }
                          onSave={() => handleSaveTask(taskId)}
                          onDelete={() => handleDeleteTask(taskId)}
                        />
                      );
                    })}
                  </div>
                </SortableContext>
              </DndContext>
            </>
          ) : (
            <div className="text-center py-8">
              <p style={{ color: colors.textSecondary }}>No tasks defined yet</p>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleAddTask}
              style={{ borderColor: colors.blue, color: colors.white }}
            >
              Add Task
            </Button>
            <div className="flex gap-2">
              {showSaveButton && (
                <Button style={{ backgroundColor: colors.blue, color: colors.white }}>
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
