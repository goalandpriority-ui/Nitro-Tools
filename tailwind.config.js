/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          muted: "rgb(var(--color-ink-muted) / <alpha-value>)",
          soft: "rgb(var(--color-ink-soft) / <alpha-value>)",
        },
        line: "rgb(var(--color-line) / <alpha-value>)",
        quantum: {
          DEFAULT: "rgb(var(--color-quantum) / <alpha-value>)",
          50: "rgb(var(--color-quantum-50) / <alpha-value>)",
          100: "rgb(var(--color-quantum-100) / <alpha-value>)",
          600: "rgb(var(--color-quantum) / <alpha-value>)",
          700: "rgb(var(--color-quantum-700) / <alpha-value>)",
        },
        collapse: {
          DEFAULT: "rgb(var(--color-collapse) / <alpha-value>)",
          50: "rgb(var(--color-collapse-50) / <alpha-value>)",
          600: "rgb(var(--color-collapse) / <alpha-value>)",
        },
      },
      fontFamily: {
        serif: ["'Source Serif 4'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
