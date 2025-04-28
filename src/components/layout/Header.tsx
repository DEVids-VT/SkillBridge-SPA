import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useTheme } from "@/providers/ThemeProvider";
// import { Language, useLanguage } from "@/providers/LanguageProvider";
import { Globe, Menu, X, Award } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useTranslation();
  // const { theme, toggleTheme } = useTheme();
  // const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: t("home") },
    { to: "/dashboard", label: t("dashboard") },
    { to: "/login", label: t("login") },
    { to: "/register", label: t("register") },
    // Add more navigation items here
  ];

  // const handleLanguageChange = (lang: string) => {
  //   setLanguage(lang as Language); // Cast string to Language type
  // };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center text-lg font-semibold text-foreground transition-colors hover:text-foreground/80"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* You can replace text with an SVG logo */}
            <Award className="h-6 w-6 mr-2 text-primary" /> 
            <span className="font-bold">{t("appName", "Endorsify")}</span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4">
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
        <div className="flex items-center gap-3">
          {/* Language Switcher Dropdown - Commented out */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t("changeLanguage")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                English {language === 'en' && <span className="ml-2 text-xs text-muted-foreground">(Current)</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("es")}>
                Español {language === 'es' && <span className="ml-2 text-xs text-muted-foreground">(Current)</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* Theme Toggler - Commented out */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={t("toggleTheme")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{t("toggleTheme")}</span>
          </Button> */}

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
          <nav className="container flex flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header; 