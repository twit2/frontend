/// <reference types="Cypress" />

describe('Homepage flow', () => {
    const TEST_USERNAME = Cypress.env('test-username');
    const TEST_PASSWORD = Cypress.env('test-password');

    // To test account creation, we must generate a random username
    beforeEach(()=>{
        cy.visit('/');
    })

    it('loads the homepage', () => {
        cy.document()
            .its('contentType')
            .should('eq', 'text/html');

        cy.contains('Log In');
        cy.contains('Create Account');
    });

    it('creates a new account', ()=>{
        cy.get('.buttons>button').eq(1).click();
        cy.get('.register-dlg input').eq(0).type(TEST_USERNAME);
        cy.get('.register-dlg input').eq(1).type(TEST_PASSWORD);
        cy.get('.register-dlg button').click();

        // Page should start at feed and contain the current user.
        cy.contains('My Feed');
        cy.contains(TEST_USERNAME);
    });

    it('logs in to an existing account', ()=>{
        cy.get('.buttons>button').eq(0).click();
        cy.get('.login-dlg input').eq(0).type(TEST_USERNAME);
        cy.get('.login-dlg input').eq(1).type(TEST_PASSWORD);
        cy.get('.login-dlg button').click();

        // Page should start at feed and contain the current user.
        cy.contains('My Feed');
        cy.contains(TEST_USERNAME);
    });
})