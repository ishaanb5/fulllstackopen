import styled from 'styled-components'

const HyperLink = styled.a`
  display: block;
  color: var(--clr-primary-400);
  margin-block: ${(props) => props.marginBlock || 'none'};
`

export default HyperLink
