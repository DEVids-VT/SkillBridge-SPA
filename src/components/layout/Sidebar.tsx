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
} from 'lucide-react';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useOnboarding } from '@/contexts/OnboardingContext.tsx';
import { RoutePage } from '@/types/enums/RoutePage';
import { cn } from '@/lib/utils';
import { sidebar } from '@/lib/design-system';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { t, i18n } = useTranslation('header');
  const location = useLocation();
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const { onboardingData } = useOnboarding();

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
    if (isOpen) {
      // Only close on mobile (when window width is below lg breakpoint)
      const handleRouteChange = () => {
        if (window.innerWidth < 1024) {
          onToggle();
        }
      };

      handleRouteChange();
    }
  }, [location.pathname, isOpen, onToggle]);

  const isActiveRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className={sidebar.states.overlay} onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={cn(sidebar.container, isOpen ? sidebar.states.open : sidebar.states.closed)}
      >
        {/* Sidebar Header */}
        <div className={sidebar.sections.header}>
          <Link to="/" className={sidebar.buttons.logo} style={{ textDecoration: 'none' }}>
            <img src="/images/horasussvoeniruce.png" alt={t('headerComponent.logo.alt')} className="h-8" />
          </Link>

          {/* Close button for mobile */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onToggle}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation - Scrollable */}
        <nav className={sidebar.sections.navigation}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  sidebar.navigation.base,
                  active ? sidebar.navigation.active : sidebar.navigation.default
                )}
                style={{ textDecoration: 'none' }}
              >
                <Icon className={sidebar.navigation.icon} />
                {item.label}
              </Link>
            );
          })}

          {/* Profile Section */}
          {hasCompletedOnboarding && profileInfo && (
            <div className={sidebar.sections.profile}>
              <p className={sidebar.sections.profileTitle}>Profile</p>
              <Link
                to={profileInfo.route}
                className={cn(
                  sidebar.navigation.base,
                  isActiveRoute(profileInfo.route)
                    ? sidebar.navigation.active
                    : sidebar.navigation.default
                )}
                style={{ textDecoration: 'none' }}
              >
                <profileInfo.icon className={sidebar.navigation.icon} />
                {profileInfo.label}
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
            className={sidebar.buttons.secondary}
            onClick={toggleLanguage}
          >
            <Settings className={sidebar.navigation.icon} />
            {isEnglish
              ? t('headerComponent.language.english')
              : t('headerComponent.language.bulgarian')}
          </Button>

          {/* Auth Controls */}
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              className={sidebar.buttons.danger}
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              <LogOut className={sidebar.navigation.icon} />
              {t('headerComponent.navigation.logout')}
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              className={sidebar.buttons.primary}
              onClick={() => loginWithRedirect()}
            >
              {t('headerComponent.navigation.login')}
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
