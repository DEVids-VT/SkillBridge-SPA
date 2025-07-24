import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  User,
  Plus,
  FolderOpen,
  Building2,
  Info,
  Home,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useOnboarding } from '@/contexts/OnboardingContext.tsx';
import { RoutePage } from '@/types/enums/RoutePage';
import { cn } from '@/lib/utils';
import { sidebar } from '@/lib/design-system';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({ isOpen, onToggle, onCollapse }: SidebarProps) {
  const { t, i18n } = useTranslation('header');
  const location = useLocation();
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const { onboardingData } = useOnboarding();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Determine if we're on mobile based on viewport width
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  // Track previous path for route change detection
  const prevPathRef = useRef(location.pathname);

  // Current language
  const currentLanguage = i18n.language || 'en';
  const isEnglish = currentLanguage.startsWith('en');

  // Check if the user has completed onboarding
  const hasCompletedOnboarding = isAuthenticated && onboardingData.completed;

  // Get the appropriate profile route and icon based on user role
  const getProfileInfo = () => {
    if (onboardingData.role === 'company') {
      return {
        route: RoutePage.COMPANY_PROFILE,
        icon: LayoutDashboard,
        label: t('headerComponent.navigation.companyProfile'),
      };
    } else if (onboardingData.role === 'candidate') {
      return {
        route: RoutePage.CANDIDATE_PROFILE,
        icon: User,
        label: t('headerComponent.navigation.candidateProfile'),
      };
    }
    return null;
  };
  const profileInfo = getProfileInfo();

  // Function to toggle between English and Bulgarian
  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'bg' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  // Function to toggle sidebar collapse state
  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapse) {
      onCollapse(newCollapsedState);
    }
  };
  
  // Handle manual toggle
  const handleToggle = () => {
    onToggle();
  };

  // Define navigation items based on authentication state and onboarding completion
  const getNavigationItems = () => {
    const baseItems = [
      {
        to: '/',
        label: 'Dashboard',
        icon: Home,
        requiresAuth: true,
        requiresOnboarding: true,
      },
    ];

    const authItems =
      isAuthenticated && hasCompletedOnboarding
        ? [
            {
              to: '/create',
              label: 'Create',
              icon: Plus,
              requiresAuth: true,
              requiresOnboarding: true,
            },
            {
              to: '/projects',
              label: t('headerComponent.navigation.projects'),
              icon: FolderOpen,
              requiresAuth: true,
              requiresOnboarding: true,
            },
            {
              to: '/companies',
              label: t('headerComponent.navigation.partners'),
              icon: Building2,
              requiresAuth: false,
              requiresOnboarding: false,
            },
            {
              to: '/about',
              label: t('headerComponent.navigation.about'),
              icon: Info,
              requiresAuth: false,
              requiresOnboarding: false,
            },
          ]
        : [
            {
              to: '/companies',
              label: t('headerComponent.navigation.partners'),
              icon: Building2,
              requiresAuth: false,
              requiresOnboarding: false,
            },
            {
              to: '/about',
              label: t('headerComponent.navigation.about'),
              icon: Info,
              requiresAuth: false,
              requiresOnboarding: false,
            },
          ];

    return [...baseItems, ...authItems];
  };

  const navigationItems = getNavigationItems();

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    // Only close if we're on mobile and the route actually changed (not just opening the sidebar)
    if (
      isMobile && 
      isOpen && 
      prevPathRef.current !== location.pathname &&
      prevPathRef.current !== location.pathname // Prevent closing on first load
    ) {
      // Small delay to ensure navigation completes
      const timer = setTimeout(() => {
        if (isMobile && isOpen) {
          onToggle();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
    
    // Update the previous path after the check
    prevPathRef.current = location.pathname;
  }, [location.pathname, isOpen, isMobile, onToggle]);

  const isActiveRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Animation variants for framer-motion
  const sidebarVariants = {
    expanded: {
      width: '16rem', // 64 * 0.25 = 16rem
      transition: {
        duration: 0.15,
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
      },
    },
    collapsed: {
      width: '5rem', // Collapsed width
      transition: {
        duration: 0.15,
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
      },
    },
  };

  const textVariants = {
    visible: {
      opacity: 1,
      x: 0,
      display: 'inline-block',
      transition: {
        delay: 0.05,
        duration: 0.12,
      },
    },
    hidden: {
      opacity: 0,
      x: -10,
      transitionEnd: {
        display: 'none',
      },
      transition: {
        duration: 0.1,
      },
    },
  };

  // Update isMobile state when window resizes
  useEffect(() => {
    const handleResize = () => {
      const newMobileState = window.innerWidth < 1024;
      console.log('Mobile state changed:', { 
        windowWidth: window.innerWidth, 
        isMobile: newMobileState,
        sidebarOpen: isOpen 
      });
      setIsMobile(newMobileState);
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen flex flex-col transform bg-slate-900 border-r border-slate-700',
          isMobile ? 'mobile-sidebar' : '',
          isMobile 
            ? isOpen ? 'translate-x-0' : '-translate-x-full'
            : 'translate-x-0'
        )}
        variants={!isMobile ? sidebarVariants : undefined}
        animate={!isMobile ? (isCollapsed ? 'collapsed' : 'expanded') : undefined}
        initial={false}
        style={isMobile ? { width: isOpen ? '100%' : '0' } : undefined}
        transition={isMobile ? { 
          duration: 0.25, 
          type: "spring",
          stiffness: 300,
          damping: 25
        } : undefined}
      >
        {/* Sidebar Header */}
        <div className={cn(sidebar.sections.header, 'justify-between', 'px-4 lg:px-6')}>
          <div className="flex items-center min-w-0 flex-1">
            <Link to="/" className={sidebar.buttons.logo} style={{ textDecoration: 'none' }}>
              <img src="/images/horasussvoeniruce.png" alt={t('headerComponent.logo.alt')} className="h-8" />
            </Link>
            <motion.span
              variants={textVariants}
              animate={isCollapsed && !isMobile ? 'hidden' : 'visible'}
              className="ml-2 font-semibold text-white truncate"
            >
              SkillBridge
            </motion.span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0"> 
            {/* Collapse button - only visible on desktop */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-white hover:bg-slate-800"
              onClick={toggleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>

            {/* Close button for mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden !text-white !bg-red-500 hover:!bg-red-600 focus:!bg-red-600 !p-2 !min-w-0 !h-auto" 
              onClick={handleToggle}
              aria-label="Close sidebar"
              style={{ 
                backgroundColor: '#ef4444', 
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                padding: '8px',
                minWidth: '40px',
                height: '40px'
              }}
            >
              <X className="h-6 w-6" style={{ color: 'white' }} />
            </Button>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className={cn(sidebar.sections.navigation)}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  sidebar.navigation.base,
                  active ? sidebar.navigation.active : sidebar.navigation.default,
                  isCollapsed && !isMobile && 'justify-center'
                )}
                style={{ textDecoration: 'none' }}
                title={isCollapsed && !isMobile ? item.label : undefined}
                onClick={() => {
                  if (isMobile) {
                    // Only close the sidebar if navigating to a different route
                    if (location.pathname !== item.to) {
                      // Small delay to allow navigation to happen first
                      setTimeout(() => {
                        handleToggle();
                      }, 150);
                    }
                  }
                }}
              >
                <Icon className={sidebar.navigation.icon} />
                <motion.span
                  variants={textVariants}
                  animate={isCollapsed && !isMobile ? 'hidden' : 'visible'}
                >
                  {item.label}
                </motion.span>
              </Link>
            );
          })}

          {/* Profile Section */}
          {hasCompletedOnboarding && profileInfo && (
            <div className={sidebar.sections.profile}>
              <motion.p
                className={sidebar.sections.profileTitle}
                variants={textVariants}
                animate={isCollapsed && !isMobile ? 'hidden' : 'visible'}
              >
                Profile
              </motion.p>
              <Link
                to={profileInfo.route}
                className={cn(
                  sidebar.navigation.base,
                  isActiveRoute(profileInfo.route)
                    ? sidebar.navigation.active
                    : sidebar.navigation.default,
                  isCollapsed && !isMobile && 'justify-center'
                )}
                style={{ textDecoration: 'none' }}
                title={isCollapsed && !isMobile ? profileInfo.label : undefined}
                onClick={() => {
                  if (isMobile) {
                    // Only close the sidebar if navigating to a different route
                    if (location.pathname !== profileInfo.route) {
                      // Small delay to allow navigation to happen first
                      setTimeout(() => {
                        handleToggle();
                      }, 150);
                    }
                  }
                }}
              >
                <profileInfo.icon className={sidebar.navigation.icon} />
                <motion.span
                  variants={textVariants}
                  animate={isCollapsed && !isMobile ? 'hidden' : 'visible'}
                >
                  {profileInfo.label}
                </motion.span>
              </Link>
            </div>
          )}
        </nav>

        {/* Bottom Section - Fixed at bottom */}
        <div className={sidebar.sections.bottom}>
          {/* Language Switcher */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(sidebar.buttons.secondary, isCollapsed && !isMobile && 'justify-center')}
            onClick={toggleLanguage}
            title={isCollapsed && !isMobile ? (isEnglish ? 'English' : 'Bulgarian') : undefined}
          >
            <Settings className={sidebar.navigation.icon} />
            <motion.span
              variants={textVariants}
              animate={isCollapsed && !isMobile ? 'hidden' : 'visible'}
            >
              {isEnglish
                ? t('headerComponent.language.english')
                : t('headerComponent.language.bulgarian')}
            </motion.span>
          </Button>

          {/* Auth Controls */}
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              className={cn(sidebar.buttons.danger, isCollapsed && !isMobile && 'justify-center')}
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              title={isCollapsed && !isMobile ? 'Logout' : undefined}
            >
              <LogOut className={sidebar.navigation.icon} />
              <motion.span
                variants={textVariants}
                animate={isCollapsed && !isMobile ? 'hidden' : 'visible'}
              >
                {t('headerComponent.navigation.logout')}
              </motion.span>
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              className={sidebar.buttons.primary}
              onClick={() => loginWithRedirect()}
            >
              <motion.span
                variants={textVariants}
                animate={isCollapsed && !isMobile ? 'hidden' : 'visible'}
              >
                {t('headerComponent.navigation.login')}
              </motion.span>
              {isCollapsed && !isMobile && <LogOut className={sidebar.navigation.icon} />}
            </Button>
          )}
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;
