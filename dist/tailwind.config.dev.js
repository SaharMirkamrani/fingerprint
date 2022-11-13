"use strict";

module.exports = {
  purge: [],
  darkMode: false,
  // or 'media' or 'class'
  theme: {
    extend: {
      color: {
        paszamine: {
          300: '#9090A7',
          400: '#555870',
          500: '#44465B',
          600: '#343547',
          700: '#2C2C3E',
          800: '#28293D',
          900: '#242530'
        },
        pink: {
          100: '#F4A4B9',
          200: '#F07F9D',
          300: '#EB577F',
          400: '#583950'
        }
      }
    }
  },
  variants: {
    extend: {
      cursor: ['disabled']
    }
  },
  plugins: []
};