import { useTranslation } from 'react-i18next';
import { DashboardStats, RecentActivity, SkillProgress } from './types';

export const useDashboard = () => {
  const { t } = useTranslation();

  // Mock dashboard stats - in real app this would come from API
  const getDashboardStats = (): DashboardStats => ({
    totalProjects: 24,
    completedProjects: 18,
    activeProjects: 6,
    totalEarnings: 12450
  });

  // Mock recent activities - in real app this would come from API
  const getRecentActivities = (): RecentActivity[] => [
    {
      id: '1',
      type: 'project_completed',
      title: t('dashboard.activities.projectCompleted', 'React Portfolio Website'),
      description: t('dashboard.activities.projectCompletedDesc', 'Successfully completed client project'),
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: '✅'
    },
    {
      id: '2',
      type: 'skill_earned',
      title: t('dashboard.activities.skillEarned', 'TypeScript Advanced'),
      description: t('dashboard.activities.skillEarnedDesc', 'Earned new skill certification'),
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: '🏆'
    },
    {
      id: '3',
      type: 'project_started',
      title: t('dashboard.activities.projectStarted', 'E-commerce Platform'),
      description: t('dashboard.activities.projectStartedDesc', 'Started new project with Team Alpha'),
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: '🚀'
    },
    {
      id: '4',
      type: 'milestone_reached',
      title: t('dashboard.activities.milestoneReached', '100 Hours Logged'),
      description: t('dashboard.activities.milestoneReachedDesc', 'Reached learning milestone this month'),
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      icon: '🎯'
    }
  ];

  // Mock skill progress - in real app this would come from API
  const getSkillProgress = (): SkillProgress[] => [
    {
      id: 'react',
      name: 'React',
      level: 4,
      progress: 85,
      category: 'Frontend'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      level: 3,
      progress: 75,
      category: 'Language'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      level: 3,
      progress: 70,
      category: 'Backend'
    },
    {
      id: 'design',
      name: 'UI/UX Design',
      level: 2,
      progress: 60,
      category: 'Design'
    },
    {
      id: 'python',
      name: 'Python',
      level: 2,
      progress: 45,
      category: 'Language'
    }
  ];

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return t('dashboard.time.justNow', 'Just now');
    } else if (diffHours < 24) {
      return t('dashboard.time.hoursAgo', `${diffHours} hours ago`, { hours: diffHours });
    } else if (diffDays === 1) {
      return t('dashboard.time.yesterday', 'Yesterday');
    } else {
      return t('dashboard.time.daysAgo', `${diffDays} days ago`, { days: diffDays });
    }
  };

  return {
    getDashboardStats,
    getRecentActivities,
    getSkillProgress,
    formatTimeAgo
  };
}; 