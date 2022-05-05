const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else request.token = null
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
  } else request.user = null
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    const { errors } = error
    const path = Object.keys(errors)[0]
    const { kind, properties } = errors[path]
    let errorMsg

    if (kind === 'minlength') {
      errorMsg = `${path} should contain atleast ${properties.minlength} characters`
    } else if (kind === 'required') {
      if (path === 'url' || path === 'title') {
        errorMsg = 'Url or Title is required'
      } else {
        errorMsg = `${path} is required`
      }
    } else if (kind === 'Number') {
      errorMsg = `${path} should be a number`
    } else errorMsg = error.message

    return response.status(400).json({ error: errorMsg })
  } else if (error.name === 'CastError') {
    response.status(400)
    if (error.kind === 'ObjectId') {
      response.send({ error: 'invalid id' })
    }

    response.send({ error: `${error.path} should be a ${error.kind}` })
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'missing or invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    response.status(401).json({ error: 'token expired' })
  }
  next(error)
}

module.exports = {
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler,
}
