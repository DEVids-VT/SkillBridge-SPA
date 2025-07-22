# Technical Stack

## Core Technologies
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Language**: TypeScript 5.7
- **Styling**: TailwindCSS 4 with CSS Variables (using OKLCH color space)
- **UI Components**: Shadcn UI (component library built on Radix UI primitives)
- **Routing**: React Router v7+
- **State Management**: React Query (TanStack Query v5)
- **Authentication**: Auth0
- **Internationalization**: react-i18next with HTTP backend and language detection
- **Animation**: Lenis for smooth scrolling, Embla Carousel, React Transition Group
- **Utility Libraries**: class-variance-authority, clsx, tailwind-merge

## Code Quality Tools
- **Linting**: ESLint v9
- **Formatting**: Prettier v3
- **Type Checking**: TypeScript with strict mode

## Common Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run linter with auto-fix
npm run lint

# Format code with Prettier
npm run format
```

## Build Configuration
- Path aliases configured with `@/*` pointing to `./src/*`
- TypeScript configuration split into app and node configs
- Tailwind configured with custom theme including animations, colors, and typography
- Vite configured with React plugin and TailwindCSS integration