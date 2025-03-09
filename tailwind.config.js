/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx,jsx}', './components/**/*.{js,ts,tsx,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        mainText: '#288B96',
        mainBg: '#D2DDDE',
        primary: '#227099',
        secondary: '#133E54',
        dark: '#2B2B2B',
        gray: '#F6F6F6',
      },
      fontFamily: {
        tlight: ['Tajawal-Light', 'sans-serif'],
        tregular: ['Tajawal-Regular', 'sans-serif'],
        tmedium: ['Tajawal-Medium', 'sans-serif'],
        tbold: ['Tajawal-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
