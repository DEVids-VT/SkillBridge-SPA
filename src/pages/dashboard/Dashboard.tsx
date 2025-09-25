import { Outlet } from 'react-router-dom';
import { ActiveSidebar, ProjectsList } from './components';
import { CompanyProjectsList } from '@/pages/company-projects';
// Removed colors import - now using theme-aware classes
import { useTranslation } from 'react-i18next';
import { useOnboarding } from '@/contexts/OnboardingContext';

const Dashboard = () => {
  const { t } = useTranslation('landing');
  const { onboardingData } = useOnboarding();
  
  return (
    <div className="flex relative h-full min-h-0 bg-background">
      {/* Left Sidebar - Responsive */}
      <ActiveSidebar title={t('activeProjects', 'Active projects')}>
        {onboardingData.role === 'company' ? <CompanyProjectsList /> : <ProjectsList />}
      </ActiveSidebar>
      
      {/* Main Content Area */}
      <div 
        className="flex-1 relative z-10 overflow-y-auto rounded-xl bg-background" 
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
