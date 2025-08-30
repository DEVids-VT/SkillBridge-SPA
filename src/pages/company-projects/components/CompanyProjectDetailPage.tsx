import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { colors, cards, typography } from '@/lib/design-system';
import { Eye, Pencil, Users, Download, ExternalLink } from 'lucide-react';
import { useProjectDetail } from '@/pages/projects/hooks/useProjectDetail';

export const CompanyProjectDetailPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data: project } = useProjectDetail(projectId);

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
                <div className={cards.base}>
                  <div className={cards.header}>
                    <h3 className={typography.heading[4]}>Candidate View</h3>
                  </div>
                  <div className={cards.body}>
                    <p className="text-gray-300">This is how candidates see your assessment.</p>
                    <div className="mt-4">
                      <Link to={`/projects/${projectId}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium"
                        style={{ backgroundColor: colors.blue, color: colors.dark }}>
                        <Eye className="size-4" /> Open Candidate View
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="edit" className="space-y-4">
                {/* Project Header */}
                <div className={cards.base}>
                  <div className={cards.header}>
                    <h3 className={typography.heading[4]}>Project Information</h3>
                  </div>
                  <div className={cards.body}>
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
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Company</label>
                        <Input 
                          placeholder="Company Name" 
                          defaultValue={project?.companyName} 
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
                      <div>
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Level</label>
                        <Select value={String((project as any)?.level ?? 0)} onValueChange={() => {}}>
                          <SelectTrigger className="w-full bg-transparent border-blue-600 text-white">
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
                    </div>
                  </div>
                </div>

                {/* Learning Benefits & Approach */}
                <div className={cards.base}>
                  <div className={cards.header}>
                    <h3 className={typography.heading[4]}>Learning & Approach</h3>
                  </div>
                  <div className={cards.body}>
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
                  </div>
                </div>

                {/* Skills */}
                <div className={cards.base}>
                  <div className={cards.header}>
                    <h3 className={typography.heading[4]}>Required Skills</h3>
                  </div>
                  <div className={cards.body}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Skills</label>
                        <Input 
                          placeholder="e.g. React, TypeScript, Node.js (comma separated)" 
                          defaultValue={project?.skills?.map(s => s.name).join(', ')}
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
                                style={{
                                  backgroundColor: `${colors.blue}30`,
                                  color: colors.yellow,
                                  borderColor: colors.blue,
                                }}
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tasks Management */}
                <div className={cards.base}>
                  <div className={cards.header}>
                    <h3 className={typography.heading[4]}>Project Tasks</h3>
                  </div>
                  <div className={cards.body}>
                    <div className="space-y-4">
                      {(project as any)?.tasks && (project as any).tasks.length > 0 ? (
                        <div className="space-y-3">
                          {(project as any).tasks.map((task: any, index: number) => (
                            <div 
                              key={task.id || index}
                              className="p-4 rounded-lg border"
                              style={{
                                backgroundColor: colors.blueDark,
                                borderColor: colors.blue,
                              }}
                            >
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                                <div className="md:col-span-1">
                                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>Order</label>
                                  <Input 
                                    type="number" 
                                    defaultValue={task.sequence || index + 1}
                                    className="bg-transparent text-center" 
                                    style={{ borderColor: colors.borderLight, color: colors.white }} 
                                  />
                                </div>
                                <div className="md:col-span-5">
                                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>Task Title</label>
                                  <Input 
                                    placeholder="Task title" 
                                    defaultValue={task.title}
                                    className="bg-transparent" 
                                    style={{ borderColor: colors.borderLight, color: colors.white }} 
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>Description</label>
                                  <Textarea 
                                    placeholder="Task description" 
                                    defaultValue={task.description}
                                    rows={2}
                                    className="bg-transparent" 
                                    style={{ borderColor: colors.borderLight, color: colors.white }} 
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p style={{ color: colors.textSecondary }}>No tasks defined yet</p>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button variant="outline" style={{ borderColor: colors.blue, color: colors.white }}>
                          Add Task
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Actions */}
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" style={{ borderColor: colors.borderLight, color: colors.white }}>
                    Cancel
                  </Button>
                  <Button style={{ backgroundColor: colors.blue, color: colors.dark }}>
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="candidates" className="space-y-4">
                <div className={cards.base}>
                  <div className={cards.header}>
                    <h3 className={typography.heading[4]}>Enrolled Candidates</h3>
                  </div>
                  <div className={cards.body}>
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


