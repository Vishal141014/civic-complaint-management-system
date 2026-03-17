/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF3EB',
          100: '#FFE5D5',
          300: '#FF8C38',
          DEFAULT: '#FF6B00',
        },
        green: {
          50: '#E6F7F2',
          DEFAULT: '#00875A',
          light: '#00C882',
        },
        navy: {
          50: '#F7F9FC',
          100: '#E2E8F0',
          DEFAULT: '#0D1B2A',
          light: '#1A2F45',
          dark: '#243B55',
        },
        status: {
          red: '#DC2626',
          yellow: '#D97706',
          blue: '#2563EB',
          purple: '#7C3AED',
        },
      },
      fontFamily: {
        baloo: ['Baloo 2', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '10px',
        xl: '12px',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulse: 'pulse 1.5s infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        slideInDown: 'slideInDown 0.6s ease-out',
      },
    },
  },
  plugins: [],
};
