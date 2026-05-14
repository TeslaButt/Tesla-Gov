import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19', // Deep space blue/black
        surface: '#1A233A', // Lighter blue for cards
        primary: '#38BDF8', // Stellar blue
        accent: '#818CF8', // Indigo accent
        success: '#10B981', // Emerald for Yes votes
        danger: '#F43F5E', // Rose for No votes
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-stellar': 'linear-gradient(to right, #38BDF8, #818CF8)',
      },
    },
  },
  plugins: [],
};
export default config;
