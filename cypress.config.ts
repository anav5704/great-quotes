import { plugins } from 'cypress-social-logins'
import { defineConfig } from "cypress"

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        supportFile: "cypress/support/commands.ts",
        "chromeWebSecurity": false,
        setupNodeEvents(on, config) {
            on("task", {
                GoogleSocialLogin: plugins.GoogleSocialLogin,
            })
        },
    },
})
