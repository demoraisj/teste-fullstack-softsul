module.exports = {
    content: ['./**/*.tsx'],
    theme: {
        extend: {
            colors: {
                primary: '#95c431',
                secondary: '#373435',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
    corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
