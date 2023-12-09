import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, 
    // eslint-disable-next-line no-undef
    require('@iconify/tailwind')
  ],
}
