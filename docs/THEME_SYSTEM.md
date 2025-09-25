# Theme System Documentation

## Overview

The SkillBridge SPA implements a comprehensive theme system that supports multiple themes with automatic persistence and system theme detection. The system is built on top of React Context, CSS variables, and Tailwind's dark mode functionality.

## Features

- **Multiple Themes**: Light, Dark, and System themes
- **Automatic Persistence**: Theme selection is saved to localStorage
- **System Theme Detection**: Automatically follows OS theme preference
- **Global Application**: Theme changes apply across all components
- **shadcn/ui Compatible**: Works seamlessly with shadcn/ui components
- **Extensible**: Easy to add new themes

## Architecture

### Core Components

1. **ThemeProvider** (`src/contexts/ThemeContext.tsx`)
   - React Context provider that manages theme state
   - Handles theme persistence and system theme detection
   - Applies CSS variables dynamically

2. **CSS Variables** (`src/index.css`)
   - Defines theme tokens as CSS custom properties
   - Supports Tailwind's dark mode class strategy
   - Automatically updated by ThemeProvider

3. **Design System** (`src/lib/design-system.ts`)
   - Legacy color constants for backward compatibility
   - Updated to work with theme system
   - Provides theme-aware design tokens

## Usage

### Basic Usage

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

### Theme-Aware Styling

Use Tailwind's theme-aware classes instead of hardcoded colors:

```tsx
// ✅ Good - Theme-aware
<div className="bg-background text-foreground border-border">
  <button className="bg-primary text-primary-foreground">
    Primary Button
  </button>
</div>

// ❌ Avoid - Hardcoded colors
<div className="bg-[#000814] text-white border-[#003566]">
  <button className="bg-[#003566] text-[#ffd60a]">
    Primary Button
  </button>
</div>
```

### Available Theme Classes

- **Background**: `bg-background`, `bg-card`, `bg-popover`
- **Text**: `text-foreground`, `text-muted-foreground`, `text-card-foreground`
- **Borders**: `border-border`, `border-input`
- **Interactive**: `bg-primary`, `bg-secondary`, `bg-accent`, `bg-destructive`
- **Sidebar**: `bg-sidebar`, `text-sidebar-foreground`, `border-sidebar-border`

## Adding New Themes

### Step 1: Update Theme Type

```tsx
// In src/contexts/ThemeContext.tsx
export type Theme = 'light' | 'dark' | 'system' | 'your-new-theme';
```

### Step 2: Add Theme Tokens

```tsx
// In src/contexts/ThemeContext.tsx
const themes = {
  // ... existing themes
  'your-new-theme': {
    background: '#your-color',
    foreground: '#your-color',
    // ... all required tokens
  },
} as const;
```

### Step 3: Update Theme Dropdown

```tsx
// In src/pages/candidate/components/CandidateSystemSection.tsx
<SelectContent>
  <SelectItem value="light">Light</SelectItem>
  <SelectItem value="dark">Dark</SelectItem>
  <SelectItem value="system">System</SelectItem>
  <SelectItem value="your-new-theme">Your New Theme</SelectItem>
</SelectContent>
```

### Step 4: Add CSS Variables (Optional)

If you need additional CSS variables for your theme:

```css
/* In src/index.css */
.your-new-theme {
  --your-custom-variable: #your-color;
}
```

## Theme Tokens

Each theme must define the following tokens:

### Core Tokens
- `background` - Main background color
- `foreground` - Main text color
- `card` - Card background color
- `cardForeground` - Card text color
- `popover` - Popover background color
- `popoverForeground` - Popover text color

### Interactive Tokens
- `primary` - Primary action color
- `primaryForeground` - Primary action text color
- `secondary` - Secondary action color
- `secondaryForeground` - Secondary action text color
- `muted` - Muted background color
- `mutedForeground` - Muted text color
- `accent` - Accent color
- `accentForeground` - Accent text color
- `destructive` - Destructive action color

### UI Tokens
- `border` - Border color
- `input` - Input border color
- `ring` - Focus ring color

### Chart Tokens
- `chart1` through `chart5` - Chart colors

### Sidebar Tokens
- `sidebar` - Sidebar background
- `sidebarForeground` - Sidebar text
- `sidebarPrimary` - Sidebar primary color
- `sidebarPrimaryForeground` - Sidebar primary text
- `sidebarAccent` - Sidebar accent color
- `sidebarAccentForeground` - Sidebar accent text
- `sidebarBorder` - Sidebar border
- `sidebarRing` - Sidebar focus ring

## Migration Guide

### From Hardcoded Colors to Theme-Aware

1. **Replace hardcoded colors**:
   ```tsx
   // Before
   <div style={{ backgroundColor: colors.dark, color: colors.white }}>
   
   // After
   <div className="bg-background text-foreground">
   ```

2. **Update border colors**:
   ```tsx
   // Before
   <div className={`border-[${colors.blue}]`}>
   
   // After
   <div className="border-border">
   ```

3. **Update button styles**:
   ```tsx
   // Before
   <button className={`bg-[${colors.orange}] text-[${colors.blueDark}]`}>
   
   // After
   <button className="bg-accent text-accent-foreground">
   ```

### Component Updates

When updating components to use the theme system:

1. Remove imports of `colors` from design-system
2. Replace hardcoded color classes with theme-aware classes
3. Use `useTheme()` hook if you need access to theme state
4. Test with all available themes

## Best Practices

1. **Always use theme-aware classes** instead of hardcoded colors
2. **Test with all themes** when making changes
3. **Use semantic color names** (primary, secondary, accent) rather than specific colors
4. **Maintain contrast ratios** across all themes
5. **Document custom theme tokens** if adding new ones

## Troubleshooting

### Theme Not Applying
- Check that ThemeProvider wraps your app
- Verify CSS variables are being set correctly
- Ensure Tailwind's dark mode is configured properly

### Components Not Updating
- Make sure components use theme-aware classes
- Check that CSS variables are defined for all tokens
- Verify ThemeProvider is not nested incorrectly

### Performance Issues
- Theme changes are optimized to only update necessary CSS variables
- System theme detection uses efficient media query listeners
- localStorage operations are minimal and cached

## Examples

### Theme Selector Component

```tsx
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  
  return (
    <select 
      value={theme} 
      onChange={(e) => setTheme(e.target.value as Theme)}
      className="bg-background text-foreground border-border"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
```

### Theme-Aware Card Component

```tsx
export function ThemeAwareCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
      {children}
    </div>
  );
}
```

## Future Enhancements

Potential improvements to the theme system:

1. **Theme Editor**: Visual theme customization interface
2. **Custom Themes**: User-defined theme creation
3. **Theme Presets**: Predefined theme collections
4. **Animation**: Smooth transitions between themes
5. **Accessibility**: High contrast and reduced motion themes
6. **Theme Sharing**: Export/import theme configurations

---

For questions or issues with the theme system, please refer to the main project documentation or create an issue in the project repository.
