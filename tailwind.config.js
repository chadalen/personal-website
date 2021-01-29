/* eslint-disable global-require */
module.exports = {
  purge: [
    './src/**/*.jsx',
    './src/**/*.js',
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
