/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121110",
        panel: "#17150F",
        line: "#2A2723",
        crimson: "#DC2626",
        crimsonDark: "#C41E1E",
        gold: "#C9A227",
        offwhite: "#E8E6E1",
        muted: "#8A8780",
        faint: "#5C594F",
        success: "#3FA66A",
      },
      fontFamily: {
        serif: ["'Source Serif 4'", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
