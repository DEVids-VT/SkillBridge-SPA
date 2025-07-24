import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
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
  ExternalLink,
  Clipboard,
  Check,
  BrainCircuit
} from 'lucide-react';
import { colors, cards, typography } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock project data - would typically come from API
const mockProjectDetails = {
  '1': {
    id: '1',
    title: 'E-commerce Product Catalog API',
    summary: 'Build a comprehensive RESTful API for managing product catalogs with advanced filtering, pagination, search capabilities, and inventory management.',
    description: `This project challenges you to design and implement a production-ready API for e-commerce product management. You'll be working with complex data relationships, implementing efficient search algorithms, and ensuring your API can handle high traffic scenarios typical of modern e-commerce platforms.

The API should support a wide range of operations including product CRUD operations, category management, inventory tracking, price management, and advanced search functionality. You'll need to consider performance optimization, data validation, error handling, and API documentation.

Key technical challenges include implementing efficient database queries for complex filtering, designing a scalable search system, managing product variants and attributes, and ensuring data consistency across related entities. The solution should be designed with future scalability in mind, considering potential integrations with payment systems, order management, and analytics platforms.`,
    deadline: '2024-05-15T23:59:59Z',
    status: 1, // 0=Draft, 1=Active, 2=Completed, 3=Archived
    level: 2, // 0=Beginner, 1=Intermediate, 2=Advanced
    learningBenefits: 'REST API design principles, Database optimization and indexing, Query performance tuning, Authentication & Authorization patterns, API documentation with OpenAPI/Swagger, Data validation and sanitization, Error handling and logging, Testing strategies (unit, integration, load), Caching strategies, Rate limiting implementation',
    suggestedApproach: `Start by thoroughly analyzing the requirements and designing your database schema. Consider using a repository pattern to abstract database operations and make your code more testable. Implement pagination early to ensure performance with large datasets.

For the search functionality, consider implementing both basic text search and advanced filtering. You might want to use database indexes for simple queries and consider integrating with a search engine like Elasticsearch for complex search requirements.

Use middleware for cross-cutting concerns like authentication, logging, and rate limiting. Implement comprehensive error handling with proper HTTP status codes and meaningful error messages. Write tests for all endpoints and consider implementing automated testing in your CI/CD pipeline.

For performance, implement caching strategies where appropriate and consider using database connection pooling. Document your API thoroughly using OpenAPI/Swagger specifications.`,
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'TypeScript', 'REST API Design', 'Database Design', 'Authentication', 'Testing', 'API Documentation'],
    tasks: [
      { 
        id: 't1', 
        title: 'Project Setup & Architecture Planning', 
        description: 'Initialize project repository with TypeScript, Express, and PostgreSQL. Set up project structure, configure ESLint/Prettier, and design the overall architecture including database schema and API endpoints.', 
        isCompleted: true, 
        sequence: 1 
      },
      { 
        id: 't2', 
        title: 'Database Schema Design & Implementation', 
        description: 'Create comprehensive database schema with tables for products, categories, attributes, inventory, pricing, and related entities. Implement proper relationships, constraints, and indexes for optimal performance.', 
        isCompleted: true, 
        sequence: 2 
      },
      { 
        id: 't3', 
        title: 'Core API Endpoints Implementation', 
        description: 'Implement CRUD operations for products, categories, and attributes. Include proper validation, error handling, and response formatting. Ensure all endpoints follow REST conventions.', 
        isCompleted: false, 
        sequence: 3 
      },
      { 
        id: 't4', 
        title: 'Advanced Filtering & Search System', 
        description: 'Build sophisticated filtering system supporting multiple criteria (price range, category, attributes, availability). Implement full-text search with relevance scoring and fuzzy matching capabilities.', 
        isCompleted: false, 
        sequence: 4 
      },
      { 
        id: 't5', 
        title: 'Pagination & Performance Optimization', 
        description: 'Implement efficient pagination with cursor-based or offset-based approaches. Add database indexing, query optimization, and caching strategies to handle large datasets and high traffic.', 
        isCompleted: false, 
        sequence: 5 
      },
      { 
        id: 't6', 
        title: 'Authentication & Authorization', 
        description: 'Implement JWT-based authentication system with role-based access control. Add middleware for protecting routes and managing user permissions for different API operations.', 
        isCompleted: false, 
        sequence: 6 
      },
      { 
        id: 't7', 
        title: 'Inventory Management System', 
        description: 'Build inventory tracking system with stock levels, low stock alerts, and inventory history. Implement atomic operations to prevent race conditions in inventory updates.', 
        isCompleted: false, 
        sequence: 7 
      },
      { 
        id: 't8', 
        title: 'API Documentation & Testing', 
        description: 'Create comprehensive API documentation using OpenAPI/Swagger. Write unit tests, integration tests, and load tests. Implement automated testing pipeline and code coverage reporting.', 
        isCompleted: false, 
        sequence: 8 
      },
      { 
        id: 't9', 
        title: 'Error Handling & Logging', 
        description: 'Implement comprehensive error handling with proper HTTP status codes, error messages, and logging. Add request/response logging, error tracking, and monitoring capabilities.', 
        isCompleted: false, 
        sequence: 9 
      },
      { 
        id: 't10', 
        title: 'Deployment & Production Readiness', 
        description: 'Prepare application for production deployment with environment configuration, Docker containerization, health checks, and monitoring. Implement CI/CD pipeline and deployment strategies.', 
        isCompleted: false, 
        sequence: 10 
      }
    ],
    company: {
      id: 'c1',
      name: 'Axiomy Tech',
      logoUrl: '/images/companies/axiomy_logo.jpg',
      description: 'Axiomy Tech is an innovative technology company specializing in creating scalable e-commerce solutions and digital platforms. With over 8 years of experience in the industry, we help businesses of all sizes transform their digital presence through cutting-edge technology solutions. Our team of expert developers and designers work closely with clients to deliver custom solutions that drive growth and improve user experience.',
      websiteUrl: 'https://axiomy-tech.example.com'
    },
    gitRepo: null, // Connected GitHub repo (null if not connected)
    gitStats: null, // Git stats (null if no repo connected)
    additionalFiles: true // Whether project has additional files to download
  },
  '2': {
    id: '2',
    title: 'React State Management System',
    summary: 'Develop a custom state management solution for React applications with middleware support',
    description: 'Create a state management library that addresses common pain points in existing solutions. Your system should support async actions, middleware, and provide React hooks for consuming state.',
    deadline: '2024-06-20T23:59:59Z',
    status: 1,
    level: 2,
    learningBenefits: 'Advanced React patterns, State management principles, React hooks implementation, TypeScript generics',
    suggestedApproach: 'Begin by studying existing state management libraries like Redux, Zustand, and Recoil to understand their strengths and weaknesses. Focus on creating a simple API first, then add more advanced features.',
    skills: ['React', 'TypeScript', 'State Management', 'JavaScript Internals'],
    company: {
      id: 'c2',
      name: 'DevIds',
      logoUrl: '/images/companies/Devids-logo.png',
      description: 'DevIds is a software development company focused on creating cutting-edge frontend libraries and developer tools.',
      websiteUrl: 'https://devids.example.com'
    },
    tasks: [
      { id: 't1', title: 'Research Existing Solutions', description: 'Analyze existing state management libraries and document their pros and cons', isCompleted: true, sequence: 1 },
      { id: 't2', title: 'Core Store Implementation', description: 'Create core state store with basic functionality (get/set state)', isCompleted: false, sequence: 2 },
      { id: 't3', title: 'React Integration', description: 'Develop React hooks for accessing and updating state', isCompleted: false, sequence: 3 },
      { id: 't4', title: 'Middleware System', description: 'Implement middleware system for intercepting and processing actions', isCompleted: false, sequence: 4 },
      { id: 't5', title: 'Performance Optimization', description: 'Optimize for performance, preventing unnecessary re-renders', isCompleted: false, sequence: 5 },
      { id: 't6', title: 'Documentation & Examples', description: 'Create documentation and example applications demonstrating usage', isCompleted: false, sequence: 6 }
    ],
    gitRepo: {
      url: 'https://github.com/username/react-state-lib',
      name: 'react-state-lib'
    },
    gitStats: {
      latestCommit: {
        message: 'Implement basic store functionality',
        date: '2024-04-10T14:32:18Z'
      },
      totalCommits: 7,
      branches: 2
    },
    additionalFiles: true
  },
  '3': {
    id: '3',
    title: 'Machine Learning Image Classifier',
    summary: 'Build and train a neural network for image classification using TensorFlow',
    description: 'This project involves creating a machine learning model that can classify images into multiple categories. You will preprocess data, train the model, evaluate its performance, and deploy it as a web service.',
    deadline: '2024-07-15T23:59:59Z',
    status: 1,
    level: 1,
    learningBenefits: 'Machine learning fundamentals, Neural networks, Data preprocessing, Model evaluation',
    suggestedApproach: 'Start with a simple model architecture and gradually increase complexity. Use transfer learning to leverage pre-trained networks. Focus on data preprocessing to improve accuracy.',
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science'],
    company: {
      id: 'c3',
      name: 'Oximo',
      logoUrl: '/images/companies/oximologo.jpg',
      description: 'Oximo is an AI and machine learning research company developing cutting-edge solutions for various industries.',
      websiteUrl: 'https://oximo.example.com'
    },
    tasks: [
      { id: 't1', title: 'Dataset Preparation', description: 'Gather and preprocess image dataset for training and validation', isCompleted: false, sequence: 1 },
      { id: 't2', title: 'Model Architecture Design', description: 'Design neural network architecture for image classification', isCompleted: false, sequence: 2 },
      { id: 't3', title: 'Model Training', description: 'Train the model using prepared dataset and optimize hyperparameters', isCompleted: false, sequence: 3 },
      { id: 't4', title: 'Evaluation & Testing', description: 'Evaluate model performance using appropriate metrics', isCompleted: false, sequence: 4 },
      { id: 't5', title: 'Web Service Deployment', description: 'Create a simple web service to expose the model via API', isCompleted: false, sequence: 5 }
    ],
    gitRepo: null,
    gitStats: null,
    additionalFiles: true
  }
};

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
    2: { label: 'Advanced', color: colors.orange }
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
  const project = projectId ? mockProjectDetails[projectId as keyof typeof mockProjectDetails] : null;
  
  // State for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    tasks: true,
    details: true,
    github: true,
    llm: true
  });

  // Clipboard state
  const [copied, setCopied] = useState(false);

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
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

  // Generate detailed prompt for LLMs
  const generateLlmPrompt = () => {
    if (!project) return '';
    
    // Create task list string
    const tasksList = project.tasks.map(task => 
      `- Task ${task.sequence}: ${task.title} - ${task.description} ${task.isCompleted ? '[COMPLETED]' : '[PENDING]'}`
    ).join('\n');
    
    // Create skills list
    const skillsList = project.skills.join(', ');
    
    // Generate the prompt
    return `# Project Analysis Request: ${project.title}

## Project Overview
I'm working on a project titled "${project.title}" which requires me to ${project.summary}

## Project Details
- Level: ${['Beginner', 'Intermediate', 'Advanced'][project.level]}
- Skills Required: ${skillsList}
- Deadline: ${new Date(project.deadline).toLocaleDateString()}
- Company: ${project.company.name}

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
                    <img 
                      src={project.company.logoUrl} 
                      alt={`${project.company.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="flex-1">
                  <h1 
                    className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3"
                  >
                    {project.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3 text-sm">
                    <span className="text-blue-400">
                      {project.company.name}
                    </span>
                    <a 
                      href={project.company.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Website
                    </a>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-1.5" />
                      <span className="text-gray-400">
                        {formatDate(project.deadline)}
                        <span className="ml-1 text-red-400">
                          ({daysRemaining} days left)
                        </span>
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    {project.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Description Card */}
          <div className={cn(cards.base, 'bg-transparent')}>
            <div className={cards.header}>
              <h3 className={typography.heading[4]}>About {project.company.name}</h3>
            </div>
            <div className={cards.body}>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-1">
                  <p className="text-gray-300">{project.company.description}</p>
                </div>
                <div className="shrink-0 mt-4 sm:mt-0">
                  <div className="flex flex-wrap gap-2 justify-start sm:justify-end max-w-xs">
                    {/* Project Level Badge */}
                    <LevelBadge level={project.level} />
                    
                    {/* Skills */}
                    {project.skills.map(skill => (
                      <Badge 
                        key={skill} 
                        style={{ backgroundColor: `${colors.blue}30`, color: colors.yellow, borderColor: colors.blue }}
                        className="border"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div className={cn(cards.base, "mb-6")}>
          <div 
            className={cn(cards.header, "cursor-pointer")} 
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
                  <h4 className={typography.heading[5] + " mb-2"}>Level & Skills</h4>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <LevelBadge level={project.level} />
                    {project.skills.map(skill => (
                      <Badge 
                        key={skill} 
                        style={{ backgroundColor: `${colors.blue}30`, color: colors.yellow, borderColor: colors.blue }}
                        className="border"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <h4 className={typography.heading[5] + " mb-2"}>Description</h4>
                  <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
                </div>
                
                {/* Learning Benefits */}
                <div>
                  <h4 className={typography.heading[5] + " mb-2"}>Learning Benefits</h4>
                  <p className="text-gray-300">{project.learningBenefits}</p>
                </div>
                
                {/* Suggested Approach */}
                <div>
                  <h4 className={typography.heading[5] + " mb-2"}>Suggested Approach</h4>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${colors.blue}20`, borderLeft: `4px solid ${colors.blue}` }}
                  >
                    <p className="text-gray-300 whitespace-pre-line">{project.suggestedApproach}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div className={cn(cards.base, "mb-6")}>
          <div 
            className={cn(cards.header, "cursor-pointer")}
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
                      borderColor: task.isCompleted ? colors.yellow : colors.blue
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 cursor-pointer" onClick={() => handleTaskToggle(task.id)}>
                        {task.isCompleted ? (
                          <CheckCircle2 size={20} style={{ color: colors.yellow }} />
                        ) : (
                          <Circle size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`${typography.heading[5]} ${task.isCompleted ? 'line-through opacity-70' : ''}`}>
                            {task.title}
                          </h4>
                          <span className="text-sm text-gray-400">Task {task.sequence}</span>
                        </div>
                        <p className={`text-gray-300 mt-1 ${task.isCompleted ? 'line-through opacity-70' : ''}`}>
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
        <div className={cn(cards.base, "mb-6")}>
          <div 
            className={cn(cards.header, "cursor-pointer")} 
            onClick={() => toggleSection('github')}
          >
            <div className="flex items-center justify-between w-full">
              <h3 className={typography.heading[4]}>GitHub Integration</h3>
              {expandedSections.github ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          
          {expandedSections.github && (
            <div className={cards.body}>
              {project.gitRepo ? (
                <div>
                  {/* Connected Repository Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Github size={18} className="text-white" />
                      <a 
                        href={project.gitRepo.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:underline"
                      >
                        {project.gitRepo.name}
                      </a>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: colors.blueDark }}>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <GitBranch size={16} />
                          <span>Latest Commit</span>
                        </div>
                        <p className="text-sm truncate">{project.gitStats?.latestCommit.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {project.gitStats?.latestCommit.date 
                            ? new Date(project.gitStats.latestCommit.date).toLocaleDateString() 
                            : ''}
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-lg" style={{ backgroundColor: colors.blueDark }}>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <Code size={16} />
                          <span>Total Commits</span>
                        </div>
                        <p className="text-xl font-semibold">{project.gitStats?.totalCommits}</p>
                      </div>
                      
                      <div className="p-3 rounded-lg" style={{ backgroundColor: colors.blueDark }}>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <BarChart size={16} />
                          <span>Activity</span>
                        </div>
                        <p className="text-sm">Last push: {project.gitStats?.latestCommit.date 
                          ? new Date(project.gitStats.latestCommit.date).toLocaleDateString() 
                          : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* GitHub Connection CTA */}
                  <div className="flex flex-col items-center text-center p-6 border-2 border-dashed rounded-lg" style={{ borderColor: colors.blue }}>
                    <Github size={40} className="mb-4 text-gray-400" />
                    <h4 className={typography.heading[5] + " mb-2"}>Connect Your GitHub Repository</h4>
                    <p className="text-gray-300 mb-6 max-w-md">
                      Link your GitHub repository to this project for automatic progress tracking and assessment when the deadline is reached.
                    </p>
                    <button
                      className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                      style={{ backgroundColor: colors.blue, color: colors.dark }}
                      onClick={handleConnectGithub}
                    >
                      <Github size={18} />
                      Connect GitHub Repository
                    </button>
                  </div>
                </div>
              )}
              
              {/* GitHub Integration Explanation */}
              <div className="mt-6 p-4 rounded-lg bg-opacity-50" style={{ backgroundColor: `${colors.blueDark}60` }}>
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-gray-400 mt-1" />
                  <div>
                    <h5 className="font-medium mb-1">Automatic Project Assessment</h5>
                    <p className="text-sm text-gray-400">
                      When the project deadline is reached, SkillBridge will analyze your GitHub repository to assess your implementation, coding practices, and solution quality. This helps provide objective feedback on your work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LLM Integration Section */}
        <div className={cn(cards.base, "mb-6")}>
          <div 
            className={cn(cards.header, "cursor-pointer")} 
            onClick={() => toggleSection('llm')}
          >
            <div className="flex items-center justify-between w-full">
              <h3 className={typography.heading[4]}>AI Assistant Integration</h3>
              {expandedSections.llm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          
          {expandedSections.llm && (
            <div className={cards.body}>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ backgroundColor: `${colors.blue}30` }}>
                  <BrainCircuit size={24} style={{ color: colors.yellow }} />
                </div>
                <h4 className={typography.heading[5] + " mb-2"}>Get AI Assistance With Your Project</h4>
                <p className="text-gray-300 mb-6 max-w-md">
                  Generate a detailed prompt about this project to use with ChatGPT, Claude, or other AI assistants. 
                  This helps you get more targeted guidance on understanding the project requirements and implementation.
                </p>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  style={{ 
                    backgroundColor: copied ? `${colors.yellow}` : colors.blue,
                    color: copied ? colors.dark : colors.dark,
                    cursor: copied ? 'default' : 'pointer'
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
              
              <div className="p-4 rounded-lg bg-opacity-50" style={{ backgroundColor: `${colors.blueDark}60` }}>
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-gray-400 mt-1" />
                  <div>
                    <h5 className="font-medium mb-1">How to Use This Feature</h5>
                    <p className="text-sm text-gray-400 mb-2">
                      The generated prompt contains comprehensive details about your project including requirements, 
                      tasks, context, and specific questions to help an AI assistant provide more relevant guidance.
                    </p>
                    <ol className="list-decimal text-sm text-gray-400 pl-4 space-y-1">
                      <li>Click the button above to copy the prompt</li>
                      <li>Paste it into ChatGPT, Claude, or your preferred AI assistant</li>
                      <li>Edit the prompt if needed to focus on specific aspects you need help with</li>
                      <li>Use the AI's response to better understand your project and implementation approach</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Resources */}
        {project.additionalFiles && (
          <div className="mb-6">
            <button
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-all duration-200 border-2"
              style={{ 
                backgroundColor: `${colors.yellow}10`, 
                borderColor: colors.yellow,
                color: colors.yellow
              }}
            >
              <Download size={18} />
              Download Project Resources
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 