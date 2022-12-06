import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser, setCurrentUser } from './usersSlice'
import styled from 'styled-components'

import { Button, P } from 'components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(setCurrentUser(null))
    navigate('/login')
  }

  if (user === null) return null
  return (
    <Container>
      <P> {user.name} logged in</P>

      <Button onClick={handleLogout} color="white">
        logout
      </Button>
    </Container>
  )
}

export default UserInfo
