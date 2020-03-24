describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/test/reset')
      const user_1 = {
        name: 'abcd1',
        username: 'abcd1',
        password: 'asdasdas'
      }
      cy.request('POST', 'http://localhost:3001/api/user/', user_1)
      const user_2 = {
        name: 'abcd2',
        username: 'abcd2',
        password: 'asdasdas'
      }
      cy.request('POST', 'http://localhost:3001/api/user/', user_2)
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
      cy.get('[data-cy=username]')
      cy.get('[data-cy=password]')
      cy.get('[data-cy=submit]')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('[data-cy=username]').type('abcd1')
            cy.get('[data-cy=password]').type('asdasdas')
            cy.get('[data-cy=submit]').click()
            cy.contains('logout').click()
        })
        it('fails with wrong credentials', function() {
            cy.get('[data-cy=username]').type('abcd1')
            cy.get('[data-cy=password]').type('aaaaa')
            cy.get('[data-cy=submit]').click()
            cy.contains('invalid username or password')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.get('[data-cy=username]').type('abcd1')
            cy.get('[data-cy=password]').type('asdasdas')
            cy.get('[data-cy=submit]').click()
        })
        it('A blog can be created', function() {
            cy.contains('New Post').click()
            cy.get('[data-cy=title]').type('Best practice of Cypress')
            cy.get('[data-cy=author]').type('Cypress')
            cy.get('[data-cy=url]').type('https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements')
            cy.get('[data-cy=post]').click()
            cy.contains('Best practice of Cypress Cypress')
        })

    })
    describe.only('When logged in and post successfully', function(){
        beforeEach(function(){
            cy.get('[data-cy=username]').type('abcd1')
            cy.get('[data-cy=password]').type('asdasdas')
            cy.get('[data-cy=submit]').click()
            cy.contains('New Post').click()
            cy.get('[data-cy=title]').type('Best practice of Cypress')
            cy.get('[data-cy=author]').type('Cypress')
            cy.get('[data-cy=url]').type('https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements')
            cy.get('[data-cy=post]').click()
        })
        it('A blog can be liked', function() {
            cy.contains('Best practice of Cypress Cypress').click()
            cy.get('[data-cy=like]').click()
            cy.contains('1 likes')
        })
        it('A blog can be removed', function() {
            cy.contains('Best practice of Cypress Cypress').click()
            cy.get('[data-cy=remove]').click()
            cy.contains('Best practice of Cypress removed')
            cy.contains('Best practice of Cypress Cypress').should('not.exist')
        })
    })  
    describe.only('When logged in and one post exists', function() {
        beforeEach(function(){
            cy.get('[data-cy=username]').type('abcd1')
            cy.get('[data-cy=password]').type('asdasdas')
            cy.get('[data-cy=submit]').click()
            cy.contains('New Post').click()
            cy.get('[data-cy=title]').type('Best practice of Cypress')
            cy.get('[data-cy=author]').type('Cypress')
            cy.get('[data-cy=url]').type('https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements')
            cy.get('[data-cy=post]').click()
            cy.contains('logout').click()
            cy.get('[data-cy=username]').type('abcd2')
            cy.get('[data-cy=password]').type('asdasdas')
            cy.get('[data-cy=submit]').click()
            cy.contains('New Post').click()
            cy.get('[data-cy=title]').type('Best practice of Cypress 2')
            cy.get('[data-cy=author]').type('Cypress')
            cy.get('[data-cy=url]').type('https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements')
            cy.get('[data-cy=post]').click()
        })

        it('A blog cannot be removed', function() {
            cy.contains('Best practice of Cypress Cypress').click()
            cy.get('[data-cy=remove]').eq(0).click()
            cy.contains('Unable to remove')
        })

        it('Sorted blogs', function() {
            cy.contains('Best practice of Cypress 2 Cypress').click()
            cy.get('.likeBtn').eq(1).click()
            cy.contains('Best practice of Cypress Cypress').click()
            cy.get('.like_num').eq(0).should('contain', '1 likes')
        })
    })

})