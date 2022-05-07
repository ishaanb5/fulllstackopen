import { useEffect } from 'react'
import blogService from '../services/blog'
import Blog from './../components/Blog'

const SavedBlogs = ({ blogs, updateBlogs, user }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => updateBlogs(blogs))
  }, [])
  const sortedBlogs = () => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const handleUpdateLikes = (id, updatedBlogObject) => {
    blogService.updateLike(id, updatedBlogObject).then((updatedBlog) => {
      updateBlogs(
        blogs.map((blog) => {
          return blog.id === updatedBlog.id ? updatedBlog : blog
        })
      )
    })
  }

  const handleDeleteBlog = async (id) => {
    await blogService.deleteBlog(id)
    updateBlogs((blogs) =>
      blogs.reduce((array, blog) => {
        if (blog.id !== id) array.push(blog)
        return array
      }, [])
    )
  }
  return (
    <div data-testid='blogs'>
      {sortedBlogs().map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={handleUpdateLikes}
            deleteBlog={handleDeleteBlog}
            user={user}
          />
        )
      })}
    </div>
  )
}

export default SavedBlogs
