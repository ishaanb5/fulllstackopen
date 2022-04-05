// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach((blog) => (sum = sum + blog.likes))
  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const favorite = blogs.reduce((mostLiked, obj) => {
    return mostLiked.likes >= obj.likes ? mostLiked : obj
  })
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const blogsCount = Object.values(
    blogs.reduce((count, { author }) => {
      count[author] = count[author] || { author, blogs: 0 }
      count[author].blogs++
      return count
    }, {})
  )

  return blogsCount.reduce((prev, current) => {
    return current.blogs > prev.blogs ? current : prev
  })
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likesCount = Object.values(
    blogs.reduce((totalLikes, { author, likes }) => {
      totalLikes[author] = totalLikes[author] || { author, likes: 0 }
      totalLikes[author].likes += likes

      return totalLikes
    }, {})
  )

  return likesCount.reduce((prev, current) => {
    return current.likes > prev.likes ? current : prev
  })
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
