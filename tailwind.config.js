/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
extend: {
      colors: {
        primary: '#F97316',
        secondary: '#78716C',
        accent: '#F59E0B',
        surface: {
          50: '#fef7ed',
          100: '#fef3e2',
          200: '#fde5c4',
          300: '#fbcf9b',
          400: '#f7b26f',
          500: '#f39549',
          600: '#ea7c2c',
          700: '#d26321',
          800: '#a8501d',
          900: '#87451b'
        },
        weather: {
          sunny: {
            primary: '#F97316',
            secondary: '#FDBA74',
            background: '#FED7AA'
          },
          cloudy: {
            primary: '#A8A29E',
            secondary: '#D6D3D1',
            background: '#F5F5F4'
          },
          rainy: {
            primary: '#0EA5E9',
            secondary: '#7DD3FC',
            background: '#E0F2FE'
          },
          snowy: {
            primary: '#E4E4E7',
            secondary: '#F4F4F5',
            background: '#FAFAFA'
          },
          stormy: {
            primary: '#8B5CF6',
            secondary: '#C4B5FD',
            background: '#F3F4F6'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        display: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
      },
      backgroundImage: {
        'gradient-sunny': 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)',
        'gradient-cloudy': 'linear-gradient(135deg, #F5F5F4 0%, #E7E5E4 100%)',
        'gradient-rainy': 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
        'gradient-snowy': 'linear-gradient(135deg, #FAFAFA 0%, #F4F4F5 100%)',
        'gradient-stormy': 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FEF3E2 0%, #FED7AA 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FDBA74 0%, #FB923C 100%)'
      }
    },
  },
  plugins: [],
}