import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1e3a5f',
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#1e3a5f',
          950: '#102a43',
        },
        teal: {
          DEFAULT: '#4a9b9b',
          50: '#f0fafa',
          100: '#d0f0f0',
          200: '#a8e0e0',
          300: '#7acbcb',
          400: '#4a9b9b',
          500: '#3d8585',
          600: '#326e6e',
          700: '#285858',
          800: '#1f4545',
          900: '#163333',
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-xl': ['2.25rem', { lineHeight: '1.25' }],
        'heading-lg': ['1.875rem', { lineHeight: '1.3' }],
        'heading': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.25rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.7' }],
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        'slow': '800ms',
        'slower': '1200ms',
        'slowest': '1600ms',
      },
      transitionTimingFunction: {
        'enterprise': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
