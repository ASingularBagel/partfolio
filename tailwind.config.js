import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'home-background': "url('/src/assets/tenor.gif')",
      },
      }
    },
    plugins: [
      daisyui, 
      // eslint-disable-next-line no-undef
      require('@iconify/tailwind')
    ]
  };


