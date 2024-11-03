import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
	darkMode: 'selector',
  theme: {
    extend: {
			fontFamily: {
        inter: 'var(--inter-font)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
			animation: {
				fade: 'fadeIn .25s ease-in-out',
			},
			maxHeight: {
        '9/10': '90vh',
      },
			keyframes: {
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
			},
    },
  },
  plugins: [
		require("@tailwindcss/typography"),
	],
}
export default config
