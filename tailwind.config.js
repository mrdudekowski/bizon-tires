/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      background: "var(--color-background)",
      foreground: "var(--color-foreground)",
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      muted: "var(--color-muted)",
      surface: "var(--color-surface)",
      "surface-muted": "var(--color-surface-muted)",
      "surface-strong": "var(--color-surface-strong)",
      border: "var(--color-border)",
      "border-strong": "var(--color-border-strong)",
      "border-dashed": "var(--color-border-dashed)",
      "text-subtle": "var(--color-text-subtle)",
      "on-primary": "var(--color-on-primary)",
      ring: "var(--color-ring)",
    },
    borderColor: ({ theme }) => theme("colors"),
    borderRadius: {
      DEFAULT: "var(--radius)",
      sm: "calc(var(--radius) - 4px)",
      md: "calc(var(--radius) - 2px)",
      lg: "var(--radius)",
      xl: "calc(var(--radius) + 4px)",
      "2xl": "calc(var(--radius) + 8px)",
      "3xl": "calc(var(--radius) + 12px)",
      "4xl": "calc(var(--radius) + 16px)",
    },
    fontFamily: {
      sans: ["var(--font-sans)"],
    },
  },
  plugins: [],
};

