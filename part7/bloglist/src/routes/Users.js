import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../features/users/usersSlice'

import { H1, Table } from 'components'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.all)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const renderedRows = users.map((user) => (
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  ))

  return (
    <>
      <H1>Users</H1>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </Table>
    </>
  )
}

export default Users
