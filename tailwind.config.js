/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './services/*.html',
    './conditions/*.html',
    './blog/*.html',
    './physicians/*.html',
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#32384e', deep: '#1e2233', light: '#4a5170', muted: '#32384e0d' },
        teal: { DEFAULT: '#499188', dark: '#357069', light: '#6ab0a6', pale: '#e8f4f2', wash: '#49918808' },
        cream: '#FAF9F6',
        sand: '#F3F1EC',
        ink: '#1a1a2e',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
