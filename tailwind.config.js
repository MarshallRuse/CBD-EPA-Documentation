/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                stretch: "stretch 1.2s ease forwards",
            },
            colors: {
                secondary: {
                    50: "#dde9ef",
                    100: "#bbd3e0",
                    200: "#98bdd0",
                    300: "#74a8c1",
                    400: "#4c93b2",
                    500: "#007FA3",
                    600: "#006689",
                    700: "#004f70",
                    800: "#003858",
                    900: "#002340",
                },
            },
            keyframes: {
                stretch: {
                    "0%, 100%": {
                        transform: "scale3d(1,1,1)",
                    },
                    "15%": {
                        transform: "scale3d(0.65,1.55,1)",
                    },
                    "30%": {
                        transform: "scale3d(0.75,1.25,1)",
                    },
                    "40%": {
                        transform: "scale3d(1.25,0.75,1)",
                    },
                    "50%": {
                        transform: "scale3d(0.85,1.15,1)",
                    },
                    "65%": {
                        transform: "scale3d(1.05,0.95,1)",
                    },
                    "75%": {
                        transform: "scale3d(0.95,1.05,1)",
                    },
                },
            },
        },
    },
    plugins: [],
};
