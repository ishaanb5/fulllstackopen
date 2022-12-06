import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeBlogs } from './blogsSlice'

import styled from 'styled-components'

import { UList, ListItem } from 'components'

const StyledLink = styled(Link)`
  font-family: sans-serif;
  font-size: 1.75rem;
  line-height: 1.1;
  font-weight: 900;
  color: var(--clr-primary-400);
  text-decoration: none;
  display: flex;
  gap: 5px;

  &:before {
    content: '- ';
    display: block;
  }

  &:hover {
    text-decoration: underline;
  }
`

const SavedBlogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)

  return (
    <UList data-testid="blogs">
      {sortedBlogs.map((blog) => {
        return (
          <ListItem key={blog.id} marginBlock="30px">
            <StyledLink to={`blogs/${blog.id}`}>{blog.title}</StyledLink>
          </ListItem>
        )
      })}
    </UList>
  )
}

export default SavedBlogs
