import { createBrowserRouter, createRoutesFromChildren, Route, Navigate } from 'react-router-dom';
import { RoutePage } from './types/enums/RoutePage';
import Dashboard from './pages/dashboard/Dashboard';
import CompaniesPage from './pages/companies/CompaniesPage.tsx';
import AboutPage from './pages/about/AboutPage.tsx';
import WelcomePage from './pages/welcome/WelcomePage';
import Layout from './components/layout/Layout';
import WelcomeLayout from './pages/welcome/WelcomeLayout';
import OnboardingGuard from './components/authorize-route/OnboardingGuard';
import RoleGuard from './components/authorize-route/RoleGuard';
import ProjectsBoardPage from './pages/projects/ProjectsBoardPage.tsx';
import ProjectPage from './pages/projects/ProjectPage.tsx';
import DescribeCandidatePage from './pages/candidate/DescribeCandidatePage';
import CompanyProfilePage from './pages/company/CompanyProfilePage';
import CandidateProfilePage from './pages/candidate/CandidateProfilePage';

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
        {/* Main routes */}
        <Route index element={<Dashboard />} />{' '}
        <Route path={RoutePage.PROJECTS} element={<ProjectsBoardPage />} />
        <Route path={RoutePage.PROJECT_DETAIL} element={<ProjectPage />} />{' '}
        <Route path={RoutePage.COMPANIES} element={<CompaniesPage />} />
        <Route path={RoutePage.ABOUT} element={<AboutPage />} />
        <Route path={RoutePage.DESCRIBE_CANDIDATE} element={<DescribeCandidatePage />} />
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
      </Route>
    </>
  )
);
