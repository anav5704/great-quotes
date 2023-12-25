import { fontFamily } from "tailwindcss/defaultTheme"
const { nextui } = require("@nextui-org/react")
import { type Config } from "tailwindcss"

export default {
    content: [
        "./src/**/*.tsx",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-geist-mono)'],
            },
        },
    },
    darkMode: "class",
    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    primary: {
                         DEFAULT: "#ffffff",
                    },
 
                },
            },
            dark: {
                colors: {
                    primary: {
                         DEFAULT: "#ffffff",
                    },
                },
            },
        }
    })],
} satisfies Config;
