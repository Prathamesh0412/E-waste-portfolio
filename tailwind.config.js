/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F6FBF8',
        surface: '#FFFFFF',
        primary: '#087F5B',
        teal: '#0F766E',
        accent: '#65A30D',
        soft: '#DFF4E9',
        'soft-green': '#E8F5EF',
        dark: '#102A24',
        secondary: '#52645E',
        muted: '#71827C',
        border: '#D5E5DE',
        'subtle-accent': '#A7DCC4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'Poppins', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'subtitle': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.75' }],
        'small': ['0.875rem', { lineHeight: '1.6' }],
        'label': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'tiny': ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      maxWidth: {
        'content': '1280px',
        'normal': '1200px',
        'text': '1000px',
      },
      spacing: {
        'section': 'clamp(4.375rem, 8vw, 7.5rem)',
        'section-sm': 'clamp(3.125rem, 6vw, 5.625rem)',
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(16, 42, 36, 0.04), 0 4px 12px rgba(16, 42, 36, 0.03)',
        'card-hover': '0 4px 16px rgba(16, 42, 36, 0.08), 0 1px 4px rgba(16, 42, 36, 0.04)',
        'nav': '0 1px 0 rgba(213, 229, 222, 0.6)',
        'modal': '0 24px 48px rgba(16, 42, 36, 0.12), 0 8px 24px rgba(16, 42, 36, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
