import { RouterProvider } from 'react-router-dom';
import { router } from './App.router'; // Import the router configuration
import LenisProvider from './components/LenisProvider'; // Import LenisProvider
import './App.css'; // Keep if needed for global styles
import AuthorizeGuard from './components/authorize-route/AuthorizeRoute';
import Auth0Provider from './components/auth-provider/Auth0Provider';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { ActiveSidebarProvider } from './contexts/ActiveSidebarContext';
import QueryClientProvider from './components/query-client-provider/QueryClientProvider';

function App() {
  return (
    <Auth0Provider>
      <AuthorizeGuard>
        <QueryClientProvider>
          <OnboardingProvider>
            <LenisProvider>
              <ActiveSidebarProvider>
                <RouterProvider router={router} />
              </ActiveSidebarProvider>
            </LenisProvider>
          </OnboardingProvider>
        </QueryClientProvider>
      </AuthorizeGuard>
    </Auth0Provider>
  );
}

export default App;
