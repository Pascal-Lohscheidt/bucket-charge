/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: '1fr 350px',
      },
      gridTemplateRows: {
        app: '100px 1fr',
      },
      colors: {
        sixt: {
          500: '#ff5f00',
        },
      },
    },
  },
  plugins: [],
};
