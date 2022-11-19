/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: '1fr 350px',
      },
      gridTemplateRows: {
        app: '1fr 350px',
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
