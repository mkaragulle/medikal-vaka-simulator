/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.10)',
        card: '0 18px 45px rgba(15, 23, 42, 0.08)',
        button: '0 12px 28px rgba(15, 118, 110, 0.22)',
      },
    },
  },
  plugins: [],
};
