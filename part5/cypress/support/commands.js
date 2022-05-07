Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/login',
    body: {
      username: 'mluukkai',
      password: 'sekret',
    },
  }).then((response) =>
    window.localStorage.setItem('loggedInUser', JSON.stringify(response.body))
  )

  cy.visit('/')
})

Cypress.Commands.add('saveNewBlog', (blog) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: blog,
    headers: {
      Authorization: `bearer ${
        JSON.parse(window.localStorage.getItem('loggedInUser')).token
      }`,
    },
  })

  cy.visit('/')
})
