import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  margin: 30px;
  display: flex;
  justify-content: center;
  gap: 5px;
`

const Link = styled(NavLink)`
  text-decoration: none;
  padding: 10px;
  border-radius: 40px;
  font-weight: 900;
  color: white;

  &.active {
    background-color: #3e92cc;
  }
`

const Navigation = () => {
  return (
    <Nav>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
    </Nav>
  )
}

export default Navigation
