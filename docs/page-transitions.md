# Page Transitions in Endorsify-SPA

This project implements smooth page transitions using React Transition Group and CSS transitions. This document provides an overview of how transitions are implemented and how to customize them.

## Implementation Overview

The application uses two primary approaches for smooth transitions:

1. **React Transition Group**: For page transitions between routes
2. **Lenis Smooth Scroll**: For smooth scrolling within pages

## Page Transition Components

### EnhancedPageTransition

The `EnhancedPageTransition` component in `src/components/transitions/EnhancedPageTransition.tsx` provides configurable transitions between pages:

```tsx
<EnhancedPageTransition transitionType="fade" withBlur={true}>
  {/* Your content */}
</EnhancedPageTransition>
```

#### Props

- `transitionType`: The type of transition to use ('fade', 'slide', or 'scale')
- `duration`: Object specifying enter/exit durations in milliseconds
- `withBlur`: Whether to add a blur effect during transitions

### Basic PageTransition

The `PageTransition` component in `src/components/transitions/PageTransition.tsx` provides a simpler inline-style based transition:

```tsx
<PageTransition>{/* Your content */}</PageTransition>
```

## CSS Transitions

Custom CSS transitions are defined in `src/components/transitions/transitions.css`:

- **Fade**: Simple opacity/translate fade transitions
- **Slide**: Horizontal slide transitions
- **Scale**: Scaling transitions with opacity changes
- **Blur**: Optional blur effect that can be combined with other transitions

## How It Works

1. The `Layout` component wraps the `<Outlet />` with the `EnhancedPageTransition` component
2. When routes change, React Transition Group handles the animation between pages
3. The `useLocation` hook from React Router is used to trigger transitions when the path changes
4. Scroll position is automatically reset to the top on page changes

## Changing Transition Effects

To change the default transition effect:

1. Open `src/components/layout/Layout.tsx`
2. Modify the `transitionType` prop on the `EnhancedPageTransition` component:

```tsx
<EnhancedPageTransition transitionType="slide" withBlur={false}>
  <Outlet />
</EnhancedPageTransition>
```

Available transition types:

- `fade` (default)
- `slide`
- `scale`

## Global Transition Styles

Global transition styles are defined in `src/App.css` to ensure a consistent feel:

- Interactive elements (buttons, links) have smooth hover states
- Card elements have subtle hover animations
- Navigation links have animated underlines
- Form inputs have smooth focus states

## Combining with Lenis Smooth Scroll

The page transitions work seamlessly with Lenis smooth scroll:

- Page transitions handle moving between routes
- Lenis handles smooth scrolling within pages
- The Layout component uses Lenis for smooth scrolling to top when available

## Tips for a Cohesive Experience

1. Wrap page content in a div with the `page-wrapper` class for consistent animations
2. Use the same animation timing across the application
3. Consider the user's motion preferences via the `prefers-reduced-motion` media query
4. Avoid overly dramatic animations that might distract or cause motion sickness
