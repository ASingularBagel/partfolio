/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const daisyui = require('daisyui');
const theme = require('./src/components/dark-theme.module.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'home-background': "url('/src/assets/tenor.gif')",
      },
      fontFamily: {
        'win-bug-omega': 'win-bug-omega',
        'system-ui': 'system-ui',
        'apple-system': '-apple-system',
        'segoe-ui': 'Segoe UI',
        'roboto': 'Roboto',
        'ubuntu': 'Ubuntu',
        'cantarell': 'Cantarell',
        'noto-sans': 'Noto Sans',
        'hiragino-kaku-gothic-pron': 'Hiragino Kaku Gothic ProN',
        'meiryo': 'Meiryo',
        'sans-serif': 'sans-serif',
      },
      colors: {
        ...theme,
      }
    },
  },
  plugins: [
    daisyui, 
    require('@iconify/tailwind'),
    {"name" : "typescript-plugin-css-modules"}
  ]
};
