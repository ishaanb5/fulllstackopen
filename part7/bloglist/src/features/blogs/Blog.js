import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectCurrentUser } from 'features/users/usersSlice'
import { updateBlogLikes, deleteBlog } from './blogsSlice'
import Comments from './Comments'
import { Button, H1, UList, ListItem, HyperLink } from 'components'

const Blog = () => {
  const dispatch = useDispatch()
  const { blogId } = useParams()
  const navigate = useNavigate()

  const blogs = useSelector((state) => state.blogs)
  if (!blogs) {
    null
  }

  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogId))
  const user = useSelector(selectCurrentUser)

  if (!blog) {
    return null
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id, user.token))
      navigate('/')
    }
  }

  const handleLikes = () =>
    dispatch(updateBlogLikes(blog.id, { likes: blog.likes + 1 }))

  return (
    <div className="blog">
      <H1>
        <span data-testid="title">{blog.title}</span>
        {blog.author && <i> - {blog.author}</i>}
      </H1>
      <UList>
        {blog.url && (
          <ListItem>
            <HyperLink href={blog.url} marginBlock="10px 30px">
              {blog.url}
            </HyperLink>
          </ListItem>
        )}
        <ListItem>
          {blog.likes} Likes
          <Button margin="0 5px" onClick={handleLikes}>
            like
          </Button>
        </ListItem>
        <ListItem data-testid="name">added by {blog.user.name}</ListItem>
        {blog.user.username === user.username && (
          <Button margin="10px 0" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </UList>
      <Comments />
    </div>
  )
}

export default Blog
