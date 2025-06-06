import { createBrowserRouter, createRoutesFromChildren, Route, Navigate } from 'react-router-dom';
import { RoutePage } from './types/enums/RoutePage';
import LandingPage from './pages/landing/LandingPage';
import CoursesPage from './pages/courses/CoursesPage.tsx';
import EventsPage from './pages/events';
import CompaniesPage from './pages/companies/CompaniesPage.tsx';
import AboutPage from './pages/about/AboutPage.tsx';
import WelcomePage from './pages/welcome/WelcomePage';
import Layout from './components/layout/Layout';
import WelcomeLayout from './pages/welcome/WelcomeLayout';
import AuthorizeRoute from './components/authorize-route/AuthorizeRoute';
import ProjectsBoardPage from './pages/projects/ProjectsBoardPage.tsx';
import ProjectPage from './pages/projects/ProjectPage.tsx';

export const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path={RoutePage.HOME} element={<Layout />}>
        {/* Main routes */}
        <Route index element={<LandingPage />} />{' '}
        <Route
          path={RoutePage.PROJECTS}
          element={
            <AuthorizeRoute>
              <ProjectsBoardPage />
            </AuthorizeRoute>
          }
        />
        <Route
          path={RoutePage.PROJECT_DETAIL}
          element={
            <AuthorizeRoute>
              <ProjectPage />
            </AuthorizeRoute>
          }
        />
        <Route path={RoutePage.COURSES} element={<CoursesPage />} />
        <Route path={RoutePage.EVENTS} element={<EventsPage />} />
        <Route path={RoutePage.COMPANIES} element={<CompaniesPage />} />
        <Route path={RoutePage.ABOUT} element={<AboutPage />} />
        {/* Auth routes */}
        {/* Fallback route */}
        <Route path="*" element={<Navigate to={RoutePage.HOME} replace />} />
      </Route>
      <Route path={RoutePage.WELCOME} element={<WelcomeLayout />}>
        <Route
          index
          element={
            <AuthorizeRoute>
              <WelcomePage />
            </AuthorizeRoute>
          }
        />
      </Route>
    </>
  )
);
