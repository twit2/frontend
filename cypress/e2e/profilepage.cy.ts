/// <reference types="Cypress" />

describe('Profile page flow', () => {
    const TEST_USERNAME = `cyuser_${Math.floor(Math.random() * 100000)}`;
    const TEST_PASSWORD = `test`;
    const TEST_POST_TEXT = `Test post text!`;
    const TEST_BIO_TEXT = "Test bio text!";
    const TEST_DISPNAME = "Cypress User";

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
        cy.visit(`/user/@${TEST_USERNAME}`);
    })

    it('loads the profile page', () => {
        cy.document()
            .its('contentType')
            .should('eq', 'text/html');

        cy.get('.ui-pfbanner>.profile>.information').contains(TEST_USERNAME);
    });

    it('should contain an edit button for current user', ()=>{
        cy.get('.ui-pfbanner>.profile>.information button').contains("Edit");
    });

    it('should be able to edit the biography', ()=> {
        cy.get('.ui-pfbanner>.profile>.information button').contains("Edit").click();
        cy.get('.dlg-profile-edit .icomponent').eq(1).type(TEST_BIO_TEXT);
        cy.get('.dlg-profile-edit button').contains("Save").click();
        cy.get('.bio-box').contains(TEST_BIO_TEXT);
    });

    it('should be able to edit the display name', ()=> {
        cy.get('.ui-pfbanner>.profile>.information button').contains("Edit").click();
        cy.get('.dlg-profile-edit .icomponent').eq(0).type(TEST_DISPNAME);
        cy.get('.dlg-profile-edit button').contains("Save").click();
        cy.get('.information .name').contains(TEST_DISPNAME);
    });

    it('should be able to remove the biography', ()=> {
        cy.get('.ui-pfbanner>.profile>.information button').contains("Edit").click();
        cy.get('.dlg-profile-edit .icomponent').eq(1).clear();
        cy.get('.dlg-profile-edit button').contains("Save").click();
        cy.get('.bio-box').should('not.include.text', TEST_BIO_TEXT);
    });

    it('should be able to remove display name', ()=> {
        cy.get('.ui-pfbanner>.profile>.information button').contains("Edit").click();
        cy.get('.dlg-profile-edit .icomponent').eq(0).clear();
        cy.get('.dlg-profile-edit button').contains("Save").click();
        cy.get('.ui-pfbanner').should('not.include.text', TEST_DISPNAME);
    });

    it('should be able to create a post', ()=> {
        cy.get('.sidebar button').contains("Create Post").click();
        cy.get('.ui-post-editor>textarea').type(TEST_POST_TEXT);
        cy.get('.new-post-dlg .bottom button').click();
        cy.get('.post-box>.ui-post').eq(0).contains(TEST_POST_TEXT);
    });

    it('should be able to view the created post', ()=> {
        cy.get('.post-box>.ui-post').eq(0).click();
        cy.get('.hdr-title').contains("Post");
        cy.contains(TEST_POST_TEXT);
    });
})