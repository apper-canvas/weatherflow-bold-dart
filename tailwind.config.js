/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#64748B',
        accent: '#F59E0B',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        weather: {
          sunny: {
            primary: '#F59E0B',
            secondary: '#FED7AA',
            background: '#FEF3C7'
          },
          cloudy: {
            primary: '#64748B',
            secondary: '#CBD5E1',
            background: '#F1F5F9'
          },
          rainy: {
            primary: '#3B82F6',
            secondary: '#93C5FD',
            background: '#DBEAFE'
          },
          snowy: {
            primary: '#E2E8F0',
            secondary: '#F8FAFC',
            background: '#FFFFFF'
          },
          stormy: {
            primary: '#6366F1',
            secondary: '#A5B4FC',
            background: '#EEF2FF'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        display: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
      },
      backgroundImage: {
        'gradient-sunny': 'linear-gradient(135deg, #FEF3C7 0%, #FED7AA 100%)',
        'gradient-cloudy': 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
        'gradient-rainy': 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
        'gradient-snowy': 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        'gradient-stormy': 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)'
      }
    },
  },
  plugins: [],
}