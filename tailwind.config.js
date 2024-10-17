/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
      colors: {
        cyan: "#3cb4ac",
        "cyan-dark": "#147b74",
        black: "#000000",
        "gray-dark": "#7a7a7a",
        gold: "#FFD700",
        // Dark mode colors
        "dark-cyan": "#27a399",
        "dark-cyan-dark": "#1d2a35",
        "dark-black": "#121212",
        "dark-gray-dark": "#a3a3a3",
      },
      fontFamily: {
        comissioner: ["Commissioner", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
