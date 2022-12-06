const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter
  .route('/')
  .get(async (request, response) => {
    const result = await Blog.find({}).populate('user', ['username', 'name'])
    response.json(result)
  })
  .post(async (request, response) => {
    const body = request.body
    const user = request.user
    const blog = new Blog(body)

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    blog.user = user._id
    await blog.save()

    const populatedSavedBlog = await Blog.findById(blog.id).populate('user', {
      username: 1,
      name: 1,
    })
    response.status(201).json(populatedSavedBlog)
  })

blogRouter
  .route('/:id')
  .put(async (request, response) => {
    // used findById() and save() instead of findByIdAndUpdate() to handle value of likes=null
    const blogToUpdate = await Blog.findById(request.params.id)
    blogToUpdate === null
      ? response.status(404).end()
      : (blogToUpdate.likes = request.body.likes)
    await blogToUpdate.save()
    const populatedBlogToUpdate = await Blog.findById(blogToUpdate.id).populate(
      'user',
      { username: 1, name: 1 },
    )
    response.status(201).json(populatedBlogToUpdate)
  })
  .delete(async (request, response) => {
    const currentUser = request.user
    const blog = await Blog.findById(request.params.id)
    const blogCreator = await User.findById(blog.user._id.toString())

    if (currentUser.id !== blogCreator.id) {
      return response.status(401).json({ error: 'unauthorized' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

blogRouter.post('/:id/comments', async (request, response) => {
  const { id } = request.params
  const { comment } = request.body

  const blog = await Blog.findById(id)
  blog.comments.push(comment)

  const updatedBlog = await blog.save()

  return response.status(201).json(updatedBlog)
})

module.exports = blogRouter
