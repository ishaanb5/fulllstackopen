import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }
  return (
    <ul className='blog'>
      <li>
        <span data-testid='title'>{blog.title}</span> <span>{blog.author}</span>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </li>

      {showDetails && (
        <>
          <li>{blog.url}</li>
          <li>
            likes {blog.likes}{' '}
            <button
              // sending just likes instead of the full blog object
              /* the blog controller from backend solution in part 4 was written
              to just update likes for PUT http request */
              onClick={() => updateLikes(blog.id, { likes: blog.likes + 1 })}
            >
              like
            </button>
          </li>
          <li data-testid='name'>{blog.user.name}</li>
          {blog.user.username === user.username && (
            <button className='delete-button' onClick={handleDelete}>
              delete
            </button>
          )}
        </>
      )}
    </ul>
  )
}

export default Blog
