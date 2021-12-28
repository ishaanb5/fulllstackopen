import React from 'react'

const ContactNew = (props) => {
  return (
    <form onSubmit={(event) => props.handleSubmit(event)}>
      <div>
        name:
        <input
          type='text'
          onChange={props.handleContactInput}
          value={props.contactData.name}
          name='name'
        />
      </div>
      <div>
        number:
        <input
          type='tel'
          onChange={props.handleContactInput}
          value={props.contactData.number}
          name='number'
        />
      </div>
      <button type='submit'>add</button>
    </form>
  )
}

export default ContactNew
