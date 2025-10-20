import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { colors, typography } from '@/lib/design-system';
import { ProjectDetail } from '@/pages/projects/hooks/useProjectDetail';
import { useUpdateProject, UpdateProjectRequest } from '../hooks/useUpdateProject';

interface ProjectEditFormProps {
  project: ProjectDetail | undefined;
}

export default function ProjectEditForm({ project }: ProjectEditFormProps) {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    summary: '',
    learningBenefits: '',
    suggestedApproach: '',
    level: 0,
    duration: '',
    status: 0,
    skills: [] as string[],
  });

  // Skills input state for the comma-separated input
  const [skillsInput, setSkillsInput] = useState('');

  // Hook for updating project
  const { mutate: updateProject, isPending, error } = useUpdateProject();

  // Initialize form data when project loads
  useEffect(() => {
    if (project) {
      const projectSkills = project.skills?.map((s: any) => s.name) || [];
      setFormData({
        title: project.title || '',
        description: project.description || '',
        summary: (project as any)?.summary || '',
        learningBenefits: (project as any)?.learningBenefits || '',
        suggestedApproach: (project as any)?.suggestedApproach || '',
        level: (project as any)?.level ?? 0,
        duration: project.duration || '',
        status: project.status || 0,
        skills: projectSkills,
      });
      setSkillsInput(projectSkills.join(', '));
    }
  }, [project]);

  // Form change handlers
  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleLevelChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      level: parseInt(value, 10),
    }));
  };

  // Handle skills input change
  const handleSkillsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkillsInput(value);

    // Parse comma-separated skills and update form data
    const skillsArray = value
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    setFormData((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project?.id) return;

    const updateData: UpdateProjectRequest = {
      ...formData,
      duration: formData.duration,
      skills: formData.skills,
    };

    updateProject({
      id: project.id,
      data: updateData,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
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
                value={formData.title}
                onChange={handleInputChange('title')}
                className="bg-transparent"
                style={{ borderColor: colors.blue, color: colors.white }}
              />
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>
                Level
              </label>
              <Select value={String(formData.level)} onValueChange={handleLevelChange}>
                <SelectTrigger
                  className="w-full bg-transparent text-white border"
                  style={{ borderColor: colors.blue }}
                >
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
                Duration
              </label>
              <Input
                type="text"
                placeholder="e.g., 2 weeks, 1 month"
                value={formData.duration}
                onChange={handleInputChange('duration')}
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
                value={formData.summary}
                onChange={handleInputChange('summary')}
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
                value={formData.description}
                onChange={handleInputChange('description')}
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
                value={formData.learningBenefits}
                onChange={handleInputChange('learningBenefits')}
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
                value={formData.suggestedApproach}
                onChange={handleInputChange('suggestedApproach')}
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
                value={skillsInput}
                onChange={handleSkillsInputChange}
                className="bg-transparent"
                style={{ borderColor: colors.blue, color: colors.white }}
              />
              <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                Enter skills separated by commas
              </p>
            </div>
            {formData.skills && formData.skills.length > 0 && (
              <div>
                <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                  Current Skills:
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: `${colors.blue}30`,
                        color: colors.yellow,
                        borderColor: colors.blue,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div
              className="p-3 rounded-md border"
              style={{ backgroundColor: `${colors.error}20`, borderColor: colors.error }}
            >
              <p className="text-sm" style={{ color: colors.error }}>
                Failed to update project: {error.message}
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="submit"
              disabled={isPending}
              style={{ backgroundColor: colors.blue, color: colors.white }}
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
