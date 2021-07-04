const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {

        roboto: ['Roboto'],
        proxima: ['ProximaNova']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
