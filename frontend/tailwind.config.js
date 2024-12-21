/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          // 1: '#b0d6f5',
          // 2: '#65c2f5',
          // 3: '#09b1ec',
          // 4: '#0487e2',
          // 5: '#0463ca'
          0: "white",
          1: '#fefefe',
          2: '#87d0f9',
          3: '#42a9eb',
          4: '#2d7cc1',
          5: '#002154'
        }
      }
    },
  },
  plugins: [],
};
