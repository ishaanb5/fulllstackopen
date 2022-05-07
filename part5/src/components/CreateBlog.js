import { useState } from 'react'

const CreateBlog = ({ createNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const { title, author, url } = newBlog

  const handleChange = ({ target }) => {
    const { name, value } = target
    setNewBlog((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createNewBlog(newBlog)
    setNewBlog({ author: '', url: '', title: '' })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor='title'>title:</label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={(event) => handleChange(event)}
            />
          </li>
          <li>
            <label htmlFor='author'>author:</label>
            <input
              type='text'
              name='author'
              id='author'
              value={author}
              onChange={(event) => handleChange(event)}
            />
          </li>
          <li>
            <label htmlFor='url'>url:</label>
            <input
              type='text'
              name='url'
              id='url'
              value={url}
              onChange={(event) => handleChange(event)}
            />
          </li>
        </ul>
        <button style={{ display: 'inline' }} data-testid='newNoteSubmitBtn'>
          create
        </button>
      </form>
    </>
  )
}

export default CreateBlog
