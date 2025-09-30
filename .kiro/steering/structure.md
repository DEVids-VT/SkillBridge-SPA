# Project Structure

## Key Directories

- **`src/`**: Main application source code

  - **`assets/`**: Static assets processed by Vite (images, fonts, etc.)
  - **`components/`**: Reusable React components
    - **`layout/`**: Layout components (Header, Footer, Layout)
    - **`ui/`**: Shadcn UI components
    - **`authorize-route/`**: Route guards for authentication and authorization
  - **`contexts/`**: React Context providers
  - **`data/`**: Data models, constants, and mock data
  - **`hooks/`**: Custom React hooks
  - **`lib/`**: Utility functions and helpers
  - **`pages/`**: Page-level components organized by feature
    - Each feature has its own directory (e.g., `dashboard/`, `projects/`)
    - Components specific to a page are in a `components/` subdirectory
  - **`types/`**: TypeScript type definitions and enums

- **`public/`**: Static assets served directly

  - **`images/`**: Static image files
  - **`locales/`**: Translation files organized by language code
  - **`videos/`**: Video assets

- **`docs/`**: Project documentation

## Architectural Patterns

1. **Feature-based Organization**: Code is primarily organized by feature/domain rather than technical role
2. **Component Composition**: UI built from small, reusable components
3. **Route-based Code Splitting**: Pages correspond to routes for natural code splitting
4. **Role-based Access Control**: Routes protected based on user roles
5. **Internationalization**: All user-facing text is externalized in translation files

## Naming Conventions

- **Components**: PascalCase (e.g., `Header.tsx`, `Button.tsx`)
- **Files**:
  - React components: PascalCase (e.g., `ProjectDetail.tsx`)
  - Utilities and hooks: camelCase (e.g., `useAuth.ts`)
- **Folders**: camelCase (e.g., `components/`, `pages/`)
- **Enums**: PascalCase with values in PascalCase or UPPER_SNAKE_CASE
- **Interfaces/Types**: PascalCase, often prefixed with 'I' for interfaces

## Import Conventions

- Use path aliases with `@/` prefix (e.g., `import Button from '@/components/ui/button'`)
- Group imports by:
  1. External libraries
  2. Internal components/utilities
  3. Styles/assets
- Prefer named exports over default exports for better refactoring support
