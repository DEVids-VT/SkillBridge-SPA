import { useTranslation } from 'react-i18next';
import { spacing, typography, layouts, cards, colors, components } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useDashboard } from './useDashboard';
import { 
  TrendingUp, 
  FolderOpen, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  BookOpen,
  Target,
  Calendar,
  Star,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();
  const { getDashboardStats, getRecentActivities, getSkillProgress, formatTimeAgo } = useDashboard();

  const stats = getDashboardStats();
  const recentActivities = getRecentActivities();
  const skillProgress = getSkillProgress();

  return (
    <div className="min-h-screen bg-[#000814]">
      <div className={`${spacing.container} ${spacing.section}`}>
        {/* Header */}
        <div className={layouts.pageHeader}>
          <h1 className={`${typography.heading[1]} mb-4`}>
            Welcome Back, <span style={{ color: colors.yellow }}>Developer</span>
          </h1>
          <p className={typography.body.lg}>
            Track your progress, manage projects, and continue building your career
          </p>
        </div>

        {/* Stats Cards */}
        <div className={`${layouts.grid.cards4} mb-12`}>
          <div className={cards.base}>
            <div className={cards.body}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={typography.body.sm}>Total Projects</p>
                  <h3 className={`${typography.heading[2]} mt-1`}>{stats.totalProjects}</h3>
                </div>
                <FolderOpen size={32} style={{ color: colors.yellow }} />
              </div>
            </div>
          </div>

          <div className={cards.base}>
            <div className={cards.body}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={typography.body.sm}>Completed</p>
                  <h3 className={`${typography.heading[2]} mt-1`}>{stats.completedProjects}</h3>
                </div>
                <CheckCircle2 size={32} style={{ color: colors.yellow }} />
              </div>
            </div>
          </div>

          <div className={cards.base}>
            <div className={cards.body}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={typography.body.sm}>Active Projects</p>
                  <h3 className={`${typography.heading[2]} mt-1`}>{stats.activeProjects}</h3>
                </div>
                <Clock size={32} style={{ color: colors.orange }} />
              </div>
            </div>
          </div>

          <div className={cards.base}>
            <div className={cards.body}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={typography.body.sm}>Total Earnings</p>
                  <h3 className={`${typography.heading[2]} mt-1`}>${stats.totalEarnings.toLocaleString()}</h3>
                </div>
                <DollarSign size={32} style={{ color: colors.yellow }} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={layouts.grid.cards2}>
          {/* Recent Activity */}
          <div className={cards.base}>
            <div className={cards.header}>
              <h3 className={typography.heading[3]}>Recent Activity</h3>
            </div>
            <div className={cards.body}>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-[#000814]/50">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <h4 className={`${typography.heading[5]} mb-1`}>{activity.title}</h4>
                      <p className={typography.body.sm}>{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={cards.footer}>
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </div>
          </div>

          {/* Skill Progress */}
          <div className={cards.base}>
            <div className={cards.header}>
              <h3 className={typography.heading[3]}>Skill Progress</h3>
            </div>
            <div className={cards.body}>
              <div className="space-y-6">
                {skillProgress.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className={typography.heading[5]}>{skill.name}</h4>
                        <Badge className={components.tagColors.blue}>{skill.category}</Badge>
                      </div>
                      <span className={typography.body.sm}>{skill.progress}%</span>
                    </div>
                    <Progress 
                      value={skill.progress} 
                      className="h-2 bg-[#001d3d]"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={cards.footer}>
              <Button variant="outline" className="w-full">
                View Learning Path
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className={`${typography.heading[2]} mb-8 text-center`}>Quick Actions</h2>
          <div className={layouts.grid.cards3}>
            <Button 
              size="lg" 
              className="h-24 flex-col gap-2 bg-[#003566] hover:bg-[#ffc300] hover:text-[#001d3d] transition-all duration-300"
            >
              <BookOpen size={24} />
              Browse Projects
            </Button>
            <Button 
              size="lg" 
              className="h-24 flex-col gap-2 bg-[#003566] hover:bg-[#ffc300] hover:text-[#001d3d] transition-all duration-300"
            >
              <Target size={24} />
              Set Goals
            </Button>
            <Button 
              size="lg" 
              className="h-24 flex-col gap-2 bg-[#003566] hover:bg-[#ffc300] hover:text-[#001d3d] transition-all duration-300"
            >
              <Calendar size={24} />
              Schedule Learning
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 