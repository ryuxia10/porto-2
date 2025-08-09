/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#FFD700',
      },
      animation: {
        'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'cinzel': ['"Cinzel Decorative"', 'serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'cinzel-base': ['"Cinzel"', 'serif'],
      },
      keyframes: {
        'text-reveal': {
          '0%': {
            transform: 'translate(0, 100%)',
          },
          '100%': {
            transform: 'translate(0, 0)',
          },
        },
      },
    },
  },
  plugins: [],
}