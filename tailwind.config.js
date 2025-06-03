import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'oklch(var(--color-border) / <alpha-value>)',
        input: 'oklch(var(--color-input) / <alpha-value>)',
        ring: 'oklch(var(--color-ring) / <alpha-value>)',
        background: 'oklch(var(--color-background) / <alpha-value>)',
        foreground: 'oklch(var(--color-foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'oklch(var(--color-primary) / <alpha-value>)',
          foreground: 'oklch(var(--color-primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--color-secondary) / <alpha-value>)',
          foreground: 'oklch(var(--color-secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--color-destructive) / <alpha-value>)',
          foreground: 'oklch(var(--color-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--color-muted) / <alpha-value>)',
          foreground: 'oklch(var(--color-muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--color-accent) / <alpha-value>)',
          foreground: 'oklch(var(--color-accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'oklch(var(--color-popover) / <alpha-value>)',
          foreground: 'oklch(var(--color-popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'oklch(var(--color-card) / <alpha-value>)',
          foreground: 'oklch(var(--color-card-foreground) / <alpha-value>)',
        },
        sidebar: {
          DEFAULT: 'oklch(var(--color-sidebar) / <alpha-value>)',
          foreground: 'oklch(var(--color-sidebar-foreground) / <alpha-value>)',
          primary: {
            DEFAULT: 'oklch(var(--color-sidebar-primary) / <alpha-value>)',
            foreground: 'oklch(var(--color-sidebar-primary-foreground) / <alpha-value>)',
          },
          accent: {
            DEFAULT: 'oklch(var(--color-sidebar-accent) / <alpha-value>)',
            foreground: 'oklch(var(--color-sidebar-accent-foreground) / <alpha-value>)',
          },
          border: 'oklch(var(--color-sidebar-border) / <alpha-value>)',
          ring: 'oklch(var(--color-sidebar-ring) / <alpha-value>)',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      borderColor: {
        DEFAULT: 'oklch(var(--color-border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'infinite-scroll-reverse': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'infinite-scroll-reverse': 'infinite-scroll-reverse 25s linear infinite',
      },
    },
  },
  plugins: ['tailwindcss-animate'],
};
