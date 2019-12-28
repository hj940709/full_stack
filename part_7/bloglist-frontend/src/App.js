import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import LoginView from './components/LoginView'
import TogglableView from './components/ToggleableView'
import { login, logout } from './reducers/loginReducer'


const App = props => {
    const {user, token } = props
    
    if(user===null ||token === null){
        const LoginFormRef = React.createRef()
        return (
            <div className="container">
                <TogglableView buttonLabel='Login' ref={LoginFormRef}>
                    <LoginForm />
                </TogglableView>
            </div>
        )
    }
    else{
        return (
            <div className="container" >
                <LoginView />
            </div>
        )
    }
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
    logout
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
