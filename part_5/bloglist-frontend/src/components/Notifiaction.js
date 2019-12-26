import React from 'react'
import '../index.css'

const Notification = ({ message, error }) => {
    if (message === null || message==='') {
        return null
    }
    
    return (
        <div className={error ? 'error' : 'success'}>
            {message}
        </div>
    )
  }


export default Notification