const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans]
      },
      colors: {
        digit: '#e4ffc3'
      },
      boxShadow: {
        neon: '0 0 10px hsla(160, 100%, 50%, 1)'
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#40f994',
          secondary: '#fcf8ba',
          accent: '#fc9b88',
          neutral: '#1F1F29',
          'base-100': '#171717',
          info: '#7890ED',
          success: '#0D683E',
          warning: '#9C7D0D',
          error: '#DE3F4C'
        }
      }
    ]
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
