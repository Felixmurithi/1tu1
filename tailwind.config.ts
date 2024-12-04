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
        "blue-background": "rgb(33, 62, 130)",
        "pink-accent": "rgb(255, 135, 212)",
        "orange-accent": "rgb(255, 130, 112)",
        "light-blue": "#f0fbff",
        grey: "#f6f6f6",
      },
      screens: {
        mobile: "440px",
        tall: { raw: "(min-height: 1100px)" },
      },
    },
  },
  plugins: [],
};
export default config;

// screens sets new screen
