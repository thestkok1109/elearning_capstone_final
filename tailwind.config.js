/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    // desktop first 
    screens: {
      '2xl': { 'max': '1399.98px' },
      // => @media (max-width: 1399.98px) { ... }

      'xl': { 'max': '1199.98px' },
      // => @media (max-width: 1199.98px) { ... }

      'lg': { 'max': '991.98px' },
      // => @media (max-width: 991.98px) { ... }

      'md': { 'max': '767.98px' },
      // => @media (max-width: 767.98px) { ... }

      'sm': { 'max': '575.98px' },
      // => @media (max-width: 575.98px) { ... }
    }
  },
  plugins: [],
}

