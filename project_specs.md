# Endorsify Technical Specification

## Project Overview
Endorsify is a platform where companies and experts can upload courses, while companies can evaluate and approve them to streamline the employee application process. The certificates issued have real value because they often come directly from the source companies and are validated by other industry players. The platform bridges education, certification, and employment into a single ecosystem.

**Target Audience**:

- **Learners**: Professionals with basic skills seeking industry-recognized qualifications, young specialists aiming to boost their labor market readiness, students, and career changers needing practical, industry-focused training.
- **Companies**: HR departments and hiring managers at mid-to-large enterprises in technology, logistics, and digital sectors, as well as educational institutions looking to update their curricula to meet business needs.

## Technical Stack
- Core: React 18, TypeScript 5.3, Vite 5
- UI: Shadcn UI components, Tailwind CSS 4.0, Radix Primitives
- Testing: Vitest, React Testing Library, Mock Service Worker
- Linting: ESLint (Airbnb config + TypeScript), Prettier
- Build: Vite-based toolchain with optimized production config

## Key Features
1. **Companies and experts upload courses**  
   - Implementation: Dynamic forms with `zod` schema validation to create and manage course content.

2. **Companies evaluate and approve courses**  
   - Implementation: Admin dashboard featuring review workflows and API-based approval mechanisms.

3. **Candidates learn and receive certificates**  
   - Implementation: Progress tracking using local and server state; automated certificate generation after course completion.

4. **Standardized certificates with real value**  
   - Implementation: Digital certificates featuring unique QR codes and built-in authenticity verification.

5. **Validation platform for real skills**  
   - Implementation: Knowledge testing modules integrated with verification APIs to certify practical skills.

## Architecture
- App Router pattern with file-based routing
- Layered architecture:
  - Presentation Layer: Components built following the Container/Presenter pattern
  - Business Logic: Custom hooks and local state management
  - Services: API clients for backend integration

- Error Handling: Global error boundary + API response interception

## Development Setup
- Environment Requirements: Node 20+, pnpm 9+
- Installation: `pnpm install --frozen-lockfile`
- Scripts:
  - `dev`: start Vite development server
  - `build`: optimized production build
  - `test`: run Vitest in watch mode
  - `lint`: run ESLint + TypeScript checks
  - `type-check`: `tsc --noEmit`

## Component Structure
- Atomic design system:
  - Atoms: Basic UI elements (buttons, inputs)
  - Molecules: Compound UI components
  - Organisms: Page sections
  - Templates: Layout wrappers
  - Pages: Route components

## API Integration
- REST API integration
- Strict typing of API responses using TypeScript interfaces
- Data caching and revalidation handled by React Query
- Authentication and token validation via middleware interceptors

## Testing Strategy
1. Unit Tests: Testing pure functions and isolated component logic
2. Integration Tests: Testing interactions between components
3. E2E Tests: Testing critical user flows
4. Mocking: Simulating API responses with Mock Service Worker

## Deployment Pipeline
- CI/CD: GitHub Actions configuration
- Workflow: Lint → Test → Build → Deploy
- Automatic preview environments for pull requests
- Production deployment to Vercel

## Future Considerations
- Potential Risks: Complexity in maintaining verification mechanisms
- Planned Optimizations: Adaptive lazy-loading of modules and pages
- Scalability: Migrating to serverless infrastructure as traffic grows