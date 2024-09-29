import { nextui } from "@nextui-org/react";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)", // Use the CSS variable as the primary color
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
