/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
export const content = ['./app/**/*.{js,ts,tsx,jsx}', './components/**/*.{js,ts,tsx,jsx}'];
export const presets = [require('nativewind/preset')];
export const theme = {
  extend: {
    colors: {
      mainText: '#288B96',
      secndryText: '#595959',
      mainBg: '#D2DDDE',
      primary: '#227099',
      secondary: '#133E54',
      dark: '#2B2B2B',
      gray: '#F6F6F6',
      borderGray: '#E5E7EB',
      placeholderColor: '#B5B5B5',
    },
    fontFamily: {
      tlight: ['Tajawal-Light', 'sans-serif'],
      tregular: ['Tajawal-Regular', 'sans-serif'],
      tmedium: ['Tajawal-Medium', 'sans-serif'],
      tbold: ['Tajawal-Bold', 'sans-serif'],
    },
  },
};
export const plugins = [];
