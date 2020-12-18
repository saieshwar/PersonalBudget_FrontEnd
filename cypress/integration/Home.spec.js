/// <reference types="cypress" />

context('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
   
  })
  it('should have welcome to h1', () => {
    cy.get('h1').contains('Personal Budget');
  })
  it('should look the same', () => {
    cy.eyesOpen({
      appName: 'My App',
      testName: 'HomePage check'
    });
    cy.eyesCheckWindow();
    cy.eyesClose();
  })
})
