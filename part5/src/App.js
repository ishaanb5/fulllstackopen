import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blog'
import loginService from './services/login'
import SavedBlogs from './components/SavedBlogs'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import './index.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const createNewBlogRef = useRef()

  useEffect(() => {
    const jsonUser = window.localStorage.getItem('loggedInUser')
    if (jsonUser) {
      const parsedUser = JSON.parse(jsonUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => setNotification(null), 5000)
  }, [notification])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  const handleCreateNewBlog = async (blogObject) => {
    try {
      const blog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(blog))
      createNewBlogRef.current.showCreateNewBlog(false)
      setNotification({
        message: `a new blog ${blog.title} ${
          blog.author && `by ${blog.author}`
        } added`,
        type: 'success',
      })
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  return (
    <>
      <h2>{user ? 'blogs' : 'log in to application'}</h2>

      {notification === null ? null : (
        <p
          className={
            notification.type === 'success'
              ? 'success-notification'
              : 'error-notification'
          }
        >
          {notification.message}
        </p>
      )}

      {user === null ? (
        <LoginForm login={handleLogin} />
      ) : (
        <>
          <UserInfo user={user} logout={() => setUser(null)} />
          <Togglable buttonLabel='create new blog' ref={createNewBlogRef}>
            <CreateBlog createNewBlog={handleCreateNewBlog} />
          </Togglable>
          <SavedBlogs blogs={blogs} updateBlogs={setBlogs} user={user} />
        </>
      )}
    </>
  )
}

export default App
