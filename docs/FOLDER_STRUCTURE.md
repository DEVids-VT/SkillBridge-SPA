# Folder Structure Guide

This document explains the primary folder structure used in this template.

```
.
├── .git/             # Git version control files
├── .husky/           # Git hooks (if configured)
├── .vscode/          # VS Code workspace settings (optional)
├── docs/             # Project documentation
│   ├── README.md         # Main documentation entry point
│   ├── AI_COLLABORATION.md # Guidelines for working with AI
│   └── FOLDER_STRUCTURE.md # This file
├── node_modules/     # Project dependencies (managed by npm/yarn/pnpm)
├── public/           # Static assets served directly
│   └── vite.svg        # Example static asset
├── src/
│   ├── assets/         # Static assets processed by Vite (e.g., images)
│   │   └── react.svg
│   ├── components/     # Reusable React components
│   │   ├── layout/       # Layout components (Header, Footer, Layout)
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── ui/           # Shadcn UI components (populated via CLI)
│   │       ├── button.tsx
│   │       └── ...       # Other Shadcn components
│   ├── lib/            # Utility functions, helpers, constants
│   │   └── utils.ts      # Example utility file (e.g., for Shadcn's cn function)
│   ├── pages/          # Page-level components (mapped to routes)
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── providers/      # React Context providers (e.g., Theme, Auth) - (Create if needed)
│   ├── services/       # API service integrations (e.g., fetch wrappers) - (Create if needed)
│   ├── styles/         # Global styles or base CSS (if needed beyond index.css)
│   ├── types/          # Shared TypeScript type definitions - (Create if needed)
│   ├── App.css         # Component-specific or global CSS
│   ├── App.tsx         # Main application component (routing setup)
│   ├── index.css       # Base Tailwind styles and global CSS
│   ├── main.tsx        # Application entry point (renders App)
│   └── vite-env.d.ts   # Vite environment typings
├── steps/            # Templates for guiding AI requests
│   └── FEATURE_TEMPLATE.md
├── .cursorrules      # Configuration for Cursor AI
├── .editorconfig     # Editor configuration (optional)
├── .env.example      # Example environment variables
├── .eslint.config.js # ESLint configuration
├── .gitignore        # Files/folders ignored by Git
├── .prettierignore   # Files/folders ignored by Prettier (optional)
├── .prettierrc       # Prettier configuration
├── components.json   # Shadcn UI configuration
├── index.html        # HTML entry point
├── LICENSE           # Project license
├── package.json      # Project metadata and dependencies
├── postcss.config.js # PostCSS configuration (for Tailwind)
├── tailwind.config.js# TailwindCSS configuration
├── tsconfig.json     # Base TypeScript configuration
├── tsconfig.node.json# TypeScript config for Node environment (e.g., Vite config)
└── vite.config.ts    # Vite configuration
```

## Key Directories Explained

*   **`docs/`**: Contains all project documentation. Essential reading!
*   **`public/`**: Static assets that are copied directly to the build output without processing.
*   **`src/`**: The heart of the application.
    *   **`src/assets/`**: Images, fonts, etc., that are imported into components and processed by Vite.
    *   **`src/components/`**: Core directory for UI building blocks.
        *   `layout/`: Components defining the overall page structure.
        *   `ui/`: Primarily for Shadcn UI components added via the CLI.
    *   **`src/lib/`**: Shared utility functions, constants, or helper modules.
    *   **`src/pages/`**: Components representing application pages, typically mapped 1:1 with routes.
    *   **`src/providers/`**: (Optional) For React Context API providers.
    *   **`src/services/`**: (Optional) For abstracting API calls.
*   **`steps/`**: Contains markdown templates to help structure complex requests for the AI. 