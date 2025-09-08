import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { colors, typography } from '@/lib/design-system';

interface ProjectDetailsFormProps {
  project: any;
}

export default function ProjectDetailsForm({ project }: ProjectDetailsFormProps) {
  return (
    <div
      className="rounded-2xl border p-6 shadow-md hover:shadow-lg transition"
      style={{ backgroundColor: colors.blueDark, borderColor: colors.borderLight }}
    >
      <div className="mb-4">
        <h3 className={typography.heading[4]}>Project Details</h3>
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          Information, learning outcomes, and required skills
        </p>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
              Title
            </label>
            <Input
              placeholder="Project Title"
              defaultValue={project?.title}
              className="bg-transparent"
              style={{ borderColor: colors.blue, color: colors.white }}
            />
          </div>
          <div>
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
              Level
            </label>
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
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
              Deadline
            </label>
            <Input
              type="date"
              defaultValue={project?.deadline ? new Date(project.deadline).toISOString().split('T')[0] : ''}
              className="bg-transparent"
              style={{ borderColor: colors.blue, color: colors.white }}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
              Summary
            </label>
            <Textarea
              placeholder="Brief project summary"
              defaultValue={(project as any)?.summary}
              rows={3}
              className="bg-transparent"
              style={{ borderColor: colors.blue, color: colors.white }}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
              Description
            </label>
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
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
              Learning Benefits
            </label>
            <Textarea
              placeholder="What will candidates learn from this project?"
              defaultValue={(project as any)?.learningBenefits}
              rows={6}
              className="bg-transparent"
              style={{ borderColor: colors.blue, color: colors.white }}
            />
          </div>
          <div>
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
              Suggested Approach
            </label>
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
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
              Skills
            </label>
            <Input
              placeholder="e.g. React, TypeScript, Node.js (comma separated)"
              defaultValue={project?.skills?.map((s: any) => s.name).join(', ')}
              className="bg-transparent"
              style={{ borderColor: colors.blue, color: colors.white }}
            />
          </div>
          {project?.skills && project.skills.length > 0 && (
            <div>
              <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                Current Skills:
              </p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill: any) => (
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
  );
}
