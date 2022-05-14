/* eslint-disable global-require */
module.exports = {
	content: ['./src/**/*.tsx'],
	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				primary: '#95c431',
				secondary: '#373435',
			},
		},
	},

	plugins: [require('@tailwindcss/forms')],
};
