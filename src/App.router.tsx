import { createBrowserRouter, createRoutesFromChildren, Route, Navigate } from 'react-router-dom';
import { RoutePage } from './types/enums/RoutePage';
import LandingPage from './pages/LandingPage';
import ProjectBoard from './pages/ProjectsBoard';
import CoursesPage from './pages/CoursesPage';
import EventsPage from './pages/EventsPage';
import CompaniesPage from './pages/CompaniesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import Layout from './components/layout/Layout';
import WelcomeLayout from './pages/welcome/WelcomeLayout';
import AuthorizeRoute from './components/authorize-route/AuthorizeRoute';

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
              <ProjectBoard />
            </AuthorizeRoute>
          }
        />
        <Route path={RoutePage.COURSES} element={<CoursesPage />} />
        <Route path={RoutePage.EVENTS} element={<EventsPage />} />
        <Route path={RoutePage.COMPANIES} element={<CompaniesPage />} />
        <Route path={RoutePage.ABOUT} element={<AboutPage />} />
        {/* Auth routes */}
        <Route path={RoutePage.LOGIN} element={<LoginPage />} />
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
