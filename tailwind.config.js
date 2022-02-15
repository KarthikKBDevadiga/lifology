const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        'l': '0 0 50%',
        'one': '0 0 100%',
        'two': '0 0 50%',
        'four': '0 0 25%',
        'five': '0 0 20%'
      },
      paddingTop:{
        'full': '100%'
      },
      minWidth: {
        '80': '80%',
      },
      fontFamily: {
        roboto: ['Roboto'],
      },
      minWidth: {
        6: '6rem'
      },
      colors: {
        lblue: {
          light: '#21AAED',
          DEFAULT: '#085CA4',
        },
        lgrey: {
          DEFAULT: '#F8F8F8',
          bg: '#F8F8F8',
          light: '#F3F3F3',
          border: '#F2F2F2',
          dark: '#9A9A9A'
        },
        lyellow: {
          DEFAULT: '#FFC400'
        },
        lgreen: {
          DEFAULT: '#02C77D',
          light: '#5EB570',
          lime: '#30C702'
        },
        lred: {
          DEFAULT: '#FF0000',
          dark: '#A40808',
        }
      },
      animation: {
        'hbounce': 'hbounce 1s infinite',
        'expand': 'expand 200ms',
        'collapse': 'collapse 200ms'
      },
      keyframes: {
        hbounce: {
          '0%, 100%': { transform: 'translateX(0%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateX(-25%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        expand: {
          '0%': { transform: 'rotate(0deg)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '100%': { transform: 'rotate(180deg)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' }
        },
        collapse: {
          '0%': { transform: 'rotate(180deg)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '100%': { transform: 'rotate(0deg)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' }
        }
      },
      rotate: {
        '-72': '-72deg',
        '-39': '-39deg',
        '35': '35deg',
        '72': '72deg'
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus',],
      scrollbar: ['rounded']
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
