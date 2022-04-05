const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter
  .route('/')
  .get(async (request, response) => {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
    })
    return response.status(200).json(users)
  })
  .post(async (request, response) => {
    const { username, name, password } = request.body

    const usernameAlreadyExists = (await User.findOne({ username })) || false
    if (!password) {
      return response.status(400).json({ error: 'password is required' })
    }

    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: 'password should contain atleast 3 characters' })
    }
    if (usernameAlreadyExists) {
      return response.status(409).json({ error: 'username already exists' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    return response.status(201).json(savedUser)
  })

module.exports = userRouter
