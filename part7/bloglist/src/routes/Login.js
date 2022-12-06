import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { selectCurrentUser } from 'features/users/usersSlice'

import LoginForm from 'features/users/LoginForm'
import Notification from 'features/notification/Notification'
import Background from '../assets/background.avif'
import { H1 } from 'components'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${Background}) no-repeat;
  background-size: cover;
`

const LoginContainer = styled.div`
  border-radius: 2px;
  padding: 50px;
  text-align: center;
  width: 350px;
  height: 350px;
  background: #e8deaf;
  border-radius: 20px;
  box-shadow: 0 0 10px #c9c9c9;
`

const LoginNotification = styled(Notification)`
  color: #370f0e;
  margin: 0;
  &::first-letter {
    text-transform: capitalize;
  }
`

const Login = () => {
  const location = useLocation()
  const user = useSelector(selectCurrentUser)

  if (user) {
    const origin = location.state?.from?.pathname || '/'
    return <Navigate to={origin} />
  }

  return (
    <Container>
      <LoginContainer>
        <H1 color="var(--clr-brown)">Blog App</H1>
        <p>Stay curious.</p>
        <LoginForm />
        <LoginNotification />
      </LoginContainer>
    </Container>
  )
}

export default Login
