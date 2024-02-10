module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FFFFFF", // Primary theme color (logo, buttons)
          secondary: "#586CB2", // Secondary theme color (alt icons)
          accent: "#4b5563",
          neutral: "#111827",
          success: "#10b981",
          error: "#ef4444",
        },
        dark: {
          primary: "#28292A", // Primary theme color (logo, buttons)
          secondary: "#586CB2", // Secondary theme color (alt icons)
          accent: "#CCCCCC",
          neutral: "#F1F3F9",
          success: "#059669",
          error: "#ef4444",
        },
      },
    ],
  },
};