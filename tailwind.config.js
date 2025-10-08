/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      clipPath: {
        // Custom bentuk untuk header/footer
        drip: "polygon(0 0, 100% 0, 100% 80%, 90% 85%, 80% 70%, 70% 85%, 60% 75%, 50% 90%, 40% 80%, 30% 95%, 20% 85%, 10% 90%, 0 80%)",
      },
    },
  },
  plugins: [
    require('tailwind-clip-path'), // aktifkan plugin clip-path
  ],
};
