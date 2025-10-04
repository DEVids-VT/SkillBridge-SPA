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
} from '@/components/ui/select';
import { colors, cards } from '@/lib/design-system';
import { ManualTaskEditor, ManualTaskItem } from './ManualTaskEditor';

export interface TaskEditorItem {
  title: string;
  description?: string;
  sequence: number;
}

// Re-export for compatibility
export type { ManualTaskItem };

export interface ProjectAssignmentManualFormState {
  title: string;
  description?: string;
  summary: string;
  learningBenefits: string;
  suggestedApproach: string;
  level: '0' | '1' | '2';
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
  // Helper function to get display text for difficulty level
  const getLevelDisplay = (level: string) => {
    const levelMap: Record<string, string> = {
      '0': '🟢 Beginner',
      '1': '🟡 Intermediate',
      '2': '🔴 Advanced',
    };
    return levelMap[level] || level;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className={cards.base}>
        <div className={cards.header}>
          <h2 className="text-2xl font-bold text-white">Basic Information</h2>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            Define the core details of your project assignment
          </p>
        </div>
        <div className={cards.body}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="title" className="text-white flex items-center gap-1">
                Project Title
                <span style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="title"
                value={state.title}
                onChange={(e) => onChange({ title: e.target.value })}
                placeholder="e.g., Build a Responsive Landing Page"
                required
                className="mt-1.5"
              />
              <p className="text-xs mt-1.5" style={{ color: colors.textMuted }}>
                A clear, descriptive title that summarizes the project
              </p>
            </div>
            <div>
              <Label className="text-white flex items-center gap-1">
                Difficulty Level
                <span style={{ color: colors.error }}>*</span>
              </Label>
              <Select
                value={state.level}
                onValueChange={(v) => onChange({ level: v as '0' | '1' | '2' })}
              >
                <SelectTrigger className="mt-1.5">
                  <span style={{ color: state.level ? colors.text : colors.textMuted }}>
                    {state.level ? getLevelDisplay(state.level) : 'Select difficulty level'}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    <SelectItem value="0">🟢 Beginner</SelectItem>
                    <SelectItem value="1">🟡 Intermediate</SelectItem>
                    <SelectItem value="2">🔴 Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deadline" className="text-white flex items-center gap-1">
                Deadline
                <span style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="deadline"
                type="date"
                value={state.deadline}
                onChange={(e) => onChange({ deadline: e.target.value })}
                required
                className="mt-1.5"
                min={new Date().toISOString().split('T')[0]}
              />
              <p className="text-xs mt-1.5" style={{ color: colors.textMuted }}>
                The target completion date for this project
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className={cards.base}>
        <div className={cards.header}>
          <h3 className="text-xl font-semibold text-white">Project Details</h3>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            Provide comprehensive information about the project
          </p>
        </div>
        <div className={cards.body}>
          <div className="space-y-5">
            <div>
              <Label htmlFor="summary" className="text-white flex items-center gap-1">
                Summary
                <span style={{ color: colors.error }}>*</span>
              </Label>
              <Textarea
                id="summary"
                value={state.summary}
                onChange={(e) => onChange({ summary: e.target.value })}
                placeholder="Provide a concise overview of the project in 2-3 sentences"
                required
                rows={3}
                className="mt-1.5"
              />
              <p className="text-xs mt-1.5" style={{ color: colors.textMuted }}>
                A brief overview that candidates will see first
              </p>
            </div>
            <div>
              <Label htmlFor="description" className="text-white">
                Detailed Description <span style={{ color: colors.textMuted }}>(optional)</span>
              </Label>
              <Textarea
                id="description"
                value={state.description ?? ''}
                onChange={(e) => onChange({ description: e.target.value })}
                placeholder="Provide additional context, background, or specific requirements..."
                rows={4}
                className="mt-1.5"
              />
              <p className="text-xs mt-1.5" style={{ color: colors.textMuted }}>
                Add more detailed information if needed
              </p>
            </div>
            <div>
              <Label htmlFor="learningBenefits" className="text-white flex items-center gap-1">
                Learning Benefits
                <span style={{ color: colors.error }}>*</span>
              </Label>
              <Textarea
                id="learningBenefits"
                value={state.learningBenefits}
                onChange={(e) => onChange({ learningBenefits: e.target.value })}
                placeholder="What skills and knowledge will candidates gain? List the key learning outcomes..."
                required
                rows={4}
                className="mt-1.5"
              />
              <p className="text-xs mt-1.5" style={{ color: colors.textMuted }}>
                Help candidates understand what they'll learn
              </p>
            </div>
            <div>
              <Label htmlFor="suggestedApproach" className="text-white flex items-center gap-1">
                Suggested Approach
                <span style={{ color: colors.error }}>*</span>
              </Label>
              <Textarea
                id="suggestedApproach"
                value={state.suggestedApproach}
                onChange={(e) => onChange({ suggestedApproach: e.target.value })}
                placeholder="Provide guidance on how to tackle this project. Include recommended steps, methodologies, or best practices..."
                required
                rows={4}
                className="mt-1.5"
              />
              <p className="text-xs mt-1.5" style={{ color: colors.textMuted }}>
                Guide candidates on the recommended approach
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Required Skills */}
      <div className={cards.base}>
        <div className={cards.header}>
          <h3 className="text-xl font-semibold text-white">Required Skills</h3>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            Define the skills needed for this project
          </p>
        </div>
        <div className={cards.body}>
          <Label htmlFor="skills" className="text-white">
            Skill Names <span style={{ color: colors.textMuted }}>(optional)</span>
          </Label>
          <Input
            id="skills"
            value={state.skillIdsInput}
            onChange={(e) => onChange({ skillIdsInput: e.target.value })}
            placeholder="e.g., React, TypeScript, CSS, REST API"
            className="mt-1.5"
          />
          <p className="text-xs mt-1.5" style={{ color: colors.textMuted }}>
            Enter skill names separated by commas. These will be matched with existing skills in the
            system.
          </p>
        </div>
      </div>

      {/* Tasks */}
      <div className={cards.base}>
        <div className={cards.header}>
          <h3 className="text-xl font-semibold text-white">Project Tasks</h3>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            Break down the project into manageable tasks
          </p>
        </div>
        <div className={cards.body}>
          <ManualTaskEditor tasks={state.tasks} onTasksChange={onTasksChange} />
        </div>
      </div>

      {/* Submit Section */}
      <div
        className="flex justify-between items-center p-6 rounded-2xl border-2"
        style={{
          backgroundColor: colors.blueDark,
          borderColor: colors.borderLight,
        }}
      >
        <div>
          <p className="text-sm font-medium text-white">Ready to create your project?</p>
          <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
            Make sure all required fields are filled out before submitting
          </p>
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="px-8 py-2 h-11 text-base font-semibold"
          style={{
            backgroundColor: colors.blue,
            color: colors.white,
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? (
            <>
              <span className="animate-pulse">Creating Assignment...</span>
            </>
          ) : (
            'Create Assignment'
          )}
        </Button>
      </div>
    </form>
  );
}
