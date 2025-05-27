// Design system constants for consistent styling across pages

// Colors
export const colors = {
  primary: {
    50: '#f0f6ff',
    100: '#e0edff',
    500: '#3b82f6', // Main blue
    600: '#2563eb',
    700: '#1d4ed8',
  },
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    500: '#a855f7', // Purple
    600: '#9333ea',
    700: '#7e22ce',
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Spacing
export const spacing = {
  container: 'container mx-auto px-4',
  section: 'py-16 md:py-24',
  headerOffset: 'pt-32', // Space for fixed header
};

// Typography
export const typography = {
  heading: {
    1: 'text-5xl md:text-6xl font-bold',
    2: 'text-4xl md:text-5xl font-bold',
    3: 'text-3xl font-bold',
    4: 'text-2xl font-bold',
    5: 'text-xl font-semibold',
  },
  body: {
    default: 'text-base text-gray-600',
    lg: 'text-lg text-gray-600',
    sm: 'text-sm text-gray-500',
  },
};

// Common layouts
export const layouts = {
  pageHeader: 'text-center mb-16 relative',
  pageHeaderBackground:
    'absolute -top-10 left-0 right-0 h-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-b-3xl -z-10',
  pageTitle: `${typography.heading[1]} mb-6`,
  pageDescription: 'text-lg text-gray-600 max-w-3xl mx-auto mb-10',
  grid: {
    cards2: 'grid grid-cols-1 md:grid-cols-2 gap-8',
    cards3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    cards4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
  },
};

// Card styles
export const cards = {
  base: 'border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-blue-300',
  header: 'p-6 border-b border-gray-100',
  body: 'p-6',
  footer: 'p-6 pt-4 border-t border-gray-100 flex items-center justify-between',
};

// Common components styling (beyond shadcn)
export const components = {
  tag: 'px-3 py-1 rounded-full text-xs font-medium',
  tagColors: {
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    green: 'bg-green-100 text-green-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    gray: 'bg-gray-100 text-gray-700',
    red: 'bg-red-100 text-red-700',
  },
};
