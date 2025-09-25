import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * Theme types supported by the application
 * 
 * @example
 * // Adding a new theme:
 * // 1. Add the theme name to this type
 * // 2. Add theme tokens to the themes object in ThemeProvider
 * // 3. Add CSS variables for the theme in index.css
 * // 4. Update the theme dropdown options
 */
export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark'; // The actual theme being applied (resolves 'system')
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme tokens for each supported theme
 * 
 * Each theme must define all the tokens listed below. The ThemeProvider
 * automatically converts these tokens to CSS variables that are applied
 * to the document root.
 * 
 * To add a new theme:
 * 1. Add the theme name to the Theme type above
 * 2. Add theme tokens here following the same structure
 * 3. Update the theme dropdown in CandidateSystemSection.tsx
 * 4. Test the theme with all components
 * 
 * Token Reference:
 * - background/foreground: Main page background and text
 * - card/cardForeground: Card components background and text
 * - popover/popoverForeground: Dropdowns, tooltips, etc.
 * - primary/primaryForeground: Main action buttons and links
 * - secondary/secondaryForeground: Secondary actions
 * - muted/mutedForeground: Disabled or less important content
 * - accent/accentForeground: Highlights and accents
 * - destructive: Error states and destructive actions
 * - border/input: Borders and form inputs
 * - ring: Focus rings and outlines
 * - chart1-5: Chart and data visualization colors
 * - sidebar*: Sidebar-specific colors
 */
const themes = {
  light: {
    // Light theme tokens - modern, clean interface with better contrast
    background: '#fefefe',
    foreground: '#1a1a1a',
    card: '#ffffff',
    cardForeground: '#1a1a1a',
    popover: '#ffffff',
    popoverForeground: '#1a1a1a',
    primary: '#2563eb',
    primaryForeground: '#ffffff',
    secondary: '#f8fafc',
    secondaryForeground: '#374151',
    muted: '#f1f5f9',
    mutedForeground: '#6b7280',
    accent: '#f59e0b',
    accentForeground: '#ffffff',
    destructive: '#dc2626',
    border: '#e5e7eb',
    input: '#f3f4f6',
    ring: '#2563eb',
    chart1: '#2563eb',
    chart2: '#7c3aed',
    chart3: '#f59e0b',
    chart4: '#059669',
    chart5: '#dc2626',
    sidebar: '#ffffff',
    sidebarForeground: '#374151',
    sidebarPrimary: '#2563eb',
    sidebarPrimaryForeground: '#ffffff',
    sidebarAccent: '#f59e0b',
    sidebarAccentForeground: '#ffffff',
    sidebarBorder: '#e5e7eb',
    sidebarRing: '#2563eb',
  },
  dark: {
    // Dark theme tokens - current design system colors
    background: '#000814',
    foreground: '#ffffff',
    card: '#001d3d',
    cardForeground: '#ffffff',
    popover: '#001d3d',
    popoverForeground: '#ffffff',
    primary: '#003566',
    primaryForeground: '#ffd60a',
    secondary: '#001d3d',
    secondaryForeground: '#ffd60a',
    muted: '#003566',
    mutedForeground: '#ffd60a',
    accent: '#ffc300',
    accentForeground: '#001d3d',
    destructive: '#ff4d4f',
    border: '#003566',
    input: '#003566',
    ring: '#ffd60a',
    chart1: '#003566',
    chart2: '#001d3d',
    chart3: '#ffc300',
    chart4: '#ffd60a',
    chart5: '#ffffff',
    sidebar: '#001d3d',
    sidebarForeground: '#ffd60a',
    sidebarPrimary: '#003566',
    sidebarPrimaryForeground: '#ffd60a',
    sidebarAccent: '#ffc300',
    sidebarAccentForeground: '#001d3d',
    sidebarBorder: '#003566',
    sidebarRing: '#ffd60a',
  },
} as const;

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * ThemeProvider component that manages theme state and applies theme changes globally
 * 
 * Features:
 * - Supports light, dark, and system themes
 * - Persists theme selection in localStorage
 * - Automatically detects system theme preference
 * - Applies theme changes to CSS variables
 * - Provides theme context to all child components
 * 
 * @param children - React components to wrap with theme context
 * @param defaultTheme - Default theme to use if none is stored (default: 'system')
 * @param storageKey - localStorage key for persisting theme (default: 'skillbridge-theme')
 */
export function ThemeProvider({ 
  children, 
  defaultTheme = 'system',
  storageKey = 'skillbridge-theme'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
      setThemeState(storedTheme);
    }
  }, [storageKey]);

  // Resolve system theme and apply CSS variables
  useEffect(() => {
    const resolveTheme = (): 'light' | 'dark' => {
      if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return theme as 'light' | 'dark';
    };

    const currentResolvedTheme = resolveTheme();
    setResolvedTheme(currentResolvedTheme);

    // Apply theme to CSS variables
    const themeTokens = themes[currentResolvedTheme];
    const root = document.documentElement;

    // Apply CSS variables
    Object.entries(themeTokens).forEach(([key, value]) => {
      const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });

    // Apply dark class for Tailwind dark mode
    if (currentResolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Listen for system theme changes when using 'system' theme
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const newResolvedTheme = resolveTheme();
        setResolvedTheme(newResolvedTheme);
        
        // Reapply theme tokens
        const themeTokens = themes[newResolvedTheme];
        Object.entries(themeTokens).forEach(([key, value]) => {
          const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
          root.style.setProperty(cssVarName, value);
        });

        // Update dark class
        if (newResolvedTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * 
 * @returns Theme context with current theme, setter, and resolved theme
 * @throws Error if used outside of ThemeProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme, resolvedTheme } = useTheme();
 *   
 *   return (
 *     <button onClick={() => setTheme('dark')}>
 *       Current theme: {theme} (resolved: {resolvedTheme})
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
