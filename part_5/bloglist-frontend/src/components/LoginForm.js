import React from 'react'
import LoginService from '../services/LoginService'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const LoginForm = (props) => {
    const username = useField('text')
    const password = useField('text')
    const { setUser, setToken, setMessage, setError } = props

    const loginHandler = async (e) => {
        e.preventDefault()
        try{
            const data = await LoginService.login({ username: username.value, password: password.value })
            window.localStorage.setItem('user', JSON.stringify(data.user))
            window.localStorage.setItem('token', data.token)
            setUser(data.user)
            setToken(data.token)
        }catch(error){
            setMessage(error.response.data.error)
            setError(true)
            setTimeout(() => {
                setMessage(null)
                setError(false)
            }, 5000)
        }
    }

    return(
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={loginHandler}>
                <label>username: </label>
                <input value={username.value} type={username.type} onChange={username.onChange}/> <br />
                <label>password: </label>
                <input value={password.value} type={password.type} onChange={password.onChange}/><br /><br />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
}

export default LoginForm