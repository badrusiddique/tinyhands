import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'landing-bg': '#FFFBF0',
        'canvas-bg': '#0D0D1A',
        coral: '#FF6B6B',
        yellow: '#FFD93D',
        green: '#6BCB77',
        blue: '#4D96FF',
        purple: '#C77DFF',
      },
      fontFamily: {
        nunito: ['var(--font-nunito)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
