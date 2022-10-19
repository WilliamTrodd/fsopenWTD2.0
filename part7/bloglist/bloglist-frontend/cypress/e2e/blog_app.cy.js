describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      'username': 'W.Trodd',
      'name': 'W Trodd',
      'password': 'newPass123'
    }
    const user2 = {
      'username': 'User2',
      'name': 'User Two',
      'password': 'password2'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.get('#username')
    cy.get('#password')
  })

  describe('login', function() {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('W.Trodd')
      cy.get('#password').type('newPass123')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'W.Trodd successfully logged in')
        .and('have.css', 'color', 'rgb(0, 139, 26)')
      cy.contains('W Trodd logged in')
    })
    it('fails with wrong password', function () {
      cy.get('#username').type('W.Trodd')
      cy.get('#password').type('WRONG')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'incorrect username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username:'W.Trodd', password:'newPass123' })
    })

    it('a new blog can be added', function() {
      cy.contains('create new blog').click()
      cy.get('#blog-title').type('A new blog')
      cy.get('#blog-author').type('A new author')
      cy.get('#blog-url').type('www.test.com')

      cy.get('#blog-submit').click()

      cy.get('.notification')
        .should('contain', 'a new blog A new blog by A new author added')
        .and('have.css', 'color', 'rgb(0, 139, 26)')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'NewTestBlog',
          author: 'NewTestAuth',
          url: 'testURL.com'
        })
      })
      it('can be liked', function () {
        cy.contains('NewTestBlog')
          .contains('view')
          .click()
        cy.contains('likes: 0')
        cy.contains('like')
          .click()
        cy.contains('likes: 1')
      })
      it('can be deleted', function () {
        cy.contains('NewTestBlog')
          .contains('view')
          .click()
        cy.contains('delete').click()

        cy.get('html').should('not.contain', 'NewTestBlog')
      })
    })
    it('has no delete when different user is logged in', function (){
      cy.createBlog({
        title: 'NewTestBlog',
        author: 'NewTestAuth',
        url: 'testURL.com'
      })
      cy.get('#logout-button').click()
      cy.login({ username: 'User2', password:'password2' })

      cy.contains('NewTestBlog')
        .contains('view')
        .click()
      cy.get('html').should('not.contain', 'delete')
    })
    it('multiple blogs are sorted by likes', function () {
      cy.createBlog({
        title: 'The title with the most likes',
        author: 'NewTestAuth',
        url: 'testURL.com/2',
        likes: 10
      })
      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'NewTestAuth',
        url: 'testURL.com/2',
        likes: 4
      })
      cy.createBlog({
        title: 'The title with the third most likes',
        author: 'NewTestAuth',
        url: 'testURL.com/2',
        likes: 2
      })

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')

      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')

      cy.get('.blog').eq(2).should('contain', 'The title with the third most likes')
    })


  })
})