// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            // colors: {
            //     primary: "#005770",
            //     secondary: "#002F3C",
            //     negative: "#D22E2E"
            // },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};