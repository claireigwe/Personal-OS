import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        success: "hsl(var(--success))",
        xp: "hsl(var(--xp))",
        coin: "hsl(var(--coin))"
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem"
      },
      animation: {
        "slide-up": "slide-up 0.4s ease-out both",
        "fade-in": "fade-in 0.3s ease-out both",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "bounce-subtle": "bounce-subtle 0.5s ease-in-out",
        expand: "expand-down 0.3s ease-out both"
      },
      boxShadow: {
        glow: "0 0 20px -3px hsla(262, 83%, 58%, 0.2)",
        "glow-lg": "0 0 30px -5px hsla(262, 83%, 58%, 0.25)",
        card: "0 4px 20px -2px hsla(262, 83%, 58%, 0.08), 0 2px 8px -2px hsla(0, 0%, 0%, 0.04)",
        "card-hover": "0 8px 30px -4px hsla(262, 83%, 58%, 0.14), 0 4px 12px -4px hsla(0, 0%, 0%, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
