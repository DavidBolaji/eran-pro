import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        'widest': '0.125em', 
        'wide': '0.025em',
        'normal': '0em',
        'narrow': '0.015em',
        'narrower': '-0.01em',
        'wider': '0.05em',
        'semi-wide': '0.04em',
      },
    },
  },
  plugins: [],
};
export default config;
