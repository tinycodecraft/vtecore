/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: ['coffee', 'night', 'cyberpunk', 'valentine','lemonade','retro','bumblebee','cupcake'],
  },
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      blue: {
        50: '#E8F2FC',
        100: '#BFDCF7',
        200: '#96C5F2',
        300: '#6DAFEE',
        400: '#4498E9',
        500: '#1B82E4',
        600: '#1668B6',
        700: '#104E89',
        800: '#0B345B',
        900: '#051A2E',
      },
      pink: {
        50: '#FDE7F3',
        100: '#FBBCDC',
        200: '#F891C6',
        300: '#F566AF',
        400: '#F23B99',
        500: '#EF1082',
        600: '#BF0D68',
        700: '#8F0A4E',
        800: '#600634',
        900: '#30031A',
      },
      orange: {
        50: '#FAF1EA',
        100: '#F2D8C5',
        200: '#E9BF9F',
        300: '#E1A67A',
        400: '#D88D55',
        500: '#D0742F',
        600: '#A65D26',
        700: '#7D451C',
        800: '#532E13',
        900: '#2A1709',
      },
      green: {
        50: '#F4F8ED',
        100: '#E0EBCC',
        200: '#CBDEAB',
        300: '#B7D18A',
        400: '#A3C469',
        500: '#8FB748',
        600: '#72923A',
        700: '#566E2B',
        800: '#39491D',
        900: '#1D250E',
      },
      'gray-dark': '#273444',
      gray: {
        50: '#F0F2F4',
        100: '#D6DBE0',
        200: '#BCC3CD',
        300: '#A2ACB9',
        400: '#8894A5',
        500: '#6D7D92',
        600: '#576475',
        700: '#424B57',
        800: '#2C323A',
        900: '#16191D',
      },
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      keyframes: {
        'logo-spin': {
          '0%': { transform: `rotate(0deg)` },
          '100%': { transform: `rotate(360deg)` },
        },
      },
      animation: {
        'logo-turn': 'logo-spin infinite 20s linear',
        'load-turn': 'logo-spin infinite 1s linear',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [require('daisyui')],
}
