// tailwind.config.js
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      extend: {},
      colors: {
        primary: '#0a0a23',
        accent: '#00f0ff',
        highlight: '#7f5af0',
      },
      animation: {
        fade: 'fade 1s ease-out forwards',
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
