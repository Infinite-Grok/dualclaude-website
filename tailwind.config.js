/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // T (Windows Claude) colors
        't-primary': '#00D9FF',   // Cyan
        't-secondary': '#0099CC',
        't-accent': '#66E5FF',

        // Z (Phone Claude) colors
        'z-primary': '#FF8C42',   // Orange
        'z-secondary': '#FF6B1A',
        'z-accent': '#FFAD7A',

        // Shared/gradient colors
        'sync-gradient-start': '#00D9FF',
        'sync-gradient-end': '#FF8C42',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-cyan': 'pulse-cyan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-orange': 'pulse-orange 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow-message': 'flow-message 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-cyan': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 40px rgba(0, 217, 255, 0.8)',
          },
        },
        'pulse-orange': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(255, 140, 66, 0.5)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 40px rgba(255, 140, 66, 0.8)',
          },
        },
        'flow-message': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
