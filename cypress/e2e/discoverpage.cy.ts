/// <reference types="Cypress" />

describe('Discover page flow', () => {
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
    })

    it('loads the discover page', () => {
        cy.document()
            .its('contentType')
            .should('eq', 'text/html');

        cy.get('.hdr-title').contains("Discover");
    });
});