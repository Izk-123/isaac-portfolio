import type { Config } from 'tailwindcss'

const config: Config = {
  // remove the darkMode: 'class' line
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config