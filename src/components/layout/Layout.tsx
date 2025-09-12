import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Sidebar as SidebarIcon } from 'lucide-react';
import Sidebar from './Sidebar';
import { useActiveSidebar } from '@/contexts/ActiveSidebarContext';
import { colors } from '@/lib/design-system';

export function Layout() {
  const location = useLocation();
  // Sidebar should be closed by default on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toggle: toggleActiveSidebar } = useActiveSidebar();
  
  // Detect if we're on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  // Update mobile state on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      const wasMobile = isMobile;
      setIsMobile(mobile);
      
      // Only auto-adjust sidebar state when switching between mobile/desktop
      // Don't interfere with manual toggling
      if (wasMobile !== mobile) {
        if (!mobile) {
          // Switching to desktop - open sidebar
          setSidebarOpen(true);
        } else {
          // Switching to mobile - close sidebar
          setSidebarOpen(false);
        }
      }
    };
    
    // Set initial state only on first load
    const isInitialLoad = isMobile === (window.innerWidth < 1024);
    if (!isInitialLoad) {
      handleResize();
    } else {
      // Initial load - set appropriate state
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]); // Only depend on isMobile, not sidebarOpen

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
    // Use functional update to avoid stale state issues
    setSidebarOpen(prevState => !prevState);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden font-rubik" style={{ backgroundColor: colors.bgSlate900 }}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar} 
        onCollapse={handleSidebarCollapse} 
      />

      {/* Main Content Area */}
      <div 
        className={`flex flex-col flex-1 h-screen overflow-hidden transition-all duration-300 ${
          !isMobile && (sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64')
        }`}
      >
        {/* Mobile Menu Toggle - Only visible on mobile */}
        <div className="sticky top-0 z-10 lg:hidden p-4 bg-background/80 backdrop-blur-lg border-b border-border/40">
          <div className="flex items-center justify-between">
            {/* Left side - Main menu toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                toggleSidebar();
              }} 
              aria-label="Toggle main menu"
              className="hover:bg-slate-800"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            {/* Center - Logo */}
            <div className="flex items-center">
              <img src="/images/horasussvoeniruce.png" alt="SkillBridge" className="h-8" />
              <span className="ml-2 font-semibold text-white">SkillBridge</span>
            </div>
            
            {/* Right side - ActiveSidebar Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-800"
              onClick={toggleActiveSidebar}
              aria-label="Toggle active sidebar"
            >
              <SidebarIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <main
          className="flex-1 md:m-2 md:rounded-xl overflow-y-auto overscroll-y-contain"
          data-lenis-prevent
          data-lenis-prevent-wheel
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
