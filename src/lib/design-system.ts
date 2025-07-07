// Design system constants for consistent dark theme styling

// Color palette
export const colors = {
  dark: '#000814', // Main dark background
  blueDark: '#001d3d', // Deep blue
  blue: '#003566', // Lighter dark blue
  orange: '#ffc300', // Orange accent
  yellow: '#ffd60a', // Yellow accent
  white: '#ffffff', // White for text and highlights
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
    1: 'text-5xl md:text-6xl font-bold text-white',
    2: 'text-4xl md:text-5xl font-bold text-white',
    3: 'text-3xl font-bold text-white',
    4: 'text-2xl font-bold text-white',
    5: 'text-xl font-semibold text-white',
  },
  body: {
    default: 'text-base text-gray-200',
    lg: 'text-lg text-gray-200',
    sm: 'text-sm text-gray-400',
  },
};

// Layouts
export const layouts = {
  pageHeader: 'text-center mb-16 relative',
  pageHeaderBackground:
    'absolute -top-10 left-0 right-0 h-20 bg-gradient-to-r from-[#001d3d] to-[#003566] rounded-b-3xl -z-10',
  pageTitle: `${typography.heading[1]} mb-6`,
  pageDescription: 'text-lg text-gray-300 max-w-3xl mx-auto mb-10',
  grid: {
    cards2: 'grid grid-cols-1 md:grid-cols-2 gap-8',
    cards3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    cards4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
  },
};

// Card styles
export const cards = {
  base: 'border border-[#003566] bg-[#001d3d] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-[#ffc300]',
  header: 'p-6 border-b border-[#003566]',
  body: 'p-6',
  footer: 'p-6 pt-4 border-t border-[#003566] flex items-center justify-between',
};

// Tag styles
export const components = {
  tag: 'px-3 py-1 rounded-full text-xs font-medium',
  tagColors: {
    blue: 'bg-[#003566] text-[#ffd60a]',
    orange: 'bg-[#ffc300] text-[#001d3d]',
    yellow: 'bg-[#ffd60a] text-[#001d3d]',
    white: 'bg-white text-[#001d3d]',
    dark: 'bg-[#000814] text-[#ffd60a]',
  },
};
