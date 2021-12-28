import React from 'react'

const Contact = (props) => {
  return (
    <div>
      {props.name} {props.number}
      <button onClick={props.delete}>delete</button>
    </div>
  )
}

export default Contact
