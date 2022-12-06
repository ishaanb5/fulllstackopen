import styled from 'styled-components'

export const UList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-block: 20px;
`
export const ListItem = styled.li`
  margin-block: ${(props) => props.marginBlock || '2px'};
  color: ${(props) => props.color || 'white'};
`
