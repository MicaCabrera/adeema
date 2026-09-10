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
        // Sistema de fondos en cascada (ref. williamsgptech.com), con los
        // colores de ADEEMA: dark-900 (DEFAULT) es el fondo base de toda la
        // página — más oscuro que antes (#0a0e1a) para dar más contraste
        // contra el blanco. dark-100/200/300/400 quedan igual, son pasos
        // intermedios ya usados en distintos componentes.
        dark: {
          DEFAULT: '#020D1A',
          100: '#0f1525',
          200: '#141c32',
          300: '#1c2640',
          400: '#243050',
        },
        // "surface" (dark-800 equivalente): el navy que antes hacía de
        // fondo (#043766) pasa a este rol — el tono para cards/paneles que
        // necesitan distinguirse del fondo base, no el fondo de página.
        surface: {
          DEFAULT: '#043766',
          light: '#1c2640',
        },
        // Escala del acento de marca (brand-500 = #55B4EB, sin cambios)
        // generada con color-mix() en vez de hardcodear cada tinte/sombra —
        // mismo patrón técnico que la escala brand-100..900 de Williams.
        brand: {
          100: 'color-mix(in srgb, #55B4EB, white 80%)',
          200: 'color-mix(in srgb, #55B4EB, white 60%)',
          300: 'color-mix(in srgb, #55B4EB, white 40%)',
          400: 'color-mix(in srgb, #55B4EB, white 20%)',
          500: '#55B4EB',
          600: 'color-mix(in srgb, #55B4EB, black 15%)',
          700: 'color-mix(in srgb, #55B4EB, black 30%)',
          800: 'color-mix(in srgb, #55B4EB, black 45%)',
          900: 'color-mix(in srgb, #55B4EB, black 60%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Sistema de radios (ref. williamsgptech.com): reemplaza la regla
      // anterior de "múltiplo de 8px" (que en la práctica se usaba como
      // "esquinas rectas" en varios componentes). Radios chicos en vez de
      // 0px o de los valores grandes por defecto de Tailwind:
      // - small (4px): inputs, botones, tags.
      // - medium (~6px): cards/paneles.
      // - round (100vw): elementos circulares.
      // Los nombres estándar de Tailwind (sm/DEFAULT/lg/xl/2xl/3xl) se
      // remapean a small o medium para que TODO el sitio (incluidos
      // componentes no tocados en este cambio, como Navbar/Footer/Contact)
      // quede dentro del nuevo sistema sin tener que tocar cada archivo.
      borderRadius: {
        none: '0px',
        small: '0.25rem',
        DEFAULT: '0.25rem',
        sm: '0.25rem',
        medium: '0.375rem',
        md: '0.375rem',
        lg: '0.375rem',
        xl: '0.375rem',
        '2xl': '0.375rem',
        '3xl': '0.375rem',
        round: '100vw',
        full: '9999px',
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


