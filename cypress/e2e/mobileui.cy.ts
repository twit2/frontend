/// <reference types="Cypress" />

describe('Mobile UI page flow', () => {
    const TEST_USERNAME = `cyuser_${Math.floor(Math.random() * 100000)}`;
    const TEST_PASSWORD = `test`;

    before(()=>{        
        cy.request('POST', `${Cypress.env("gateway-url")}/auth/register`, {
            username: TEST_USERNAME,
            password: TEST_PASSWORD
        }).as('cred');

        cy.get('@cred').should((response)=>{
            expect(response.body).to.have.property('success', true);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.a('string');
        });
    });

    beforeEach(()=>{
        cy.login(TEST_USERNAME, TEST_PASSWORD);
        cy.visit(`/discover`);
        cy.viewport(550, 750);
    })

    it('shows the mobile UI elements', () => {
        cy.document()
            .its('contentType')
            .should('eq', 'text/html');

        cy.get('.ui-hamburger-menu');
    });

    it('shows the hamburger menu correctly', () => {
        cy.get('.ui-hamburger-menu').click();
        cy.get('.ui-hamburger-list').contains("Discover");
    });

    it('can close the hamburger menu correctly', () => {
        cy.get('.ui-hamburger-menu').click();
        cy.get('.ui-hamburger-list').contains("Discover");
        cy.get('.ui-hamburger-menu.open').click();
        cy.get('.ui-hamburger-list').should('not.exist');
    });
});