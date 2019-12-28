describe('Blog post ', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/test/reset')
      const user = {
        name: 'abcd123',
        username: 'abcd',
        password: 'asdasdas'
      }
      cy.request('POST', 'http://localhost:3001/api/user/', user)
      cy.visit('http://localhost:3000')
      cy.get('[data-cy=Login-toggle]').click()
      cy.get('[data-cy=username]').type('abcd')
      cy.get('[data-cy=password]').type('asdasdas')
      cy.get('[data-cy=login]').click()
    })
  
    it('Blog post, like and comment', function() {
      cy.contains('New Post').click()
      cy.get('[data-cy=title]').type('Best practice of Cypress')
      cy.get('[data-cy=author]').type('Cypress')
      cy.get('[data-cy=url]').type('https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements')
      cy.get('[data-cy=post]').click()
      cy.contains('A new blog: Best practice of Cypress by Cypress added')
      cy.get('[data-cy="Best practice of Cypress"').click()
      cy.get('[data-cy=like]').click()
      cy.contains('1 likes')
      cy.get('[data-cy=comment-text]').type('This is nonsense')
      cy.get('[data-cy=comment-btn]').click()
      cy.contains('This is nonsense')
    })
  
    
})