/** @type {import('tailwindcss').Config}*/
const config = {
    darkMode: 'class',
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            width: {
                layout: '1400px'
            },
            padding: {
                header: 'var(--header-height)'
            },
            margin: {
                header: 'var(--header-height)'
            },
            height: {
                header: 'var(--header-height)'
            },
            minHeight: {
                'with-header': 'calc(100vh - var(--header-height))'
            },
            fontFamily: {
                sans: ['Roboto', 'Poppins', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif']
            }
        }
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};

module.exports = config;
