import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            id='username'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </li>
        <li>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </li>
        <li>
          <button type='submit'>login</button>
        </li>
      </ul>
    </form>
  )
}

export default LoginForm
