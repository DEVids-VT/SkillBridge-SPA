import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { colors, cards } from '@/lib/design-system';
import TaskManagementEditor from '@/pages/company-projects/components/TaskManagementEditor';

export interface TaskEditorItem {
  title: string;
  description?: string;
  sequence: number;
}

export interface ProjectAssignmentManualFormState {
  title: string;
  description?: string;
  summary: string;
  learningBenefits: string;
  suggestedApproach: string;
  level: '0' | '1' | '2';
  status: '0' | '1' | '2' | '3';
  deadline: string; // yyyy-MM-dd
  skillIdsInput: string; // comma separated GUIDs
  tasks: TaskEditorItem[];
}

interface Props {
  state: ProjectAssignmentManualFormState;
  onChange: (patch: Partial<ProjectAssignmentManualFormState>) => void;
  onTasksChange: (tasks: TaskEditorItem[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
}

export function ProjectAssignmentManualForm({
  state,
  onChange,
  onTasksChange,
  onSubmit,
  submitting,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Basics */}
      <div className={cards.base}>
        <div className={cards.header}>
          <h2 className="text-2xl font-bold text-white">Project Assignment</h2>
        </div>
        <div className={cards.body}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" className="text-white">
                Title
              </Label>
              <Input
                id="title"
                value={state.title}
                onChange={(e) => onChange({ title: e.target.value })}
                placeholder="e.g., Build a Landing Page"
              />
            </div>
            <div>
              <Label className="text-white">Level</Label>
              <Select
                value={state.level}
                onValueChange={(v) => onChange({ level: v as '0' | '1' | '2' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    <SelectItem value="0">Beginner</SelectItem>
                    <SelectItem value="1">Intermediate</SelectItem>
                    <SelectItem value="2">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Status</Label>
              <Select
                value={state.status}
                onValueChange={(v) => onChange({ status: v as '0' | '1' | '2' | '3' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="0">Draft</SelectItem>
                    <SelectItem value="1">Published</SelectItem>
                    <SelectItem value="2">Completed</SelectItem>
                    <SelectItem value="3">Cancelled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deadline" className="text-white">
                Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                value={state.deadline}
                onChange={(e) => onChange({ deadline: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div className={cards.base}>
        <div className={cards.header}>
          <h3 className="text-xl font-semibold text-white">Descriptions</h3>
        </div>
        <div className={cards.body}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="summary" className="text-white">
                Summary
              </Label>
              <Textarea
                id="summary"
                value={state.summary}
                onChange={(e) => onChange({ summary: e.target.value })}
                placeholder="Short summary"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-white">
                Description (optional)
              </Label>
              <Textarea
                id="description"
                value={state.description ?? ''}
                onChange={(e) => onChange({ description: e.target.value })}
                placeholder="Detailed description"
              />
            </div>
            <div>
              <Label htmlFor="learningBenefits" className="text-white">
                Learning Benefits
              </Label>
              <Textarea
                id="learningBenefits"
                value={state.learningBenefits}
                onChange={(e) => onChange({ learningBenefits: e.target.value })}
                placeholder="What will candidates learn?"
              />
            </div>
            <div>
              <Label htmlFor="suggestedApproach" className="text-white">
                Suggested Approach
              </Label>
              <Textarea
                id="suggestedApproach"
                value={state.suggestedApproach}
                onChange={(e) => onChange({ suggestedApproach: e.target.value })}
                placeholder="How to approach the assignment"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className={cards.base}>
        <div className={cards.header}>
          <h3 className="text-xl font-semibold text-white">Skills</h3>
        </div>
        <div className={cards.body}>
          <Label htmlFor="skills" className="text-white">
            Skill Ids (comma-separated GUIDs)
          </Label>
          <Input
            id="skills"
            value={state.skillIdsInput}
            onChange={(e) => onChange({ skillIdsInput: e.target.value })}
            placeholder="guid1, guid2, ..."
          />
          <p className="text-sm mt-2" style={{ color: colors.textMuted }}>
            Enter existing Skill IDs from your system (optional).
          </p>
        </div>
      </div>

      {/* Tasks */}
      <div className={cards.base}>
        <div className={cards.header}>
          <h3 className="text-xl font-semibold text-white">Tasks</h3>
        </div>
        <div className={cards.body}>
          <TaskManagementEditor
            initialTasks={state.tasks.map((t, idx) => ({
              id: String(idx + 1),
              title: t.title,
              description: t.description ?? '',
              isCompleted: false,
              sequence: t.sequence,
            }))}
            onTasksChange={(tasks) => {
              const mapped = tasks.map((t, idx) => ({
                title: t.title,
                description: t.description,
                sequence: t.sequence ?? idx + 1,
              }));
              onTasksChange(mapped);
            }}
            showSaveButton={false}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Assignment'}
        </Button>
      </div>
    </form>
  );
}
