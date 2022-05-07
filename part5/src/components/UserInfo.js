const UserInfo = ({ user, logout }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    logout()
  }

  if (user === null) return null
  return (
    <p>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
  )
}

export default UserInfo
