# Copilot Instructions

---

# 🧠 GitHub Copilot Project Guidelines

This project is a **React Single-Page Application Template** powered by **Vite**, **TypeScript**, **TailwindCSS**, **Shadcn UI**, **React Router**, and **i18next**. It’s optimized for rapidly kickstarting AI-enhanced workflows using tools like **Cursor**.

## Use the following structured guidelines when contributing or generating code via Copilot or other AI tools.

## 📦 General Configuration

**Project Description:**
React SPA Template using Vite, TypeScript, TailwindCSS, Shadcn UI, React Router, and i18next. Optimized for kickstarting projects with AI (Cursor).

### ✅ Preferred Libraries

- `react`
- `react-router-dom`
- `tailwindcss`
- `@/components/ui` (Shadcn UI)
- `clsx`
- `tailwind-merge`
- `lucide-react`
- `react-i18next`

### 🚫 Avoid Libraries

- Material UI
- Bootstrap
- jQuery
- Other UI component libraries (unless explicitly requested)

---

## 🧑‍💻 Code Style Guidelines

- Follow Prettier formatting (`.prettierrc`).

  - Run `npm run format` before finalizing.

- Follow ESLint rules (`eslint.config.js`).

  - Run `npm run lint` before finalizing.

- Use functional components and hooks.
- Use **TypeScript** (avoid JS).
- Use **named exports** for components/functions; **default export** for pages.
- Keep components **small and focused**.

---

## 🧩 Components

**Location:** `src/components/`
**Naming Convention:** `PascalCase` (e.g., `MyComponent.tsx`)

### 🗂 Structure

- UI elements → `src/components/ui/` (Shadcn components)
- Layouts → `src/components/layout/` (e.g., `Header`, `Footer`, `Layout`)
- Group related features in subfolders (e.g., `src/components/feature/...`)

### 📁 Import Aliases

- Use `@/components/...` for imports.

---

## 📄 Pages

**Location:** `src/pages/`
**Naming Convention:** `PascalCase` (e.g., `HomePage.tsx`)

### 🛠 Structure

- Each file is a distinct route/view.
- Pages should mainly compose layout and feature components.

### 🔀 Routing

- Defined in: `src/App.tsx`
- Use **React Router v7+** conventions.

---

## 🎨 Styling

**Preferred:** TailwindCSS utility classes
**Avoid:**

- CSS Modules (unless truly necessary)
- Inline styles

### 💎 UI Components

- Use Shadcn UI from `@/components/ui`
- Use `clsx` and `tailwind-merge` for dynamic styling

---

## 📦 State Management

**Use:**

- React Hooks (`useState`, `useContext`)
- Zustand or Jotai (ask before using for global state)

**Avoid:** Redux (unless specifically requested)

---

## 🌍 Internationalization

**Library:** `react-i18next`
**Config:** Usually under `src/` or `src/lib`

### Usage

Use the `t` function from `useTranslation()` for **all** user-facing strings.

---

## 📚 Documentation

**Location:** `docs/`
Refer to:

- `docs/README.md` – Project overview
- `docs/AI_COLLABORATION.md` – AI interaction guidelines

---

## 🧪 Feature/Change Templates

**Location:** `steps/`
Use templates like:

- `FEATURE_TEMPLATE.md` for new features or complex changes.
