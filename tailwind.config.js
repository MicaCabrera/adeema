/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e8f0ff',
          100: '#c3d4ff',
          200: '#9ab5ff',
          300: '#6e93ff',
          400: '#4d78ff',
          500: '#2d5eff',
          600: '#1f4de0',
          700: '#1339b8',
          800: '#0a2890',
          900: '#041a6e',
        },
        accent: {
          DEFAULT: '#00e5ff',
          dark: '#00b8d4',
        },
        dark: {
          DEFAULT: '#0a0e1a',
          100: '#0f1525',
          200: '#141c32',
          300: '#1c2640',
          400: '#243050',
        },
        surface: {
          DEFAULT: '#141c32',
          light: '#1c2640',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Regla de diseño: todo border-radius del sitio debe ser múltiplo de
      // 8px. `lg` (8px), `2xl` (16px) y `3xl` (24px) ya cumplían en el
      // default de Tailwind y quedan igual; acá solo se remapean los pasos
      // que no cumplían (sm/DEFAULT/md/xl) para que ninguna clase estándar
      // pueda generar un radio fuera de la regla. `full` queda exento
      // (9999px, no es un valor fijo en px).
      borderRadius: {
        sm: '8px',
        DEFAULT: '8px',
        md: '8px',
        xl: '16px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d5eff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}


