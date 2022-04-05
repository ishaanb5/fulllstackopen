const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('creating a new user:', () => {
  beforeEach(async () => {
    await User.deleteMany()

    const saltRounds = 10
    const password = 'secret'
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: 'root',
      name: 'test-admin',
      passwordHash,
    })

    await user.save()
  })

  describe('- fails with valid http status and error message if', () => {
    test('username is missing', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: '',
        name: 'test-user',
        password: 'secret',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect('Content-Type', /application\/json/)
        .expect(400)

      expect(response.body.error).toBe('username is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('username is less than 3 character long', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'tu',
        name: 'test-user',
        password: 'secret',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toBe(
        'username should contain atleast 3 characters'
      )

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('a user with entered username already exists', async () => {
      const usersAtStart = await helper.usersInDb()
      const user = {
        username: 'root',
        name: 'test-user',
        password: 'secret',
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(409)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toBe('username already exists')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password is missing', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'testuser',
        name: 'test-user',
        password: '',
      }
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect('Content-Type', /application\/json/)
        .expect(400)

      expect(response.body.error).toBe('password is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password is less than 3 character long', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'test-user',
        name: 'test-user',
        password: 'st',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toBe(
        'password should contain atleast 3 characters'
      )

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
  test('succeeds with http status 200 with valid username', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'testuser',
      name: 'test-user',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })
})
