import React from 'react'

const ContactSearch = (props) => {
  return (
    <div>
      filter shown with
      <input type='text' onChange={(event) => props.handleInput(event)} />
    </div>
  )
}

export default ContactSearch
