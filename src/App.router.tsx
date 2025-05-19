import { createBrowserRouter, createRoutesFromChildren, Route, Navigate } from 'react-router-dom';
import { RoutePage } from './types/enums/RoutePage';
import App from './App';
import LandingPage from './pages/LandingPage';
import ProjectBoard from './pages/ProjectsBoard';
import CoursesPage from './pages/CoursesPage';
import EventsPage from './pages/EventsPage';
import CompaniesPage from './pages/CompaniesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectPage from './pages/ProjectPage'; // TODO: Remove this
import Layout from './components/layout/Layout';
import AuthorizeRoute from './components/authorize-route/AuthorizeRoute';

export const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path={RoutePage.HOME} element={<Layout />}>
      {/* Main routes */}
      <Route index element={<LandingPage />} />
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
      <Route path={RoutePage.DETAILS} element={<ProjectPage />} /> //TODO: Remove

      {/* Auth routes */}
      <Route path={RoutePage.LOGIN} element={<LoginPage />} />
      <Route path={RoutePage.REGISTER} element={<RegisterPage />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to={RoutePage.HOME} replace />} />
    </Route>
  )
);
