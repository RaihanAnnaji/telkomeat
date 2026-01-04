/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        telko: {
          DEFAULT: "#D41F26",      // primer
          light: "#FFF5E4",        // sekunder (background)
          muted: "#F1F1F1",        // tersier
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        'soft-card': '0 8px 30px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // 🔥 ini wajib biar animasi berfungsi
  ],
};
