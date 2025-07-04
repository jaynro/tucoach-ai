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
          light: '#2a4a6b',
          DEFAULT: '#17293f',
          dark: '#0f1b2c',
        },
        accent: {
          light: '#ffb366',
          DEFAULT: '#FF8C42',
          dark: '#e67a3a',
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