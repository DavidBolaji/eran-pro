import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "black-100": "#23342A",
        "black-200": "#516158",
        "black-300": "#6E8C7B",
        "black-400": "#92B09F",
        "black-500": "#C8E0D2",
        "black-600": "#DDEEE5",
        "black-700": "#F0FAF4",
        "green": "#066932",
        "lemon": "#7DBA00",
        "grey": "#F5F5F5",
        "red-100": "#E83B3B",
        "red-200": "#FF8A8A",
        "orange-100": "#D28209",
        "orange-200": "#F9C77B"
      },
      fontSize: {
        h1: "96px",
        h2: "60px",
        h3: "48px",
        h4: "36px",
        h5: "24px",
        h6: "20px",
        s1: "16px",
        s2: "14px",
        c1: "12px",
        c2: "10px",
      },
      fontFamily: {
        satoshi: ["Satoshi Variable", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-.05em",
        tighter: "-.025em",
        normal: "0",
        wide: ".25em",
      },
    },
  },
  plugins: [],
};
export default config;
