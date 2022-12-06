import { useSelector } from 'react-redux'
import styled from 'styled-components'

const LoginNotification = styled.p`
  color: var(--clr-brown);
  margin: 10px;
  &::first-letter {
    text-transform: capitalize;
  }
`

const AppNotification = styled.p`
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 13px;
  border-radius: 10px;
  color: ${(props) => (props.type === 'success' ? '#28965A' : '#A30015')};
  background: rgba(115, 124, 153, 0.2);
`

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const { type, message } = notification

  if (type === null) return null

  return type === 'login' ? (
    <LoginNotification>{message}</LoginNotification>
  ) : (
    <AppNotification type={type}>{message}</AppNotification>
  )
}

export default Notification
