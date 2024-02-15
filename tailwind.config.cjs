/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main01: '#972317',
        main02: '#c25247',
        main03: '#e89f88',
        main04: '#fecdbd',
        main05: '#fff1f1',
        sub01: '#f2a93c',
        sub02: '#f6b95e',
        sub03: '#ffdcaf',
        sub04: '#fff1d8',
        sub05: '#fef1ec',
        gt01: '#333333',
        gt02: '#747474',
        gt03: '#af7d3a',
        gt04: '#d8a26b',
        gt05: '#ecceb9',
      },
      fontSize: {
        xs: [
          'clamp(0.625rem, 0.553rem + 0.31vw, 0.75rem)',
          { lineHeight: '1.5' },
        ], // sp:10px
        sm: [
          'clamp(0.75rem, 0.678rem + 0.31vw, 0.875rem)',
          { lineHeight: '1.5' },
        ], // sp:12px
        base: [
          'clamp(0.875rem, 0.803rem + 0.31vw, 1rem)',
          { lineHeight: '1.5' },
        ], //sp:14px
        lg: ['clamp(1rem, 0.928rem + 0.31vw, 1.125rem)', { lineHeight: '1.5' }], // sp:16px
        xl: [
          'clamp(1.125rem, 0.981rem + 0.62vw, 1.375rem)',
          { lineHeight: '1.5' },
        ], // sp:18px
        '2xl': [
          'clamp(1.375rem, 1.158rem + 0.92vw, 1.75rem)',
          { lineHeight: '1.5' },
        ], // sp:22px
        '3xl': [
          'clamp(1.75rem, 1.606rem + 0.62vw, 2rem)',
          { lineHeight: '1.5' },
        ], // sp:28px
        '4xl': [
          'clamp(2.75rem, 2.389rem + 1.54vw, 3.375rem)',
          { lineHeight: '1.5' },
        ], // sp 44px
      },
      fontFamily: {
        en: '"Roboto", sans-serif',
      },
    },
  },
  plugins: [],
};
