import { RouterProvider } from 'react-router-dom';
import { router } from './App.router'; // Import the router configuration
import LenisProvider from './components/LenisProvider'; // Import LenisProvider
import './App.css'; // Keep if needed for global styles
import Auth0Provider from './components/auth-provider/Auth0Provider';
import { OnboardingProvider } from './contexts/OnboardingContext';
import QueryClientProvider from './components/query-client-provider/QueryClientProvider';

function App() {
  return (
    <Auth0Provider>
      <QueryClientProvider>
        <OnboardingProvider>
          <LenisProvider>
            <RouterProvider router={router} />
          </LenisProvider>
        </OnboardingProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
}

export default App;
