import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import Notification from './Notifiaction'
import { login, logout } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({login, setNotification}) => {
    const username = useField('text')
    const password = useField('text')

    const loginHandler = async (e) => {
        e.preventDefault()
        try{
            await login({ username: username.value, password: password.value })
        }catch(error){
            setNotification({message: error.response.data.error, isError: true}, 5000)
        }
    }

    return(
        <div>
            <Notification />
            <h2>Log in to application</h2>
            <form onSubmit={loginHandler} >
                <label>username: </label>
                <input  className={username.className} value={username.value} type={username.type} onChange={username.onChange} data-cy='username'/> <br />
                <label>password: </label>
                <input className={username.className} value={password.value} type={password.type} onChange={password.onChange} data-cy='password'/><br /><br />
                <button type='submit' className='btn btn-primary col-sm-3' data-cy='login'>Login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        token: state.user.token,
        message: state.notification.message,
        isError: state.notification.isError
    }
}
const mapDispatchToProps = {
    login,
    logout,
    setNotification
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default ConnectedLoginForm