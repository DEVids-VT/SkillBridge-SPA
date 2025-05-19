import { RouterProvider } from 'react-router-dom';
import { router } from './App.router'; // Import the router configuration
import LenisProvider from './components/LenisProvider'; // Import LenisProvider
import './App.css'; // Keep if needed for global styles
import AuthorizeRoute from './components/authorize-route/AuthorizeRoute';
import Auth0Provider from './components/auth-provider/Auth0Provider';

function App() {
  return (
    <Auth0Provider>
      <LenisProvider>
        <RouterProvider router={router} />
      </LenisProvider>
    </Auth0Provider>
  );
}

export default App;
