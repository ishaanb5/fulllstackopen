import React from 'react'
import Contact from './Contact'

const ContactList = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      {props.list.map((person) => (
        <Contact
          name={person.name}
          number={person.number}
          key={person.id}
          delete={() => props.delete(person.id)}
        />
      ))}
    </div>
  )
}

export default ContactList
