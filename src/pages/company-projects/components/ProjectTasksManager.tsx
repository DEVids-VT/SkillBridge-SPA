import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { colors, typography } from '@/lib/design-system';
import { GripVertical, Trash } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@/components/ui/badge';

type TaskItem = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  sequence?: number;
};

interface ProjectTasksManagerProps {
  initialTasks: TaskItem[];
  onTasksChange: (tasks: TaskItem[]) => void;
  showSaveButton?: boolean;
}

export default function ProjectTasksManager({ initialTasks, onTasksChange, showSaveButton = true }: ProjectTasksManagerProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const generateTempId = () => `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const handleAddTask = () => {
    const newTasks = [...tasks];
    const nextIndex = newTasks.length + 1;
    const newTask: TaskItem = {
      id: generateTempId(),
      title: '',
      description: '',
      isCompleted: false,
      sequence: nextIndex,
    };
    const updatedTasks = [...newTasks, newTask].map((t, idx) => ({ ...t, sequence: idx + 1 }));
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
    const updatedTasks = tasks.filter((t) => String(t.id) !== String(taskId)).map((t, idx) => ({ ...t, sequence: idx + 1 }));
    setTasks(updatedTasks);
    onTasksChange(updatedTasks);
  };

  const SortableTaskCard = ({ task, index }: { task: TaskItem; index: number }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: String(task.id) });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.85 : 1,
      cursor: 'grab',
    } as React.CSSProperties;

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          ...style,
          backgroundColor: colors.blueDark,
          borderColor: colors.blue,
        }}
        className="rounded-xl border p-3 transition-shadow hover:shadow-sm"
        key={task.id}
      >
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <GripVertical className="size-4" />
            <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs">
              #{index + 1}
            </Badge>
          </div>
          <div>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleDeleteTask(String(task.id))}
              className="h-8 px-2"
              style={{ borderColor: colors.yellow, color: colors.yellow, backgroundColor: 'transparent' }}
              title="Delete task"
            >
              <Trash className="size-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <Input 
              placeholder="Task title"
              defaultValue={task.title}
              className="bg-transparent h-9 text-sm" 
              style={{ borderColor: colors.borderLight, color: colors.white }} 
            />
          </div>
          <div>
            <Textarea 
              placeholder="Short description (optional)" 
              defaultValue={task.description}
              rows={2}
              className="bg-transparent text-sm" 
              style={{ borderColor: colors.borderLight, color: colors.white }} 
            />
          </div>
        </div>
      </div>
    );
  };

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
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={tasks.map((t) => String(t.id))} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {tasks.map((task, index) => (
                      <SortableTaskCard key={task.id} task={task} index={index} />
                    ))}
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
            <Button variant="outline" onClick={handleAddTask} style={{ borderColor: colors.blue, color: colors.white }}>
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
