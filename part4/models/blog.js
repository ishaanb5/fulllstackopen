const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: function () {
        return !this.url
      },
    },
    author: String,
    url: {
      type: String,
      required: function () {
        return !this.title
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: { type: Number, default: 0 },
  },
  {
    toJSON: {
      transform: (doc, retObj) => {
        retObj.id = doc._id.toString()
        delete retObj.__v
        delete retObj._id

        return retObj
      },
    },
  }
)

// setting likes to zero if null is received

blogSchema.pre('save', async function () {
  if (this.likes === null) {
    this.likes = 0
  }
})

module.exports = mongoose.model('Blog', blogSchema)
