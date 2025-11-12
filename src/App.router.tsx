import { createBrowserRouter, createRoutesFromChildren, Route, Navigate } from 'react-router-dom';
import { RoutePage } from './types/enums/RoutePage';
import Dashboard from './layouts/dashboard-layout/DashboardLayout.tsx';
import { CompanyProjectDetailPage } from './pages/company-projects';
import WelcomePage from './pages/welcome/WelcomePage';
import CreateCandidateProfilePage from './pages/welcome/CreateCandidateProfilePage';
import WelcomeLayout from './pages/welcome/WelcomeLayout';
import OnboardingGuard from './components/authorize-route/OnboardingGuard';
import RoleGuard from './components/authorize-route/RoleGuard';
import ProjectsBoardPage from './pages/projects/ProjectsBoardPage.tsx';
import ProjectPage from './pages/project/Project.tsx';
import { CreatePage, CreatePersonaPage, CreateManualPage } from './pages/create';
import CompanyProfilePage from './pages/company/CompanyProfilePage';
import CandidateProfilePage from './pages/candidate/CandidateProfilePage';
import { DashboardWelcome } from './pages/dashboard-welcome/DashboardWelcome.tsx';
import { DashboardProjectDetails } from './pages/dashboard-project-details/DashboardProjectDetails.tsx';
import Layout from './layouts/global-layout/Layout.tsx';

export const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route
        path={RoutePage.HOME}
        element={
          <OnboardingGuard redirectPath={RoutePage.WELCOME}>
            <Layout />
          </OnboardingGuard>
        }
      >
        {/* Dashboard with nested routes */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardWelcome />} />
          <Route path="project/:projectId" element={<DashboardProjectDetails />} />
          <Route path="company/project/:projectId" element={<CompanyProjectDetailPage />} />
        </Route>
        {/* Main routes */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path={RoutePage.PROJECTS} element={<ProjectsBoardPage />} />
        <Route path={RoutePage.PROJECT_DETAIL} element={<ProjectPage />} />{' '}
        {/* Create flow routes */}
        <Route path={RoutePage.CREATE} element={<CreatePage />} />
        <Route path={RoutePage.CREATE_PERSONA} element={<CreatePersonaPage />} />
        <Route path={RoutePage.CREATE_MANUAL} element={<CreateManualPage />} />
        {/* Legacy route - redirect to new create flow */}
        <Route
          path={RoutePage.CREATE_PROJECT}
          element={<Navigate to={RoutePage.CREATE} replace />}
        />
        {/* Profile routes - role-based access */}
        <Route
          path={RoutePage.COMPANY_PROFILE}
          element={
            <RoleGuard allowedRole="company">
              <CompanyProfilePage />
            </RoleGuard>
          }
        />
        <Route
          path={RoutePage.CANDIDATE_PROFILE}
          element={
            <RoleGuard allowedRole="candidate">
              <CandidateProfilePage />
            </RoleGuard>
          }
        />
        {/* Auth routes */}
        {/* Fallback route */}
        <Route path="*" element={<Navigate to={RoutePage.HOME} replace />} />
      </Route>{' '}
      {/* Welcome/onboarding route should be accessible even with incomplete onboarding */}
      <Route path={RoutePage.WELCOME} element={<WelcomeLayout />}>
        <Route index element={<WelcomePage />} />
        <Route
          path="candidate-profile"
          element={
            <CreateCandidateProfilePage onBackToRoleSelection={() => window.history.back()} />
          }
        />
      </Route>
    </>
  )
);
