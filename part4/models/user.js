const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
  username: { type: String, required: true, minlength: 3 },
  name: String,
  passwordHash: { type: String, required: true },
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
