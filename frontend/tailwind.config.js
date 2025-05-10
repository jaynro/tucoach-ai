/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4a90e2',
          DEFAULT: '#357abD',
          dark: '#2563eb',
        },
        secondary: {
          light: '#f8f9fa',
          DEFAULT: '#e9ecef',
          dark: '#ddd',
        },
      },
      animation: {
        'spin': 'spin 0.8s linear infinite',
      },
    },
  },
  plugins: [
  ],
}