/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          1: '#b0d6f5',
          2: '#65c2f5',
          3: '#09b1ec',
          4: '#0487e2',
          5: '#0463ca'
        }
      }
    },
  },
  plugins: [],
};
