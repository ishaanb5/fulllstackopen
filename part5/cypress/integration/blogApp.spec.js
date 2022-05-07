describe('Blog app', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/testing/reset',
    })
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/users',
      body: {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'sekret',
      },
    })
    cy.visit('/')
  })

  it('login form is shown', () => {
    cy.contains('label', 'username')
    cy.contains('label', 'password')
    cy.contains('button', 'login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('label', 'username').type('mluukkai')
      cy.contains('label', 'password').type('sekret')
      cy.contains('button', 'login').click()

      cy.contains('Matti Luukkainen logged in')
    })

    describe('fails with wrong credentials when', () => {
      it(' username input is empty', () => {
        cy.contains('label', 'password').type('sekret')
        cy.contains('button', 'login').click()

        cy.get('.error-notification')
          .contains('invalid username or password')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
      })

      it('password input is empty', () => {
        cy.contains('label', 'username').type('mluukkai')
        cy.contains('button', 'login').click()

        cy.get('.error-notification')
          .contains('invalid username or password')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
      })

      it('both username and password inputs are empty', () => {
        cy.contains('button', 'login').click()

        cy.get('.error-notification')
          .contains('invalid username or password')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
      })

      it('password is incorrect', () => {
        cy.contains('label', 'username').type('mluukkai')
        cy.contains('label', 'password').type('incorrectPassword')
        cy.contains('button', 'login').click()

        cy.get('.error-notification')
          .contains('invalid username or password')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })
  })

  describe(' logged in ', () => {
    beforeEach(() => {
      cy.login()
    })
    it('a new blog can be saved', () => {
      cy.contains('button', 'create new blog').click()
      cy.contains('label', 'title').type('test note created using cypress')
      cy.contains('label', 'author').type('Cypress')
      cy.contains('label', 'url').type('localhost')
      cy.get('[data-testid=newNoteSubmitBtn]').click()

      cy.get('[data-testid=blogs').should(
        'contain',
        'test note created using cypress'
      )
    })

    describe('and when some saved blogs exists', () => {
      describe('user can', () => {
        beforeEach(() => {
          const backendUrl = 'http://localhost:3003'

          const blog = {
            title: 'blog saved by current user',
            author: 'Author',
            url: 'https://www.somewhere.com',
            likes: 1,
          }

          cy.wrap(blog).as('blog')

          cy.saveNewBlog(blog)

          cy.request({
            method: 'POST',
            url: `${backendUrl}/api/users`,
            body: {
              username: 'root',
              name: 'admin',
              password: 'sekret',
            },
          })

          cy.request({
            method: 'POST',
            url: `${backendUrl}/api/login`,
            body: {
              username: 'root',
              password: 'sekret',
            },
          }).then((response) => {
            cy.request({
              method: 'POST',
              url: `${backendUrl}/api/blogs`,
              body: {
                title: 'blog saved by other user',
                author: 'Author',
                likes: 1,
                url: 'https://www.somewhere.com',
              },
              headers: {
                Authorization: `bearer ${response.body.token}`,
              },
            })
          })

          cy.visit('/')
        })

        it('like a blog', function () {
          cy.contains('ul', 'blog saved by current user').as('blog')
          cy.get('@blog').contains('button', 'view').click()

          cy.get('@blog').contains('li > button', 'like').click()

          cy.contains(`likes ${this.blog.likes + 1}`)
        })

        it('delete a blog if saved by the logged in user', function () {
          cy.contains('ul', 'blog saved by current user')
            .contains('button', 'view')
            .click()

          cy.get('[data-testid=name]').should(
            'contain',
            JSON.parse(window.localStorage.getItem('loggedInUser')).name
          )
          cy.contains('button', 'delete').click()

          cy.on('window:confirm', (str) =>
            expect(str).to.equal(
              `Remove blog ${this.blog.title} by ${this.blog.author}`
            )
          )

          cy.get('[data-testid=blogs').should(
            'not.contain',
            `${this.blog.title}`
          )
        })

        it('cannot delete a blog if not saved by the logged in user', () => {
          cy.contains('ul', 'blog saved by other user').as('adminBlog')

          cy.get('@adminBlog').contains('button', 'view').click()

          cy.get('[data-testid=name]').should(
            'not.contain',
            JSON.parse(window.localStorage.getItem('loggedInUser')).name
          )

          cy.get('@adminBlog').contains('button', 'delete').should('not.exist')
        })
      })

      describe('saved blogs list is', () => {
        beforeEach(() => {
          cy.saveNewBlog({
            title: 'blog with most likes',
            author: 'Author',
            url: 'https://www.somewhere.com',
            likes: 4,
          })

          cy.saveNewBlog({
            title: 'blog with least likes',
            author: 'Author',
            url: 'https://www.somewhere.com',
            likes: 0,
          })

          cy.saveNewBlog({
            title: 'blog with second most likes',
            author: 'Author',
            url: 'https://www.somewhere.com',
            likes: 2,
          })
        })

        it('sorted in descending order w.r.t likes when the app loads', function () {
          cy.request('http://localhost:3003/api/blogs')
            .then((res) => res.body.sort((a, b) => b.likes - a.likes))
            .as('orderedList')

          cy.get('[data-testid=title]').each(function (el, index) {
            cy.wrap(el).should('contain', this.orderedList[index].title)
          })

          cy.get('[data-testid=title]')
            .eq(0)
            .should('contain', 'blog with most likes')

          cy.get('[data-testid=title]')
            .eq(1)
            .should('contain', 'blog with second most likes')

          cy.get('[data-testid=title]')
            .eq(-1)
            .should('contain', 'blog with least likes')
        })

        it('re-rendered to maintain the descending sort(w.r.t likes) when a blog is liked', () => {
          cy.contains('ul', 'blog with least likes').as('leastLikedBlog')
          cy.get('@leastLikedBlog').contains('button', 'view').click()

          for (let i = 0; i < 6; i++) {
            cy.get('@leastLikedBlog')
              .contains('button', 'like')
              .click()
              .wait(500)
          }

          cy.get('[data-testid=title]')
            .eq(0)
            .should('contain', 'blog with least likes')
        })
      })
    })
  })
})
