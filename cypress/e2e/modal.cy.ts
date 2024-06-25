describe('Quote Modal', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.clearAllCookies()
        cy.login()
    })

    it('Should open create quote modal', () => {
        cy.get('button').contains(/add quote/i).click()
        cy.get('[data-test="quote-modal"]').contains(/create quote/i).should('be.visible')
    })

    it("Should open update quote modal", () => {
        cy.get('[data-test="update-quote"]').first().click()
        cy.get('[data-test="quote-modal"]').contains(/update quote/i).should('be.visible')
    })

    it("Should open delete quote modal", () => {
        cy.get('[data-test="delete-quote"]').first().click()
        cy.get('[data-test="quote-modal"]').contains(/delete quote/i).should('be.visible')
    })

    it("Should close modal", () => {
        cy.get('[data-test="update-quote"]').first().click()
        cy.get('[data-test="quote-modal"]').should('be.visible')

        cy.get("button").contains(/close/i).click()
        cy.get('[data-test="quote-modal"]').should('not.exist')
    })
})