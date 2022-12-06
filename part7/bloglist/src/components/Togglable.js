import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'

const Container = styled.div`
  width: 300px;
  margin-inline: ${(props) => (props.visible ? 'auto' : 'none')};
  margin-block: ${(props) => (props.visible ? '60px' : 'none')};
  box-shadow: ${(props) => (props.visible ? '0 2px 15px 0 white' : 'none')};
  padding: ${(props) => (props.visible ? '20px' : '0')};
  text-align: ${(props) => (props.visible ? 'center' : 'left')};
  border-radius: 10px;
  position: relative;
`

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 10px;
  padding: 4px 8px;
  color: white;
  background: var(--clr-primary-900);
  font-weight: 500;
`

let Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useImperativeHandle(ref, () => ({
    showCreateNewBlog: setVisible,
  }))

  return (
    <Container visible={visible}>
      <Button style={hideWhenVisible} onClick={() => setVisible(true)}>
        {props.buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        {props.children}
        <CloseButton onClick={() => setVisible(false)}>X</CloseButton>
      </div>
    </Container>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
