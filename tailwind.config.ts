import type { Config } from "tailwindcss";

const fuego = require("./theme/tailwind.config");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  font: {
    sans: fuego.theme.fontFamily["fontStack-body"],
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: fuego.theme.spacing,
      font: {
        ...fuego.theme.font,
      },
      fontSize: {
        ...fuego.theme.fontSize,
      },
      fontWeight: {
        ...fuego.theme.fontWeight,
      },
      colors: {
        border: "var(--border)",
        input: "var(--border-input)",
        ring: "var(--border-input)",
        background: "var(--scale-neutral-100)",
        foreground: "var(--background-information)",
        ...fuego.theme.colors,
        primary: {
          DEFAULT: "var(--background-brand-bold)",
          foreground: "var(--background-brand-subtlest)",
        },
        secondary: {
          DEFAULT: "var(--scale-neutralAlpha-100)",
          foreground: "var(--scale-neutralAlpha-900)",
        },
        destructive: {
          DEFAULT: "var(--background-danger-bold)",
          foreground: "var(--background-danger-pressed)",
        },
        muted: {
          DEFAULT: "var(--scale-neutralAlpha-200)",
          foreground: "var(--scale-neutralAlpha-500)",
        },
        accent: {
          DEFAULT: "var(--background-information-bold)",
          foreground: "var(--background-information)",
        },
        popover: {
          DEFAULT: "var(--background-input)",
          foreground: "var(--text-text)",
        },
        card: {
          DEFAULT: "var(--background-input)",
          foreground: "var(--text-textde)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calcvar(--radius) - 2px)",
        sm: "calcvar(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), ...fuego.plugins],
} satisfies Config;

export default config;
