import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useProjectAssignment } from './hooks/useProjectAssignment';
import { DashboardProjectHeader } from './components/dashboard-project-header/DashboardProjectHeader';
import { DashboardProjectCompanyDescription } from './components/dashboard-project-company-description/DashboardProjectCompanyDescription';
import { DashboardProjectDetails as DashboardProjectDetailsSection } from './components/dashboard-project-details/DashboardProjectDetails';
import { DashboardProjectTasks } from './components/dashboard-project-tasks/DashboardProjectTasks';
import { DashboardProjectGithubIntegration } from './components/dashboard-project-github-integration/DashboardProjectGithubIntegration';
import { DashboardProjectLlmIntegration } from './components/dashboard-project-llm-integration/DashboardProjectLlmIntegration';
import { DashboardProjectResources } from './components/dashboard-project-resources/DashboardProjectResources';

export const DashboardProjectDetails = () => {
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

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Project Header Section */}
        <DashboardProjectHeader project={project} />

        {/* Company Description Card */}
        <DashboardProjectCompanyDescription project={project} />

        {/* Project Details Section */}
        <DashboardProjectDetailsSection
          project={project}
          isExpanded={expandedSections.details}
          onToggle={() => toggleSection('details')}
        />

        {/* Tasks Section */}
        <DashboardProjectTasks
          project={project}
          isExpanded={expandedSections.tasks}
          onToggle={() => toggleSection('tasks')}
          onTaskToggle={handleTaskToggle}
        />

        {/* GitHub Integration Section */}
        <DashboardProjectGithubIntegration
          isExpanded={expandedSections.github}
          onToggle={() => toggleSection('github')}
          onConnectGithub={handleConnectGithub}
        />

        {/* LLM Integration Section */}
        <DashboardProjectLlmIntegration
          isExpanded={expandedSections.llm}
          onToggle={() => toggleSection('llm')}
          copied={copied}
          onCopyPrompt={copyPromptToClipboard}
        />

        {/* Project Resources */}
        <DashboardProjectResources />
      </div>
    </div>
  );
};
