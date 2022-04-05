const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: mongoose.Types.ObjectId('507f191e810c19729de861ea'),
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: mongoose.Types.ObjectId('507f191e810c19729de861ea'),
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const nonExistentId = async () => {
  const tempBlog = new Blog({
    title: 'willDeleteSoon',
    url: 'deletesoon.temp',
    likes: 12,
  })

  await tempBlog.save()
  await Blog.deleteOne({ title: 'willDeleteSoon' })

  return tempBlog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}
module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistentId,
  usersInDb,
}
