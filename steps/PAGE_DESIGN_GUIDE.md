# SkillBridge-SPA Page Design Guide

## 🎨 Design System Overview

This guide establishes the design patterns, folder structure, and component organization for creating new pages in the SkillBridge-SPA project.

### Color Palette
- **Primary Blue**: `#3b82f6` (blue-500) - Main brand color
- **Blue Variations**: 
  - Light: `#f0f6ff` (blue-50)
  - Medium: `#2563eb` (blue-600)  
  - Dark: `#1d4ed8` (blue-700)
- **Neutral Grays**: From `#f9fafb` (gray-50) to `#111827` (gray-900)

### Background Patterns
- **Gradient**: `bg-gradient-to-br from-slate-50 via-white to-blue-50`
- **Dot Pattern**: Radial gradient dots using `#3b82f6` with 30px spacing
- **Overlay**: `bg-gradient-to-b from-white/80 via-white/60 to-white/80`

## 📁 Folder Structure Convention

### Page Directory Structure
```
src/pages/[page-name]/
├── [PageName]Page.tsx          # Main page component (default export)
├── types.ts                    # TypeScript interfaces and types
├── components/                 # Page-specific components
│   ├── index.ts               # Barrel exports
│   ├── HeroSection.tsx        # Hero/header section
│   ├── [Feature]Section.tsx   # Feature sections
│   └── [ComponentName].tsx    # Other components
├── hooks/                     # Custom hooks (if needed)
│   └── use[FeatureName].ts
└── [pageData].ts              # Mock data or constants
```

## 🏗️ Page Architecture

### 1. Main Page Component Pattern
```tsx
import { HeroSection } from './components/HeroSection';
import { [Feature]Section } from './components/[Feature]Section';

const [PageName]Page = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeroSection />
      <[Feature]Section />
      {/* Additional sections */}
    </div>
  );
};

export default [PageName]Page;
```

### 2. Section Component Pattern
```tsx
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const [SectionName]Section = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px'
          }}
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Section content */}
      </div>
    </section>
  );
};
```

## 🎯 Component Design Patterns

### Hero Section Standards
- **Badge**: Blue background with pulse animation
- **Title**: Large typography (text-4xl md:text-6xl lg:text-7xl)
- **Subtitle**: Medium text with gray-600 color
- **CTA Buttons**: Primary blue + outline variant
- **Feature Cards**: White/70 backdrop with glass effect

### Card Component Pattern
```tsx
<div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:-translate-y-2">
  <div className="p-6 border-b border-gray-100">
    {/* Header content */}
  </div>
  <div className="p-6">
    {/* Body content */}
  </div>
  <div className="p-6 pt-4 border-t border-gray-100">
    {/* Footer content */}
  </div>
</div>
```

### Grid Layouts
- **2 columns**: `grid grid-cols-1 md:grid-cols-2 gap-8`
- **3 columns**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- **4 columns**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`

## 🎨 Styling Guidelines

### Typography Hierarchy
```tsx
// From design-system.ts
const typography = {
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
```

### Common Spacing
- **Container**: `container mx-auto px-6 lg:px-8`
- **Section**: `py-16 md:py-24`
- **Header Offset**: `pt-32`

### Tags and Badges
```tsx
// Blue tag
<span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
  Tag Text
</span>
```

### Buttons
- **Primary**: `bg-blue-600 hover:bg-blue-700`
- **Secondary**: `border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-700`
- **Icon Animation**: `group-hover:translate-x-1 transition-transform`

## 🔧 Technical Requirements

### Required Imports
```tsx
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { [Icons] } from 'lucide-react';
import { Link } from 'react-router-dom';
```

### TypeScript Types
Create `types.ts` file with interfaces:
```tsx
export interface [EntityName] {
  id: string;
  name: string;
  // Additional properties
}

export interface [ComponentName]Props {
  // Props definition
}
```

### Custom Hooks
Follow the pattern in `useJobCategories.ts`:
```tsx
export const use[FeatureName] = () => {
  const { t } = useTranslation();
  
  // Hook logic
  
  return { data, methods };
};
```

### Component Index File
Always create `components/index.ts`:
```tsx
export { [ComponentName] } from './[ComponentName]';
// Export all components for easy importing
```

## 🌐 Internationalization

### Translation Keys Structure
```json
{
  "[pageName]": {
    "hero": {
      "title": "Page Title",
      "subtitle": "Page subtitle",
      "primaryCta": "Primary Action",
      "secondaryCta": "Secondary Action"
    },
    "[sectionName]": {
      "title": "Section Title",
      "description": "Section description"
    }
  }
}
```

### Usage Pattern
```tsx
const { t } = useTranslation();

// Usage
{t('[pageName].hero.title', 'Default Text')}
```

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile First**: Start with mobile design
- **Breakpoints**: sm: 640px, md: 768px, lg: 1024px, xl: 1280px
- **Container**: Use `container mx-auto` with responsive padding

### Common Responsive Patterns
```tsx
// Typography
className="text-4xl md:text-6xl lg:text-7xl"

// Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Spacing
className="px-6 lg:px-8 py-16 md:py-24"

// Flex
className="flex flex-col sm:flex-row gap-4"
```

## 🎭 Animation Guidelines

### Hover Effects
- **Scale**: `hover:scale-105`
- **Translate**: `hover:-translate-y-2`
- **Shadow**: `hover:shadow-lg`
- **Border**: `hover:border-blue-300`

### Transition Classes
- **Standard**: `transition-all duration-300`
- **Long**: `transition-all duration-500`
- **Group Effects**: Use `group` and `group-hover:`

### Loading States
- **Pulse**: `animate-pulse`
- **Spin**: `animate-spin`
- **Bounce**: `animate-bounce`

## 🧩 Shadcn UI Components

### Commonly Used Components
- `Button` - Primary interaction elements
- `Card` - Content containers
- `Badge` - Status indicators
- `Input` - Form elements
- `Tabs` - Navigation
- `Dialog` - Modals
- `Progress` - Loading indicators

### Adding New Components
```bash
pnpm dlx shadcn@latest add [component-name]
```

## ✅ Best Practices Checklist

### Before Creating a New Page:
- [ ] Define the purpose and user journey
- [ ] Plan the component hierarchy
- [ ] Design the responsive breakpoints
- [ ] Consider loading and error states
- [ ] Plan internationalization keys

### During Development:
- [ ] Follow the folder structure convention
- [ ] Use TypeScript interfaces
- [ ] Implement responsive design
- [ ] Add proper animations
- [ ] Use semantic HTML
- [ ] Follow accessibility guidelines

### After Implementation:
- [ ] Test on different screen sizes
- [ ] Verify color contrast
- [ ] Check loading performance
- [ ] Validate with TypeScript
- [ ] Test internationalization
- [ ] Review with design system

## 🔍 Code Quality Standards

### ESLint & Prettier
- Run `npm run lint` before committing
- Run `npm run format` before finalizing
- Follow the established .prettierrc rules

### Performance
- Use `React.memo` for heavy components
- Implement `useCallback` and `useMemo` appropriately
- Consider code splitting with `React.lazy`

### Accessibility
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios

---

This guide ensures consistency across all pages while maintaining the modern, professional aesthetic of the SkillBridge-SPA platform. Follow these patterns to create cohesive user experiences that align with the established design system. 