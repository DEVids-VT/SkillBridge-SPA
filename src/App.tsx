import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Assuming this exists
import LoginPage from './pages/LoginPage'; // Assuming this exists
import RegisterPage from './pages/RegisterPage'; // Assuming this exists
// Remove useState, logos, App.css, Button if no longer needed directly here
// Keep Layout import if it exists
import Layout from './components/layout/Layout'; // Import the Layout component
import './App.css'; // Keep if needed for global styles

function App() {
  // Remove useState hook if no longer used
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* Route that uses the Layout component */}
        <Route element={<Layout />}>
          {/* Child routes rendered within the Layout's Outlet */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Add other routes that should have the Header/Footer layout here */}
        </Route>
        
        {/* You can add routes outside the Layout here if needed */}
        {/* e.g., <Route path="/some-other-page" element={<SomeOtherPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
