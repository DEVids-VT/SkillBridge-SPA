export type DashboardStats = {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  totalEarnings: number;
};

export type RecentActivity = {
  id: string;
  type: 'project_started' | 'project_completed' | 'skill_earned' | 'milestone_reached';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
};

export type SkillProgress = {
  id: string;
  name: string;
  level: number;
  progress: number;
  category: string;
};

export type CategoryType = {
  id: string;
  name: string;
  count: number;
  color: string;
  description: string;
  skills: string[];
}; 