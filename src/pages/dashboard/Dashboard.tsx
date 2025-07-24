import { Outlet } from 'react-router-dom';
import { ActiveSidebar, ProjectsList } from './components';
import { colors } from '@/lib/design-system';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation('landing');
  
  return (
    <div className="min-h-screen flex relative" style={{ backgroundColor: colors.dark }}>
      {/* Left Sidebar - Responsive */}
      <ActiveSidebar title={t('activeProjects', 'Active projects')}>
        <ProjectsList />
      </ActiveSidebar>
      
      {/* Main Content Area */}
      <div 
        className="flex-1 relative z-10 overflow-y-auto" 
        style={{ 
          overscrollBehavior: 'contain',
          isolation: 'isolate' 
        }}
      >
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
