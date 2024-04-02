import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  blocklist: [
    './src/app/calendar.tsx'
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake"], //when there's multiple themes, bottom of page turns into inconsistent color
  },
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // colors: {
      //   'dPrimary': '#242424',
      //   'dSecondary': '#171717',
      //   'dText': '#c4c4c4',
      //   'dBlack': '#092635',
      //   'dTeal': '#1B4242',
      //   'dSage': '#5C8374',
      //   'dSageLight': '#9EC8B9',
      // },
    },
    fontFamily: {
      sans: ['Kanit', 'sans-serif']
    }
  },
}

export default config
