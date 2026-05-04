/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'support-blue': '#e0f2fe',     /* Tailwind sky-100 */
        'support-green': '#dcfce7',    /* Tailwind green-100 */
        'support-lavender': '#f3e8ff', /* Tailwind purple-100 */
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'system-ui'],
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
