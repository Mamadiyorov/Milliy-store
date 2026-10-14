import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F3EC",
        sand: "#EDE5D8",
        stone: { 450: "#8C8378" },
        ink: "#1A1714",
        gold: { DEFAULT: "#A8865A", light: "#C9AD84", dark: "#7E623D" },
        night: { 900: "#0B0B0D", 800: "#121215", 700: "#1A1A1F", 600: "#24242B", 500: "#2F2F38" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { luxe: "0.28em" },
      keyframes: {
        kenburns: { "0%": { transform: "scale(1)" }, "100%": { transform: "scale(1.12)" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideIn: { "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(0)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        kenburns: "kenburns 18s ease-out infinite alternate",
        fadeUp: "fadeUp 0.7s ease-out both",
        fadeIn: "fadeIn 0.3s ease-out both",
        slideIn: "slideIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
