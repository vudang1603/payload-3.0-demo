/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B30B7E',
        'primary-hover': '#8C0962',
        'primary-light': '#fbebf7',
        secondary: '#5C1081',
        'secondary-hover': '#480A66',
        'text-muted': '#52525b',
        'text-dark': '#09090b',
      },
      fontFamily: {
        title: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
