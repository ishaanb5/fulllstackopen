import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setCurrentUser } from './features/users/usersSlice'

import Login from './routes/Login'
import Users from './routes/Users'
import User from './features/users/User'
import Root from './routes/Root'
import Blog from './features/blogs/Blog'
import CreateBlog from './features/blogs/CreateBlog'
import SavedBlogs from './features/blogs/SavedBlogs'
import { H1 } from 'components'

import './index.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const jsonUser = window.localStorage.getItem('loggedInUser')
    if (jsonUser) {
      const parsedUser = JSON.parse(jsonUser)
      dispatch(setCurrentUser(parsedUser))
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Root />}>
          <Route
            index
            element={
              <>
                <H1>Blogs</H1>
                <CreateBlog />
                <SavedBlogs />
              </>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/blogs/:blogId" element={<Blog />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
