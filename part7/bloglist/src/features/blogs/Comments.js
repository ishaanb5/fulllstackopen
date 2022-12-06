import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment } from './blogsSlice'

import { Button, H3, Input, ListItem } from 'components'

const Comments = () => {
  const [newComment, setNewComment] = useState('')
  const { blogId } = useParams()
  const dispatch = useDispatch()

  const comments = useSelector((state) => {
    const currentBlog = state.blogs.find((b) => b.id === blogId)
    return currentBlog.comments
  })

  const renderedComments = comments.map((c) => {
    return <ListItem key={c}>{c}</ListItem>
  })

  const handleAddComment = () => {
    dispatch(addComment(blogId, newComment))
    setNewComment('')
  }

  return (
    <div>
      <H3>Comments</H3>
      <Input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="comment"
      />
      <Button onClick={handleAddComment} margin="0 5px">
        Add comment
      </Button>
      <ul>{renderedComments}</ul>
    </div>
  )
}

export default Comments
