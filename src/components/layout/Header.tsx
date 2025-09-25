import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Menu, X, LayoutDashboard, User, Plus, Sidebar } from 'lucide-react';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useOnboarding } from '@/contexts/OnboardingContext.tsx';
import { useActiveSidebar } from '@/contexts/ActiveSidebarContext';
import { RoutePage } from '@/types/enums/RoutePage';
// Removed colors import - now using theme-aware classes

export function Header() {
  const { t, i18n } = useTranslation('header');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggle: toggleActiveSidebar } = useActiveSidebar();
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

  // Check if user is a company
  const isCompany = onboardingData.role === 'company';
  // Define navigation items based on authentication state and onboarding completion
  const navItems = [
    // Show all navigation items only to authenticated users who completed onboarding
    ...(isAuthenticated && onboardingData.completed
      ? [
          { to: '/projects', label: t('headerComponent.navigation.projects') },
          { to: '/companies', label: t('headerComponent.navigation.partners') },
          { to: '/about', label: t('headerComponent.navigation.about') },
        ]
      : // Show only About and Partners links to non-authenticated users
        [
          { to: '/companies', label: t('headerComponent.navigation.partners') },
          { to: '/about', label: t('headerComponent.navigation.about') },
        ]),
  ];

  // Function to toggle between English and Bulgarian
  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'bg' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <>
      {/* Beta Announcement Banner */}
      <div className="w-full bg-primary text-primary-foreground">
        <div className="py-2 text-center font-medium flex items-center justify-center gap-2">
          <span>{t('headerComponent.betaBanner.skillbridge')} </span>
          <span
            className="inline-flex items-center px-3 py-1 rounded-md text-xs font-extrabold bg-primary-foreground text-primary transform -rotate-6 border-2 border-primary-foreground shadow-md relative animate-pulse"
          >
            <span
              className="absolute inset-0 rounded-md border border-accent opacity-50"
            ></span>
            <span className="relative z-10 tracking-wider">
              {t('headerComponent.betaBanner.beta')}
            </span>
          </span>
          <span>{t('headerComponent.betaBanner.message')}</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 lg:px-8 flex h-16 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center text-lg font-semibold text-foreground transition-colors hover:text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              {/* Logo image - bigger size */}
              <img
                src="/images/logosmbms.png"
                alt={t('headerComponent.logo.alt')}
                className="h-12 md:h-14"
              />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Controls: Language, Theme, Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* Language Switcher Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium"
              onClick={toggleLanguage}
            >
              {isEnglish
                ? t('headerComponent.language.english')
                : t('headerComponent.language.bulgarian')}
            </Button>{' '}
            {/* Auth Controls */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {' '}
                {/* Profile button - only shown if onboarding is complete and role-specific */}{' '}
                {/* Post New Project button - only visible for companies */}{' '}
                {hasCompletedOnboarding && isCompany && (
                  <Link to={RoutePage.CREATE_PROJECT}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      style={{
                        borderColor: 'var(--color-primary)',
                        color: 'var(--color-primary)',
                        backgroundColor: 'transparent'
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        {t('headerComponent.navigation.postNewProject')}
                      </span>
                    </Button>
                  </Link>
                )}
                {hasCompletedOnboarding && profileInfo && (
                  <Link to={profileInfo.route}>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <profileInfo.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{profileInfo.label}</span>
                    </Button>
                  </Link>
                )}
                <Button
                  variant="default"
                  size="sm"
                  className="text-sm font-medium hover:opacity-80 bg-primary text-primary-foreground border-none"
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  {t('headerComponent.navigation.logout')}
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="text-sm font-medium hover:opacity-80 bg-primary text-primary-foreground border-none"
                onClick={() => loginWithRedirect()}
              >
                {t('headerComponent.navigation.login')}
              </Button>
            )}
            
            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              {/* ActiveSidebar Toggle - only show on dashboard pages */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={toggleActiveSidebar}
                aria-label="Toggle active sidebar"
              >
                <Sidebar className="h-5 w-5" />
              </Button>
              
              {/* Main Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={t('headerComponent.navigation.toggleMenu')}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg">
            <nav className="container mx-auto px-4 lg:px-8 flex flex-col gap-2 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}{' '}
              {/* Post New Project link in mobile menu - only visible for companies */}
              {hasCompletedOnboarding && isCompany && (
                <Link
                  to={RoutePage.CREATE_PROJECT}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium hover:opacity-80 text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('headerComponent.navigation.postNewProject')}
                </Link>
              )}
              {/* Profile link in mobile menu */}
              {hasCompletedOnboarding && profileInfo && (
                <Link
                  to={profileInfo.route}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <profileInfo.icon className="h-4 w-4" />
                  {profileInfo.label}
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
