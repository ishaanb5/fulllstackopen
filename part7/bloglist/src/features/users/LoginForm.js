import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginUser } from './usersSlice'
import { Button, Input } from 'components'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="username"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Username"
          aria-label="username"
        />
        <br />
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
          aria-label="password"
        />
        <br />
        <Button
          type="submit"
          color="white"
          width="80%"
          background="brown"
          margin="10px 0 0 0"
        >
          Login
        </Button>
      </form>
    </>
  )
}

export default LoginForm
