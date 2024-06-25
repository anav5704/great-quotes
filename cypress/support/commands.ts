/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
    cy.request('GET', 'http://localhost:3000/api/auth/csrf').then((csrfResp) => {
        const csrfToken = csrfResp.body.csrfToken

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/auth/callback/credentials',
            body: {
                email: Cypress.env("GOOGLE_EMAIL"),
                password: Cypress.env("GOOGLE_PASSWD"),
                csrfToken: csrfToken
            },
            followRedirect: false
        }).then((loginResp) => {
            if (loginResp.status === 302 && loginResp.redirectedToUrl) {
                cy.visit(loginResp.redirectedToUrl).then(() => {
                    cy.getCookies().then((cookies) => {
                        cookies.forEach((cookie) => {
                            cy.setCookie(cookie.name, cookie.value)
                        })
                    })
                })
            } else {
                throw new Error('Unexpected response during login')
            }
        })
    })
})