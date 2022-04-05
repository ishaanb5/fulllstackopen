const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const payload = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 })
  response.status(200).json({
    token,
    username: user.username,
    name: user.name,
  })
})

module.exports = loginRouter
