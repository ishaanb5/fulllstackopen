import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: '10px',
  }

  return notification ? <div style={style}>{notification}</div> : ''
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
