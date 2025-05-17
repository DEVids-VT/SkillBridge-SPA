import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Assuming this exists
import RegisterPage from './pages/RegisterPage'; // Assuming this exists
import LandingPage from './pages/LandingPage'; // Import the new LandingPage component
import ProjectBoard from './pages/ProjectsBoard'; // Import the new ProjectPage component
import CoursesPage from './pages/CoursesPage'; // Import the CoursesPage component
import EventsPage from './pages/EventsPage'; // Import the EventsPage component
import CompaniesPage from './pages/CompaniesPage'; // Import the CompaniesPage component
import AboutPage from './pages/AboutPage'; // Import the AboutPage component
// Remove useState, logos, App.css, Button if no longer needed directly here
// Keep Layout import if it exists
import Layout from './components/layout/Layout'; // Import the Layout component
import LenisProvider from './components/LenisProvider'; // Import LenisProvider
import './App.css'; // Keep if needed for global styles

function App() {
  // Remove useState hook if no longer used
  // const [count, setCount] = useState(0)

  return (
    <LenisProvider>
      <Router>
        <Routes>
          {/* Route that uses the Layout component */}
          <Route element={<Layout />}>
            {/* Child routes rendered within the Layout's Outlet */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<ProjectBoard />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Add other routes that should have the Header/Footer layout here */}
          </Route>
          
          {/* You can add routes outside the Layout here if needed */}
          {/* e.g., <Route path="/some-other-page" element={<SomeOtherPage />} /> */}
        </Routes>
      </Router>
    </LenisProvider>
  );
}

export default App;
