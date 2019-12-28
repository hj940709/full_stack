describe('Blog Init ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    const user = {
      name: 'abcd123',
      username: 'abcd',
      password: 'asdasdas'
    }
    cy.request('POST', 'http://localhost:3001/api/user/', user)
    cy.visit('http://localhost:3000')
  })

  it('Front page can be opened', function() {
    cy.contains('Login')
  })

  it('Login and Logout', function() {
    cy.get('[data-cy=Login-toggle]').click()
    cy.get('[data-cy=username]').type('abcd')
    cy.get('[data-cy=password]').type('asdasdas')
    cy.get('[data-cy=login]').click()
    cy.contains('Logout').click()
    cy.contains('Login')
  })

  it('Login fail notification', function() {
    cy.contains('Login').click()
    cy.get('input:first').type('abcd1')
    cy.get('input:last').type('asdasdas')
    cy.get('form').contains('Login').click()
    cy.contains('invalid username or password')
  })

})

