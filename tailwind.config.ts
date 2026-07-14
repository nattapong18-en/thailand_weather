import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: {
          DEFAULT: "#3B82F6",
        },
        paper: "#F7F9FC",
        ink: "#0F172A",
        mist: "#64748B",
        line: "#E2E8F0",
        aqi: {
          verygood: "#3B82F6",
          good: "#22C55E",
          moderate: "#EAB308",
          unhealthy: "#F97316",
          hazardous: "#DC2626",
        },
      },
      fontFamily: {
        display: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
