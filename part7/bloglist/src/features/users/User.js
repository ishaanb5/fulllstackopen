import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { H1, H3, P, UList, ListItem } from 'components'

const User = () => {
  const { userId } = useParams()

  const user = useSelector((state) => {
    return state.users.all.find((user) => user.id === userId)
  })

  if (!user) return null

  const renderedBlogs =
    user.blogs.length === 0 ? (
      <P>no blogs added</P>
    ) : (
      <>
        <H3>added blogs:</H3>
        <UList>
          {user.blogs.map((b) => (
            <ListItem key={b.id} marginBlock="10px">
              {b.title}
            </ListItem>
          ))}
        </UList>
      </>
    )
  return (
    <>
      <H1>{user.name}</H1>
      {renderedBlogs}
    </>
  )
}

export default User
