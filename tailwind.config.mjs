/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#fbf9f4',
          card: '#ffffff',
          accent: '#fef3c7',
        },
        ink: {
          primary: '#1c1917',
          secondary: '#57534e',
          muted: '#78716c',
        },
        accent: {
          DEFAULT: '#b45309',
          hover: '#92400e',
          soft: '#d97706',
        },
        border: {
          DEFAULT: '#e7e5e4',
          hover: '#d6d3d1',
        },
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.25rem, 4vw + 1rem, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'headline': ['clamp(1.75rem, 2vw + 1rem, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        'section': '5rem',
        'section-lg': '7rem',
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.03)',
        'card-hover': '0 4px 12px rgba(180,83,9,.08)',
      },
    },
  },
  plugins: [],
}
