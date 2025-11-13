/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: { center: true, padding: '1rem', screens: { xl: '1200px', '2xl': '1500px' } },
    extend: {
      colors: {
        primary: '#CB261C',
        slate: {
          950: '#0b1220',
        },
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
