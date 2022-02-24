import React from 'react'

// there are three types of notificatios - success, error and alert.

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
    whiteSpace: 'pre-line',
  }

  const alertNotification = {
    color: 'red',
    background: 'lightgrey',
    border: '5px solid',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    marginBottom: 15,
    whiteSpace: 'pre-line',
  }
  //#endregion

  if (notification === null) return null
  let { message, type } = notification

  if (!message) return null
  message = message.replace('.', '.\n')
  return (
    <div style={type === 'success' ? successNotification : alertNotification}>
      {message}
    </div>
  )
}

export default Notification
