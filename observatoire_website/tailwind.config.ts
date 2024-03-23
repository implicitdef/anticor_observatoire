import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bleuanticor: {
          50: '#E5EBFA',
          100: '#CBD7F6',
          200: '#97AFED',
          300: '#678BE4',
          400: '#3363DB',
          500: '#1F49B2', // le vrai bleu anticor
          600: '#193B8F',
          700: '#132C6D',
          800: '#0C1C45',
          900: '#060E23',
          950: '#030711',
        },
      },
    },
  },
  plugins: [],
}
export default config
