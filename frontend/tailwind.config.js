/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            tableLayout: ['hover', 'focus'],
        },
        container: {
            center: true,
        },
    },
    plugins: [],
}

