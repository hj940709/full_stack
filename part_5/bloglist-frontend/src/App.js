import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'
import Notification from './components/Notifiaction'
import TogglableView from './components/ToggleableView'

function App() {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')))
    const [token, setToken] = useState(window.localStorage.getItem('token'))
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    if(user===null ||token === null){
        const LoginFormRef = React.createRef()
        return (
            <div className="App">
                <Notification message={message} error={error}/>
                <TogglableView buttonLabel='login' ref={LoginFormRef}>
                    <LoginForm setUser={setUser} setToken={setToken} setMessage={setMessage} setError={setError}/>
                </TogglableView>
            </div>
        )
    }
    else{
        return (
            <div className="App" >
                <Notification message={message} error={error}/>
                <BlogView setUser={setUser} setToken={setToken} setMessage={setMessage} setError={setError}/>
            </div>
        )
    }
}

export default App
