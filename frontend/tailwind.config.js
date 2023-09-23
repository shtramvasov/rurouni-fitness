/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
		colors: {
			white: {
				primary: '#FFFFFF',
				light: '#F5F7FB',
			},
			black: {
				primary: '#10192B',
				light: '#243962',
			},
			gray: {
				primary: '#d6d6d6',
				dark: '#747881',
				light: '#E7E7E7',
			},
			slate: {
				primary: '#e1e4f4',
				dark: '#96A1DD',
				light: '#ECEEF9',
			},
			green: {
				primary: '#61C86A',
				dark: '#3AA543',
				light: '#9CDDA2',
			},
			blue: {
				primary: '#5A80E3',
				dark: '#3866DD',
				light: '#98B0EE',
			},
			red: {
				primary: '#FF5664',
				dark: '#FF2B3D',
				light: '#FF808B',
			},
			orange: {
				primary: '#FA7D47',
				dark: '#F96A2D',
				light: '#FBA27C',
			},
			yellow: {
				primary: '#FBDC62',
				dark: '#F8C809',
				light: '#FBE27C',
			},
			purple: {
				primary: '#B662FB',
				dark: '#A947FA',
				light: '#CE96FC',
			},
		},
	},
  plugins: [],
}

