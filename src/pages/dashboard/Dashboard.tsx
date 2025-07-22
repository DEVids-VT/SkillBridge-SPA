import { Outlet } from 'react-router-dom';
import { ActiveSidebar, ProjectsList } from './components';
import { colors } from '@/lib/design-system';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation('landing');
  
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.dark }}>
      {/* Left Sidebar - Sticky Content */}
      <div className="w-80 flex-shrink-0 bg-slate-900 border-r border-slate-700">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <ActiveSidebar title={t('activeProjects', 'Active projects')}>
            <ProjectsList />
          </ActiveSidebar>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
