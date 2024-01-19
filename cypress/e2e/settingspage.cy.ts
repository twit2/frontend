/// <reference types="Cypress" />

describe('Settings page flow', () => {
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
        cy.visit(`/settings`);
    })

    it('loads the settings page', () => {
        cy.document()
            .its('contentType')
            .should('eq', 'text/html');

        cy.get('.hdr-title').contains("Settings");
        cy.get('.ui-cmd-list').contains("Account Settings");
        cy.get('.view.settings').contains("Log out");
    });
    
    it('should let the user change their password', ()=>{
        cy.get('.view.settings').contains("Account Settings").click();
        cy.get('.ui-desc-btn').contains("Change account password");
        cy.get('.ui-desc-btn').contains("Change...").click();
        cy.get('.set-pwd-dlg input').type(TEST_PASSWORD);
        cy.get('.set-pwd-dlg').contains("Change").click();
        cy.contains("Password has been updated successfully");
    });

    it('should be able to log the user out', ()=>{
        cy.get('.view.settings').contains("Log out").click();
        cy.contains("Create Account"); // Homepage has this text
    });

    
})