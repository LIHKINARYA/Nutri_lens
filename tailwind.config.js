/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        green: '#1D9E75',
        greenLight: '#E1F5EE',
        greenDark: '#0F6E56',
        blue: '#378ADD',
        blueLight: '#E6F1FB',
        amber: '#EF9F27',
        amberLight: '#FAEEDA',
        red: '#E24B4A',
        redLight: '#FCEBEB',
        bg: '#F7F6F3',
        card: '#FFFFFF',
        textMain: '#1A1A1A',
        textMuted: '#6B6A66',
        textFaint: '#A8A7A3',
      },
    },
  },
  plugins: [],
};
