import React from 'react'
import { connect } from 'react-redux'
import '../index.css'

const Notification = ({ message, isError }) => {
    if (message === null || message==='') {
        return null
    }

    return (
        <div className={isError ? 'error' : 'success'}>
            {message}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
      message: state.notification.message,
      isError: state.notification.isError
    }
  }
  
  const ConnectedNotification = connect(mapStateToProps)(Notification)
  export default ConnectedNotification