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
        // Brand blues (from the design system swatches)
        blue: '#1863DC',
        'blue-sky': '#7B9BE0',
        'blue-navy': '#1A237E',
        // Dark maroon (3rd small-button variant in the design system)
        maroon: '#7A1A5C',
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
