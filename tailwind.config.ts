/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/preline/dist/*.js',
    './node_modules/flowbite/**/*.js',
  ],

  theme: {
    screens: {
      xs: '321px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      primary_color: '#FFF',
      secondary_color: '#FFE5E5',
      tertiary_color: '#F9F9F9',
      primary_CTA_Color: '#FB0105',
      primary_text_color: '#1A1A1A',
      secondary_text_color: '#3C3C3C',
      admin_overlay_bg_color: 'rgba(26, 26, 26, 0.80)',
    },
    fontSize: {
      admin_font_size: '24px',
      admin_font_size_lg: '56px',
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        mulish: ['Mulish', 'sans-serif'],
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        infiniteSlide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      spacing: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [require('preline/plugin'), require('flowbite/plugin')],
};
