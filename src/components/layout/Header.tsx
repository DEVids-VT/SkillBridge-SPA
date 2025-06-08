import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Menu, X, LayoutDashboard, User, Plus } from 'lucide-react';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useOnboarding } from '@/contexts/OnboardingContext.tsx';
import { RoutePage } from '@/types/enums/RoutePage';

export function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        label: t('companyProfile', 'Company Profile'),
      };
    } else if (onboardingData.role === 'candidate') {
      return {
        route: RoutePage.CANDIDATE_PROFILE,
        icon: User,
        label: t('candidateProfile', 'Candidate Profile'),
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
          { to: '/projects', label: t('Find a job', 'Започни работа') },
          { to: '/courses', label: t('Courses', 'Обучения') },
          { to: '/companies', label: t('Partners', 'Партньори') },
          { to: '/about', label: t('About SkillBridge', 'За SkillBridge') },
        ]
      : // Show only About and Partners links to non-authenticated users
        [
          { to: '/companies', label: t('Partners', 'Партньори') },
          { to: '/about', label: t('About SkillBridge', 'За SkillBridge') },
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
      <div className="w-full bg-blue-600 text-white py-2 text-center font-medium flex items-center justify-center gap-2">
        <span>{isEnglish ? 'SkillBridge ' : 'SkillBridge '}</span>
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-extrabold bg-white text-blue-700 transform -rotate-6 border-2 border-white shadow-md relative hover:scale-110 transition-transform duration-300 animate-pulse">
          <span className="absolute inset-0 rounded-md border border-blue-300 opacity-50"></span>
          <span className="relative z-10 tracking-wider">BETA</span>
        </span>
        <span>
          {isEnglish ? ' - Try now completely free!' : ' - Изпробвай сега напълно безплатно!'}
        </span>
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
              {/* Logo image */}
              <img src="/images/sblogosmall.svg" alt="SkillBridge" className="h-8" />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
              {isEnglish ? 'EN' : 'БГ'}
            </Button>{' '}
            {/* Auth Controls */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {' '}
                {/* Profile button - only shown if onboarding is complete and role-specific */}{' '}
                {/* Post New Project button - only visible for companies */}{' '}
                {hasCompletedOnboarding && isCompany && (
                  <Link to={RoutePage.DESCRIBE_CANDIDATE}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-blue-500 text-blue-600"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        {t('postNewProject', 'Post New Project')}
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
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  {t('logout', 'Излез')}
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                onClick={() => loginWithRedirect()}
              >
                {t('createProfile', 'Влез')}
              </Button>
            )}
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
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
                  to={RoutePage.DESCRIBE_CANDIDATE}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('postNewProject', 'Post New Project')}
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
