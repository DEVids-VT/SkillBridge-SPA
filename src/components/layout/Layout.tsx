import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export function Layout() {
  const location = useLocation();
  // Sidebar should be open by default on desktop
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    // Use the smooth scrolling from Lenis if available, otherwise fallback
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: false, duration: 0.8 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen font-rubik">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 lg:ml-64 min-h-screen">
        {/* Mobile Menu Toggle - Only visible on mobile */}
        <div className="lg:hidden p-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
