/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#ffffff',
          soft: '#fafafa',
          dark: '#0B0F1A',
          card: '#ffffff',
          accent: '#F4FFD4',
        },
        ink: {
          primary: '#0B0F1A',
          secondary: '#3f4756',
          muted: '#6b7382',
          inverted: '#ffffff',
        },
        accent: {
          DEFAULT: '#C9FF00',
          hover: '#A8E600',
          dark: '#7FAE00',
          ink: '#0B0F1A',
        },
        border: {
          DEFAULT: '#e6e8ec',
          hover: '#0B0F1A',
          strong: '#0B0F1A',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Inter Variable"', 'Inter', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'mega': ['clamp(1.5rem, 5.5vw + 0.5rem, 5.5rem)', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display': ['clamp(2.25rem, 4vw + 1rem, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '800' }],
        'headline': ['clamp(1.875rem, 2.5vw + 1rem, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '800' }],
        'stat': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '800' }],
      },
      maxWidth: {
        container: '1240px',
        prose: '720px',
      },
      spacing: {
        'section': '6rem',
        'section-lg': '9rem',
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(11,15,26,.04)',
        'card-hover': '0 8px 24px rgba(11,15,26,.08)',
        'card-strong': '0 2px 0 rgba(11,15,26,1)',
      },
    },
  },
  plugins: [],
}
