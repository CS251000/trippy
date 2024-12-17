/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC", // Light Grayish Blue
        foreground: "#1E293B", // Dark Blue Gray
        primary: "#0EA5E9",    // Sky Blue
        secondary: "#FACC15",  // Yellow Gold
        accent: "#EF4444",     // Red Accent
        muted: "#94A3B8",      // Muted Blue Gray
        card: "#FFFFFF",       // Pure White for cards
        border: "#CBD5E1",     // Light Gray for borders
        hover: "#0284C7",      // Darker Sky Blue for hover states
        success: "#22C55E",    // Green for success messages
        warning: "#EAB308",    // Amber for warnings
        error: "#DC2626",      // Red for errors
      },
    },
  },
  plugins: [],
};
