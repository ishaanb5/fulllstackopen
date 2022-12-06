import styled from 'styled-components'

const Button = styled.button`
  width: ${(props) => props.width || 'fit-content'};
  text-align: center;
  padding: 10px;
  border: none;
  background: ${(props) => props.background || 'var(--clr-primary-900)'};
  border-radius: ${(props) => props.borderRadius || '30px'};
  color: ${(props) => props.color || 'white'};
  font-weight: 900;
  cursor: pointer;
  margin: ${(props) => props.margin || 0};
`
export default Button
