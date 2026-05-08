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
          DEFAULT: '#0F2A1D',
          light: '#1B4332',
          dark: '#0A1F14',
        },
        accent: {
          DEFAULT: '#C9A227',
          light: '#E8C547',
          dark: '#A8851D',
        },
        cream: '#FAF7F2',
        surface: '#FFFFFF',
        danger: '#DC2626',
        success: '#059669',
        muted: '#6B7280',
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
        'touch-target': '48px',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        'xl2': '18px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'large': '0 12px 40px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
