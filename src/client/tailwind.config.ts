import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bolalar uchun yorqin va quvnoq ranglar
        primary: {
          50: '#fef7ff',
          100: '#fdeeff',
          200: '#fcdcff',
          300: '#fabbff',
          400: '#f689ff',
          500: '#ed56ff',
          600: '#d934e8',
          700: '#b821c4',
          800: '#971ca0',
          900: '#7c1d82',
          950: '#520a5a',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Bolalar uchun maxsus ranglar
        kids: {
          pink: '#ff69b4',
          purple: '#9370db',
          blue: '#4169e1',
          green: '#32cd32',
          yellow: '#ffd700',
          orange: '#ff8c00',
          red: '#ff6347',
          cyan: '#00ced1',
          lime: '#adff2f',
          coral: '#ff7f50',
        },
        // O'zbekiston bayrog'i ranglari
        uzbekistan: {
          blue: '#0099cc',
          white: '#ffffff',
          green: '#1eb53a',
          red: '#ce1126',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Fredoka One', 'cursive'], // Bolalar uchun o'yinchoq font
        comic: ['Comic Neue', 'cursive'], // Bolalar uchun komiks font
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'fun': '2.5rem', // Bolalar uchun o'yinchoq border radius
      },
      boxShadow: {
        'fun': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'kids': '0 20px 25px -5px rgba(255, 105, 180, 0.3), 0 10px 10px -5px rgba(255, 105, 180, 0.1)',
        'glow': '0 0 20px rgba(237, 86, 255, 0.5)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(45deg, #ff69b4, #9370db, #4169e1, #32cd32, #ffd700, #ff8c00)',
        'gradient-kids': 'linear-gradient(135deg, #ff69b4 0%, #9370db 25%, #4169e1 50%, #32cd32 75%, #ffd700 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
