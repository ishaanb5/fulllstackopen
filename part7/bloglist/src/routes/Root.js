import Navigation from 'components/Navigation'
import UserInfo from 'features/users/UserInfo'
import Notification from 'features/notification/Notification'

import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/users/usersSlice'
import styled from 'styled-components'

const Container = styled.div`
  width: 60%;

  padding: 10px;
  margin-inline: auto;
`

const Root = () => {
  const user = useSelector(selectCurrentUser)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return (
    <Container>
      <UserInfo />
      <Navigation />
      <Notification />
      <Outlet />
    </Container>
  )
}

export default Root
