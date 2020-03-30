import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {LOGIN} from '../query'


const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  

  const [login] = useMutation(LOGIN, {
    onError: (error)=>{
      console.log(error.message)
      setErrorMessage(error.message)
      errorNotification()
    }
  })

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>


  if (!props.show) {
    return null
  }
  
  const submit = async (event) => {
    event.preventDefault()

    const result = await login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('token', token)
      props.setPage('authors')
    }
  }

  return (
    <div>
      {errorNotification()}
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm