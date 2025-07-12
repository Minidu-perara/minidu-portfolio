/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
        '0%, 100%': { transform: 'translateY(0px) scale(1)' },
        '50%': { transform: 'translateY(-30px) scale(1.05)' }
         },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.5s ease-in forwards",
        blob: 'blob 16s ease-in-out infinite',
      'blob-slow': 'blob 26s ease-in-out infinite',
      'blob-delay': 'blob 16s ease-in-out infinite 8s',
      },
    },
  },
  plugins: [],
}

