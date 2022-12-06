import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog } from './blogsSlice'
import { Button, Form, Input, H3, Togglable } from 'components'

const CreateBlog = ({ token }) => {
  const createNewBlogRef = useRef()
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const { title, author, url } = newBlog
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    if (notification?.type === 'success') {
      const hideForm = () => createNewBlogRef.current.showCreateNewBlog(false)
      hideForm(true)
      setNewBlog({ author: '', url: '', title: '' })
    }
  }, [notification])

  const handleChange = ({ target }) => {
    const { name, value } = target
    setNewBlog((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createNewBlog(newBlog, token))
  }

  return (
    <Togglable buttonLabel="Create new blog" ref={createNewBlogRef}>
      <H3>Create New Blog</H3>
      <Form onSubmit={handleSubmit}>
        <ul>
          <li>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(event) => handleChange(event)}
              placeholder="Title"
            />
          </li>
          <li>
            <Input
              type="text"
              name="author"
              id="author"
              value={author}
              onChange={(event) => handleChange(event)}
              placeholder="Author"
            />
          </li>
          <li>
            <Input
              type="text"
              name="url"
              id="url"
              value={url}
              onChange={(event) => handleChange(event)}
              placeholder="Url"
            />
          </li>
        </ul>
        <Button width="80%" margin="20px auto 0" data-testid="newNoteSubmitBtn">
          Create
        </Button>
      </Form>
    </Togglable>
  )
}

export default CreateBlog
