const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)
let token

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.create(helper.initialBlogs)

  await User.deleteMany()
  const passwordHash = await bcrypt.hash('secret', 10)
  const testUser = new User({
    username: 'tester',
    name: 'tester',
    passwordHash,
    _id: mongoose.Types.ObjectId('507f191e810c19729de861ea'),
  })

  await testUser.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'tester', password: 'secret' })
  token = loginResponse.body.token
})

describe('when there are intially some blogs saved', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have an unique identifier called id', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
    const parsedBlogPost = response.body[0]

    expect(parsedBlogPost.id).toBeDefined()

    const blogsList = await Blog.find({})
    const blogPost = blogsList[0]

    expect(blogPost._id.toString()).toBe(parsedBlogPost.id)
  })
})

describe('new blog', () => {
  test('can be saved with status 201 if valid data is entered', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('has default value for likes equal to zero', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('can be saved when either title or url are entered', async () => {
    const blogWithoutUrl = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 9,
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogWithoutTitle = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 9,
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('cannot be saved without title and url', async () => {
    const blog = {
      author: 'Robert C. Martin',
      likes: 9,
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  test('cannot be added and fails with status code 401 if no token provided', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(401)

    expect(response.body.error).toBe('missing or invalid token')
  })
})

describe('Updation of likes for existing blog post', () => {
  test('succeeds with status 201 for valid id', async () => {
    const blogToUpdate = await Blog.findOne({
      url: 'https://reactpatterns.com/',
    })

    const processedBlogToUpdate = { ...blogToUpdate.toJSON(), likes: 11 }

    const result = await api
      .put(`/api/blogs/${processedBlogToUpdate.id}`)
      .send(processedBlogToUpdate)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toBe(processedBlogToUpdate.likes)
  })

  test('fails with status 404 for a non-existing blog id', async () => {
    const validNonExistingId = await helper.nonExistentId()
    const blogToUpdate = {
      title: 'invalid blog',
      likes: 34,
    }

    await api
      .put(`/api/blogs/${validNonExistingId}`)
      .send(blogToUpdate)
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })

  test('fails with status 400 for an invalid blog id', async () => {
    const invalidId = 'abc123'
    const blogToUpdate = {
      title: 'non-existing blog',
      likes: 44,
    }

    await api
      .put(`/api/blogs/${invalidId}`)
      .set('Authorization', `bearer ${token}`)
      .send(blogToUpdate)
      .expect(400)
  })
})

describe('deletion of a blog post', () => {
  test('succeeds with status 204 if the id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status 400 if the id is invalid', async () => {
    const invalidId = 'abc123'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
