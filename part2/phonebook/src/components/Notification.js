import React from 'react'

const Notification = ({ notification }) => {
  //#region style definitions
  const successNotification = {
    color: 'green',
    background: 'lightgrey',
    border: '5px solid',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    marginBottom: 15,
  }

  const alertNotification = {
    color: 'red',
    background: 'lightgrey',
    border: '5px solid',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    marginBottom: 15,
  }
  //#endregion

  if (notification === null) return null
  const { message, type } = notification
  return message === null ? null : (
    <div style={type === 'success' ? successNotification : alertNotification}>
      {message}
    </div>
  )
}

export default Notification
