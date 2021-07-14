module.exports = {
	mode: 'jit',
  purge: ['src/**/*.tsx', 'public/index.html'],
  dark: false,
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        white: '#FFFFFF',
        mint: '#BCE9C7',
        green: '#9BE097',
        yellow: '#F4AE23',
        orange: '#F68E2E',
        pink: '#DD7ED2',
        purple: {
          lightest: '#F6EFFE',
          light: '#D0B6EF',
          DEFAULT: '#5F229F',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
