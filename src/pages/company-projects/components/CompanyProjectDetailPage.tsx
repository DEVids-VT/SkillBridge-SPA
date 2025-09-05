import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { colors, typography } from '@/lib/design-system';
import { Eye, Pencil, Users, Download, ExternalLink, GripVertical, Trash } from 'lucide-react';
import { useProjectDetail } from '@/pages/projects/hooks/useProjectDetail';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@/components/ui/badge';

export const CompanyProjectDetailPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data: project } = useProjectDetail(projectId);

  type TaskItem = {
    id: string;
    title: string;
    description: string;
    isCompleted?: boolean;
    sequence?: number;
  };

  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const generateTempId = () => `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const handleAddTask = () => {
    setTasks((prev) => {
      const nextIndex = prev.length + 1;
      const newTask: TaskItem = {
        id: generateTempId(),
        title: '',
        description: '',
        isCompleted: false,
        sequence: nextIndex,
      };
      return [...prev, newTask].map((t, idx) => ({ ...t, sequence: idx + 1 }));
    });
  };

  useEffect(() => {
    const incoming = (project as any)?.tasks as TaskItem[] | undefined;
    if (incoming && Array.isArray(incoming)) {
      const sorted = [...incoming].sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
      // Normalize sequence to be 1..n
      const normalized = sorted.map((t, idx) => ({ ...t, sequence: idx + 1 }));
      setTasks(normalized);
    } else {
      setTasks([]);
    }
  }, [project]);

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
    setTasks((prev) => {
      const oldIndex = prev.findIndex((t) => String(t.id) === String(active.id));
      const newIndex = prev.findIndex((t) => String(t.id) === String(over.id));
      if (oldIndex === -1 || newIndex === -1) return prev;
      const moved = arrayMove(prev, oldIndex, newIndex);
      return moved.map((t, idx) => ({ ...t, sequence: idx + 1 }));
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => String(t.id) !== String(taskId)).map((t, idx) => ({ ...t, sequence: idx + 1 })));
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

  const tabs = useMemo(() => (
    [
      { id: 'view', label: 'View', icon: Eye },
      { id: 'edit', label: 'Edit', icon: Pencil },
      { id: 'candidates', label: 'Candidates', icon: Users },
    ] as const
  ), []);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold" style={{ color: colors.white }}>{project?.title || 'Project'}</h1>
            <p className="text-sm" style={{ color: colors.textSecondary }}>{project?.companyName}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate(-1)} style={{ color: colors.white }}>Back</Button>
          </div>
        </div>

        <div>
          <Tabs defaultValue="view" className="w-full">
            <TabsList className="mb-4" style={{ backgroundColor: colors.blueDark }}>
              {tabs.map(({ id, label, icon: Icon }) => (
                <TabsTrigger key={id} value={id} className="gap-2" style={{ color: colors.white }}>
                  <Icon className="size-4" /> {label}
                </TabsTrigger>
              ))}
            </TabsList>

              <TabsContent value="view" className="space-y-4">
                <div
                  className="rounded-2xl border p-6 shadow-md"
                  style={{ backgroundColor: colors.blueDark, borderColor: colors.borderLight }}
                >
                  <div className="mb-2">
                    <h3 className={typography.heading[4]}>Candidate View</h3>
                  </div>
                  <div>
                    <p className="text-gray-300">This is how candidates see your assessment.</p>
                    <div className="mt-4">
                      <Link
                        to={`/projects/${projectId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium"
                        style={{ backgroundColor: colors.blue, color: colors.dark }}
                      >
                        <Eye className="size-4" /> Open Candidate View
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="edit" className="space-y-6">
                {/* Combined Project Details */}
                <div
                  className="rounded-2xl border p-6 shadow-md hover:shadow-lg transition"
                  style={{ backgroundColor: colors.blueDark, borderColor: colors.borderLight }}
                >
                  <div className="mb-4">
                    <h3 className={typography.heading[4]}>Project Details</h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>Information, learning outcomes, and required skills</p>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Title</label>
                        <Input
                          placeholder="Project Title"
                          defaultValue={project?.title}
                          className="bg-transparent"
                          style={{ borderColor: colors.blue, color: colors.white }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Level</label>
                        <Select value={String((project as any)?.level ?? 0)} onValueChange={() => {}}>
                          <SelectTrigger className="w-full bg-transparent text-white border" style={{ borderColor: colors.blue }}>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Beginner</SelectItem>
                            <SelectItem value="1">Intermediate</SelectItem>
                            <SelectItem value="2">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Deadline</label>
                        <Input
                          type="date"
                          defaultValue={project?.deadline ? new Date(project.deadline).toISOString().split('T')[0] : ''}
                          className="bg-transparent"
                          style={{ borderColor: colors.blue, color: colors.white }}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Summary</label>
                        <Textarea
                          placeholder="Brief project summary"
                          defaultValue={(project as any)?.summary}
                          rows={3}
                          className="bg-transparent"
                          style={{ borderColor: colors.blue, color: colors.white }}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Description</label>
                        <Textarea
                          placeholder="Detailed project description"
                          defaultValue={project?.description}
                          rows={6}
                          className="bg-transparent"
                          style={{ borderColor: colors.blue, color: colors.white }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Learning Benefits</label>
                        <Textarea
                          placeholder="What will candidates learn from this project?"
                          defaultValue={(project as any)?.learningBenefits}
                          rows={6}
                          className="bg-transparent"
                          style={{ borderColor: colors.blue, color: colors.white }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Suggested Approach</label>
                        <Textarea
                          placeholder="Recommended implementation approach"
                          defaultValue={(project as any)?.suggestedApproach}
                          rows={6}
                          className="bg-transparent"
                          style={{ borderColor: colors.blue, color: colors.white }}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Skills</label>
                        <Input
                          placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                          defaultValue={project?.skills?.map((s) => s.name).join(', ')}
                          className="bg-transparent"
                          style={{ borderColor: colors.blue, color: colors.white }}
                        />
                      </div>
                      {project?.skills && project.skills.length > 0 && (
                        <div>
                          <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>Current Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-3 py-1 rounded-full text-xs font-medium border"
                                style={{ backgroundColor: `${colors.blue}30`, color: colors.yellow, borderColor: colors.blue }}
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <Button style={{ backgroundColor: colors.blue, color: colors.white }}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tasks Management */}
                <div
                  className="rounded-2xl border p-6 shadow-md hover:shadow-lg transition"
                  style={{ backgroundColor: colors.blueDark, borderColor: colors.borderLight }}
                >
                  <div className="mb-4">
                    <h3 className={typography.heading[4]}>Project Tasks</h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>Manage and reorder the tasks below</p>
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
                          <Button style={{ backgroundColor: colors.blue, color: colors.white }}>
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Save Actions removed; now per-section */}
              </TabsContent>

              <TabsContent value="candidates" className="space-y-4">
                <div
                  className="rounded-2xl border p-6 shadow-md"
                  style={{ backgroundColor: colors.blueDark, borderColor: colors.borderLight }}
                >
                  <div className="mb-2">
                    <h3 className={typography.heading[4]}>Enrolled Candidates</h3>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1,2,3,4,5,6].map((n) => (
                        <div key={n} className="rounded-lg border p-4" style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}>
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium" style={{ color: colors.white }}>Candidate {n}</p>
                              <p className="text-sm" style={{ color: colors.textSecondary }}>Frontend Developer</p>
                              <p className="text-xs mt-1" style={{ color: colors.textMuted }}>Progress: {Math.floor(Math.random()*100)}%</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Button variant="outline" className="gap-2" style={{ borderColor: colors.blue, color: colors.white }}>
                              <Download className="size-4" /> Download CV
                            </Button>
                            <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md border"
                              style={{ borderColor: colors.blue, color: colors.white }}>
                              <ExternalLink className="size-4" /> Open Tracker
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
};


