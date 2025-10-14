// Design system constants for consistent theme styling
// This file provides theme-aware design tokens that work with the ThemeProvider

// Legacy color constants for backward compatibility
// These are now replaced by CSS variables from the theme system
const COLOR_DARK = '#000814';
const COLOR_BLUE_DARK = '#001d3d';
const COLOR_BLUE = '#003566';
const COLOR_ORANGE = '#ffc300';
const COLOR_YELLOW = '#ffd60a';
const COLOR_WHITE = '#ffffff';
const COLOR_SLATE = '#0F172B';

// Tailwind Color Constants
const SLATE_900 = 'slate-900';
const SLATE_700 = 'slate-700';
const RED_400 = 'red-400';
const RED_300 = 'red-300';
const RED_900 = 'red-900';
const GRAY_200 = 'gray-200';
const GRAY_300 = 'gray-300';
const GRAY_400 = 'gray-400';
const WHITE = 'white';
const BLACK = 'black';

/**
 * Theme-aware color palette
 * 
 * IMPORTANT: For new components, prefer using CSS variables from the theme system:
 * - Use `bg-background`, `text-foreground`, etc. instead of hardcoded colors
 * - Use Tailwind's theme-aware classes like `bg-primary`, `text-primary-foreground`
 * - Import and use the `useTheme()` hook from '@/contexts/ThemeContext' for theme state
 * 
 * The legacy colors below are maintained for backward compatibility only.
 * 
 * @deprecated Use CSS variables and Tailwind theme classes instead
 * 
 * @example
 * ```tsx
 * // ✅ Good - Theme-aware
 * <div className="bg-background text-foreground border-border">
 *   <button className="bg-primary text-primary-foreground">Click me</button>
 * </div>
 * 
 * // ❌ Avoid - Hardcoded colors
 * <div style={{ backgroundColor: colors.dark, color: colors.white }}>
 *   <button className={`bg-[${colors.orange}] text-[${colors.blueDark}]`}>Click me</button>
 * </div>
 * ```
 */
export const colors = {
  // Legacy colors for backward compatibility
  dark: COLOR_DARK,
  blueDark: COLOR_BLUE_DARK,
  blue: COLOR_BLUE,
  orange: COLOR_ORANGE,
  yellow: COLOR_YELLOW,
  white: COLOR_WHITE,
  bgSlate900: COLOR_SLATE,
  
  // UI Colors - prefer CSS variables for theme support
  background: COLOR_DARK,
  surface: COLOR_BLUE_DARK,
  surfaceLight: COLOR_BLUE,
  accent: COLOR_ORANGE,
  accentHover: '#e6b000',
  text: COLOR_WHITE,
  textSecondary: '#d1d5db',
  textMuted: '#9ca3af',
  border: COLOR_BLUE,
  borderLight: '#374151',
  error: '#ef4444',
  errorHover: '#dc2626',
  success: '#10b981',
  warning: COLOR_ORANGE,
};

// Spacing
export const spacing = {
  container: 'container mx-auto px-4',
  section: 'py-16 md:py-24',
  headerOffset: 'pt-32',
};

// Typography
export const typography = {
  heading: {
    1: `text-5xl md:text-6xl font-bold text-${WHITE}`,
    2: `text-4xl md:text-5xl font-bold text-${WHITE}`,
    3: `text-3xl font-bold text-${WHITE}`,
    4: `text-2xl font-bold text-${WHITE}`,
    5: `text-xl font-semibold text-${WHITE}`,
  },
  sectionTitle: {
    main: `font-playfair text-5xl md:text-6xl font-bold text-${WHITE}`,
    large: `font-playfair text-4xl md:text-5xl font-bold text-${WHITE}`,
    medium: `font-playfair text-3xl font-bold text-${WHITE}`,
    small: `font-playfair text-2xl font-bold text-${WHITE}`,
  },
  body: {
    default: `text-base text-${GRAY_200}`,
    lg: `text-lg text-${GRAY_200}`,
    sm: `text-sm text-${GRAY_400}`,
  },
};

// Layouts
export const layouts = {
  pageHeader: 'text-center mb-16 relative',
  pageHeaderBackground:
    `absolute -top-10 left-0 right-0 h-20 bg-gradient-to-r from-[${COLOR_BLUE_DARK}] to-[${COLOR_BLUE}] rounded-b-3xl -z-10`,
  pageTitle: `${typography.sectionTitle.main} mb-6`,
  pageDescription: `text-lg text-${GRAY_300} max-w-3xl mx-auto mb-10`,
  grid: {
    cards2: 'grid grid-cols-1 md:grid-cols-2 gap-8',
    cards3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    cards4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
  },
};

// Card styles
export const cards = {
  base: `border-2 border-[${COLOR_BLUE}] bg-[${COLOR_BLUE_DARK}] rounded-xl overflow-hidden shadow-sm hover:border-[${COLOR_ORANGE}] transition-colors`,
  header: `p-6 border-b border-[${COLOR_BLUE}]`,
  body: 'p-6',
  footer: `p-6 pt-4 border-t border-[${COLOR_BLUE}] flex items-center justify-between`,
};

// Tag styles
export const components = {
  tag: 'px-3 py-1 rounded-full text-xs font-medium',
  tagColors: {
    blue: `bg-[${COLOR_BLUE}] text-[${COLOR_YELLOW}]`,
    orange: `bg-[${COLOR_ORANGE}] text-[${COLOR_BLUE_DARK}]`,
    yellow: `bg-[${COLOR_YELLOW}] text-[${COLOR_BLUE_DARK}]`,
    white: `bg-${WHITE} text-[${COLOR_BLUE_DARK}]`,
    dark: `bg-[${COLOR_DARK}] text-[${COLOR_YELLOW}]`,
  },
};

// Sidebar design system - Updated for theme compatibility
export const sidebar = {
  // Base sidebar styles - now theme-aware
  container:
    'fixed left-0 top-0 z-50 h-screen w-64 flex flex-col transform lg:translate-x-0 bg-sidebar border-r border-sidebar-border',

  // Navigation link styles - theme-aware
  navigation: {
    base: 'flex items-center gap-4 px-2 py-3 mr-2 rounded-lg text-base font-medium transition-colors no-underline hover:no-underline',
    default: 'text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-foreground',
    active: 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold',
    icon: 'size-5',
  },

  // Button styles for sidebar - theme-aware
  buttons: {
    // Primary action button (Login)
    primary: 'w-full bg-sidebar-primary hover:bg-sidebar-primary/80 text-sidebar-primary-foreground font-medium transition-colors py-3 text-base mr-2',

    // Secondary action button (Language switcher)
    secondary: 'w-full justify-start gap-4 text-sidebar-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-accent/20 transition-colors py-3 text-base mr-2',

    // Danger action button (Logout)
    danger: 'w-full justify-start gap-4 text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors py-3 text-base mr-2',

    // Logo link
    logo: 'flex items-center text-xl font-semibold text-sidebar-foreground no-underline hover:no-underline hover:text-sidebar-primary-foreground transition-colors',
  },

  // Section styles - theme-aware
  sections: {
    header: 'flex h-20 items-center justify-between px-4',
    navigation: 'flex-1 px-4 py-6 space-y-3 overflow-y-auto',
    profile: 'pt-6 mt-6 border-t border-sidebar-border',
    bottom: 'px-4 py-6 border-t border-sidebar-border space-y-3',
    profileTitle: 'px-2 mb-3 text-sm font-semibold text-sidebar-foreground/70 uppercase tracking-wider',
  },

  // State classes - theme-aware
  states: {
    open: 'translate-x-0 w-full lg:w-64',
    closed: '-translate-x-full',
    overlay: 'fixed inset-0 bg-black/50 z-40 lg:hidden',
  },
};
