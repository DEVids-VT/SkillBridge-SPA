import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Download,
  Github,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Code,
  GitBranch,
  BarChart,
  Clipboard,
  Check,
  BrainCircuit,
  Loader2,
} from 'lucide-react';
import { colors, cards, typography } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useProjectAssignment } from '../hooks/useProjectAssignment';
// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Helper to calculate days remaining
const getDaysRemaining = (deadlineString: string) => {
  const deadline = new Date(deadlineString);
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Level badge component
const LevelBadge = ({ level }: { level: number }) => {
  const levelMap = {
    0: { label: 'Beginner', color: colors.blue },
    1: { label: 'Intermediate', color: colors.yellow },
    2: { label: 'Advanced', color: colors.orange },
  };

  const { label, color } = levelMap[level as keyof typeof levelMap] || levelMap[0];

  return (
    <span
      className="px-2 py-1 rounded text-xs font-medium"
      style={{ backgroundColor: color, color: colors.dark }}
    >
      {label}
    </span>
  );
};

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const { data: project, isLoading, error } = useProjectAssignment(projectId);

  // State for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    tasks: true,
    details: true,
    github: true,
    llm: true,
  });

  // Clipboard state
  const [copied, setCopied] = useState(false);

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Task completion handler
  const handleTaskToggle = (taskId: string) => {
    // In a real app, this would update the task via API
    console.log(`Toggle task ${taskId}`);
  };

  // Connect GitHub repo handler
  const handleConnectGithub = () => {
    // In a real app, this would integrate with GitHub API
    console.log('Connect GitHub repo');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-300">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-white mb-2">Failed to load project</h2>
          <p className="text-gray-400 mb-4">
            {error?.message || 'An error occurred while loading the project'}
          </p>
          <p className="text-sm text-gray-500">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-white mb-2">Project not found</h2>
          <p className="text-gray-400">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  // Generate detailed prompt for LLMs
  const generateLlmPrompt = () => {
    if (!project) return '';

    // Create task list string
    const tasksList = project.tasks
      .map(
        (task) =>
          `- Task ${task.sequence}: ${task.title} - ${task.description} ${task.isCompleted ? '[COMPLETED]' : '[PENDING]'}`
      )
      .join('\n');

    // Create skills list
    const skillsList = project.skills.map((skill) => skill.name).join(', ');

    // Generate the prompt
    return `# Project Analysis Request: ${project.title}

## Project Overview
I'm working on a project titled "${project.title}" which requires me to ${project.summary}

## Project Details
- Level: ${['Beginner', 'Intermediate', 'Advanced'][project.level]}
- Skills Required: ${skillsList}
- Duration: ${project.duration}
- Company: ${project.companyName}

## Project Description
${project.description}

## My Current Tasks
${tasksList}

## Learning Benefits
${project.learningBenefits}

## Suggested Approach
${project.suggestedApproach}

## Request
Could you help me better understand this project by:
1. Breaking down the key technical concepts I should understand
2. Suggesting a step-by-step implementation plan
3. Highlighting potential challenges and how to address them
4. Recommending resources or tutorials that would help me complete this successfully
5. Providing any code patterns or examples that would be useful for getting started

I'm particularly interested in understanding [specific aspect you're curious about] and would appreciate any insights on best practices related to this project.`;
  };

  // Copy prompt to clipboard
  const copyPromptToClipboard = () => {
    const prompt = generateLlmPrompt();
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-white mb-2">Failed to load project</h2>
          <p className="text-gray-400">{(error as Error).message || 'An unknown error occurred'}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-white mb-2">Project not found</h2>
          <p className="text-gray-400">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(project.deadline);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Project Header Section - Redesigned */}
        <div className="mb-8">
          {/* Project Header with dark navy blue background */}
          <div className="rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-6">
              <div className="flex items-start gap-6">
                {/* Company Logo */}
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                    <div
                      className="w-full h-full flex items-center justify-center text-2xl font-bold"
                      style={{ backgroundColor: colors.blue, color: colors.white }}
                    >
                      {project.companyName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex-1">
                  <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3">
                    {project.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3 text-sm">
                    <span className="text-blue-400">{project.companyName}</span>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-1.5" />
                      <span className="text-gray-400">
                        {project.duration}
                        <span className="ml-1 text-red-400">({daysRemaining} days left)</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300">{project.summary}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Description Card */}
          <div className={cn(cards.base, 'bg-transparent')}>
            <div className={cards.header}>
              <h3 className={typography.heading[4]}>About {project.companyName}</h3>
            </div>
            <div className={cards.body}>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-1">
                  <p className="text-gray-300">
                    This project is provided by {project.companyName}. Work on real-world challenges
                    and gain practical experience that companies are looking for.
                  </p>
                </div>
                <div className="shrink-0 mt-4 sm:mt-0">
                  <div className="flex flex-wrap gap-2 justify-start sm:justify-end max-w-xs">
                    {/* Project Level Badge */}
                    <LevelBadge level={project.level} />

                    {/* Skills */}
                    {project.skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        style={{
                          backgroundColor: `${colors.blue}30`,
                          color: colors.yellow,
                          borderColor: colors.blue,
                        }}
                        className="border"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div className={cn(cards.base, 'mb-6')}>
          <div
            className={cn(cards.header, 'cursor-pointer')}
            onClick={() => toggleSection('details')}
          >
            <div className="flex items-center justify-between w-full">
              <h3 className={typography.heading[4]}>Project Details</h3>
              {expandedSections.details ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          {expandedSections.details && (
            <div className={cards.body}>
              <div className="space-y-6">
                {/* Project Info */}
                <div>
                  <h4 className={typography.heading[5] + ' mb-2'}>Level & Skills</h4>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <LevelBadge level={project.level} />
                    {project.skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        style={{
                          backgroundColor: `${colors.blue}30`,
                          color: colors.yellow,
                          borderColor: colors.blue,
                        }}
                        className="border"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className={typography.heading[5] + ' mb-2'}>Description</h4>
                  <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
                </div>

                {/* Learning Benefits */}
                <div>
                  <h4 className={typography.heading[5] + ' mb-2'}>Learning Benefits</h4>
                  <p className="text-gray-300">{project.learningBenefits}</p>
                </div>

                {/* Suggested Approach */}
                <div>
                  <h4 className={typography.heading[5] + ' mb-2'}>Suggested Approach</h4>
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: `${colors.blue}20`,
                      borderLeft: `4px solid ${colors.blue}`,
                    }}
                  >
                    <p className="text-gray-300 whitespace-pre-line">{project.suggestedApproach}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div className={cn(cards.base, 'mb-6')}>
          <div
            className={cn(cards.header, 'cursor-pointer')}
            onClick={() => toggleSection('tasks')}
          >
            <div className="flex items-center justify-between w-full">
              <h3 className={typography.heading[4]}>Tasks</h3>
              {expandedSections.tasks ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          {expandedSections.tasks && (
            <div className={cards.body}>
              <div className="space-y-4">
                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: colors.blueDark,
                      borderColor: task.isCompleted ? colors.yellow : colors.blue,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-1 cursor-pointer"
                        onClick={() => handleTaskToggle(task.id)}
                      >
                        {task.isCompleted ? (
                          <CheckCircle2 size={20} style={{ color: colors.yellow }} />
                        ) : (
                          <Circle size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`${typography.heading[5]} ${task.isCompleted ? 'line-through opacity-70' : ''}`}
                          >
                            {task.title}
                          </h4>
                          <span className="text-sm text-gray-400">Task {task.sequence}</span>
                        </div>
                        <p
                          className={`text-gray-300 mt-1 ${task.isCompleted ? 'line-through opacity-70' : ''}`}
                        >
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* GitHub Integration Section */}
        <div className={cn(cards.base, 'mb-6')}>
          <div
            className={cn(cards.header, 'cursor-pointer')}
            onClick={() => toggleSection('github')}
          >
            <div className="flex items-center justify-between w-full">
              <h3 className={typography.heading[4]}>GitHub Integration</h3>
              {expandedSections.github ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          {expandedSections.github && (
            <div className={cards.body}>
              {/* eslint-disable-next-line no-constant-condition */}
              {false ? ( // TODO: Replace with actual git repo check when API supports it
                <div>
                  {/* Connected Repository Info - Placeholder */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Github size={18} className="text-white" />
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Repository Name
                      </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: colors.blueDark }}>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <GitBranch size={16} />
                          <span>Latest Commit</span>
                        </div>
                        <p className="text-sm truncate">Latest commit message</p>
                        <p className="text-xs text-gray-400 mt-1">Jan 1, 2024</p>
                      </div>

                      <div className="p-3 rounded-lg" style={{ backgroundColor: colors.blueDark }}>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <Code size={16} />
                          <span>Total Commits</span>
                        </div>
                        <p className="text-xl font-semibold">0</p>
                      </div>

                      <div className="p-3 rounded-lg" style={{ backgroundColor: colors.blueDark }}>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <BarChart size={16} />
                          <span>Activity</span>
                        </div>
                        <p className="text-sm">Last push: N/A</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* GitHub Connection CTA */}
                  <div
                    className="flex flex-col items-center text-center p-6 border-2 border-dashed rounded-lg"
                    style={{ borderColor: colors.blue }}
                  >
                    <Github size={40} className="mb-4 text-gray-400" />
                    <h4 className={typography.heading[5] + ' mb-2'}>
                      Connect Your GitHub Repository
                    </h4>
                    <p className="text-gray-300 mb-6 max-w-md">
                      Link your GitHub repository to this project for automatic progress tracking
                      and assessment when the deadline is reached.
                    </p>
                    <button
                      className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 opacity-50 cursor-not-allowed"
                      style={{ backgroundColor: colors.blue, color: colors.dark }}
                      onClick={handleConnectGithub}
                      disabled
                    >
                      <Github size={18} />
                      Connect GitHub Repository (Coming Soon)
                    </button>
                  </div>
                </div>
              )}

              {/* GitHub Integration Explanation */}
              <div
                className="mt-6 p-4 rounded-lg bg-opacity-50"
                style={{ backgroundColor: `${colors.blueDark}60` }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-gray-400 mt-1" />
                  <div>
                    <h5 className="font-medium mb-1">Automatic Project Assessment</h5>
                    <p className="text-sm text-gray-400">
                      When the project deadline is reached, SkillBridge will analyze your GitHub
                      repository to assess your implementation, coding practices, and solution
                      quality. This helps provide objective feedback on your work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LLM Integration Section */}
        <div className={cn(cards.base, 'mb-6')}>
          <div className={cn(cards.header, 'cursor-pointer')} onClick={() => toggleSection('llm')}>
            <div className="flex items-center justify-between w-full">
              <h3 className={typography.heading[4]}>AI Assistant Integration</h3>
              {expandedSections.llm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          {expandedSections.llm && (
            <div className={cards.body}>
              <div className="flex flex-col items-center text-center mb-6">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ backgroundColor: `${colors.blue}30` }}
                >
                  <BrainCircuit size={24} style={{ color: colors.yellow }} />
                </div>
                <h4 className={typography.heading[5] + ' mb-2'}>
                  Get AI Assistance With Your Project
                </h4>
                <p className="text-gray-300 mb-6 max-w-md">
                  Generate a detailed prompt about this project to use with ChatGPT, Claude, or
                  other AI assistants. This helps you get more targeted guidance on understanding
                  the project requirements and implementation.
                </p>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  style={{
                    backgroundColor: copied ? `${colors.yellow}` : colors.blue,
                    color: copied ? colors.dark : colors.dark,
                    cursor: copied ? 'default' : 'pointer',
                  }}
                  onClick={copyPromptToClipboard}
                  disabled={copied}
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      Prompt Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard size={18} />
                      Copy Project Prompt to Clipboard
                    </>
                  )}
                </button>
              </div>

              <div
                className="p-4 rounded-lg bg-opacity-50"
                style={{ backgroundColor: `${colors.blueDark}60` }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-gray-400 mt-1" />
                  <div>
                    <h5 className="font-medium mb-1">How to Use This Feature</h5>
                    <p className="text-sm text-gray-400 mb-2">
                      The generated prompt contains comprehensive details about your project
                      including requirements, tasks, context, and specific questions to help an AI
                      assistant provide more relevant guidance.
                    </p>
                    <ol className="list-decimal text-sm text-gray-400 pl-4 space-y-1">
                      <li>Click the button above to copy the prompt</li>
                      <li>Paste it into ChatGPT, Claude, or your preferred AI assistant</li>
                      <li>
                        Edit the prompt if needed to focus on specific aspects you need help with
                      </li>
                      <li>
                        Use the AI's response to better understand your project and implementation
                        approach
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Resources - Placeholder for additional files */}
        {/* eslint-disable-next-line no-constant-binary-expression */}
        {true && ( // TODO: Replace with actual additional files check when API supports it
          <div className="mb-6">
            <button
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-all duration-200 border-2 opacity-50 cursor-not-allowed"
              style={{
                backgroundColor: `${colors.yellow}10`,
                borderColor: colors.yellow,
                color: colors.yellow,
              }}
              disabled
            >
              <Download size={18} />
              Download Project Resources (Coming Soon)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
