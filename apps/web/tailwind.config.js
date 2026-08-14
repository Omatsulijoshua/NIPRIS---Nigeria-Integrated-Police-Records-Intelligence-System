/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        policeSlate: '#0F172A',
        policeNavy: '#1E293B',
        policeGold: '#D97706',
        policeAlert: '#DC2626',
        policeGreen: '#16A34A',
      },
    },
  },
  plugins: [],
}
