const config = require('./utils/config')
const logger = require('./utils/logger')
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

logger.info(`connecting to: ${config.MONGODB_URI}`)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('successfully connected to MongoDB'))
  .catch((error) => logger.error(`error: ${error.message}`))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
