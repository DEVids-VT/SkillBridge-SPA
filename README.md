# React AI Kickstarter Template (Vite + TS + Tailwind + Shadcn + Router)

This template provides a production-ready foundation for building React Single Page Applications (SPAs), specifically optimized for efficient collaboration with AI coding assistants like Cursor.

It includes:

- React 19, Vite, TypeScript
- TailwindCSS v4 with CSS Variables
- Shadcn UI (`components.json` setup)
- React Router v7+
- react-i18next for internationalization
- ESLint + Prettier for code consistency
- AI Collaboration files (`.cursorrules`, `docs/`, `steps/`)

## Getting Started

1.  **Clone/Use Template:** Obtain the template files.
2.  **Install Dependencies:** `npm install`
3.  **Run Development Server:** `npm run dev`
4.  **Lint & Format:**
    - `npm run lint` (Checks and fixes lint issues)
    - `npm run format` (Formats code with Prettier)

## Full Documentation

For detailed information on the project structure, technologies used, configuration, and guidelines for collaborating with AI, please refer to the **[main documentation](./docs/README.md)**.

Key documents include:

- `docs/AI_COLLABORATION.md`: How to work effectively with Cursor.
- `docs/FOLDER_STRUCTURE.md`: Explanation of the directory layout.
- `.cursorrules`: Directives for the Cursor AI.

---

_Original Vite README content below might be outdated or less relevant._

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
