import { Outlet } from 'react-router-dom';
import { colors } from '@/lib/design-system';
import { useTranslation } from 'react-i18next';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { InnerSidebar } from '@/components/inner-sidebar/InnerSidebar';
import { DashboardSidebarProjectsList } from './components/dashboard-sidebar-candidate-projects-list/DashboardSidebarCandidateProjectsList';
import { DashboardSidebarCompanyProjectsList } from './components/dashboard-sidebar-company-projects-list/DashboardSidebarCompanyProjectsList';

const DashboardLayout = () => {
  const { t } = useTranslation('landing');
  const { onboardingData } = useOnboarding();

  return (
    <div className="flex relative h-full min-h-0" style={{ backgroundColor: colors.bgSlate900 }}>
      {/* Left Sidebar - Responsive */}
      <InnerSidebar title={t('activeProjects', 'Active projects')}>
        {onboardingData.role === 'company' ? (
          <DashboardSidebarCompanyProjectsList />
        ) : (
          <DashboardSidebarProjectsList />
        )}
      </InnerSidebar>

      {/* Main Content Area */}
      <div
        className="flex-1 relative z-10 overflow-y-auto rounded-xl"
        style={{
          overscrollBehavior: 'contain',
          isolation: 'isolate',
          backgroundColor: colors.dark,
        }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
