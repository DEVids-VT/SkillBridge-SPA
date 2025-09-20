import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { colors } from '@/lib/design-system';
import { Eye, Pencil, Users } from 'lucide-react';
import { useProjectDetail } from '@/pages/projects/hooks/useProjectDetail';
import ProjectHeader from './ProjectHeader';
import ProjectViewTab from './ProjectViewTab';
import ProjectDetailsForm from './ProjectDetailsForm';
import ProjectTasksManager from './ProjectTasksManager';
import ProjectCandidatesTab from './ProjectCandidatesTab';

export const CompanyProjectDetailPage = () => {
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

  const handleTasksChange = (newTasks: TaskItem[]) => {
    setTasks(newTasks);
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
        <ProjectHeader 
          title={project?.title || 'Project'} 
          companyName={project?.companyName || ''} 
        />

        <div>
          <Tabs defaultValue="view" className="w-full">
            <TabsList className="mb-4 w-full" style={{ backgroundColor: colors.blueDark }}>
              {tabs.map(({ id, label, icon: Icon }) => (
                <TabsTrigger key={id} value={id} className="gap-2" style={{ color: colors.white }}>
                  <Icon className="size-4" /> {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="view" className="space-y-4">
              <ProjectViewTab projectId={projectId || ''} />
            </TabsContent>

            <TabsContent value="edit" className="space-y-6">
              <ProjectDetailsForm project={project} />
              <ProjectTasksManager 
                initialTasks={tasks} 
                onTasksChange={handleTasksChange} 
              />
            </TabsContent>

            <TabsContent value="candidates" className="space-y-4">
              <ProjectCandidatesTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};


