import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
const Menu = ({ user, logout }) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li><Link  to="/">blogs</Link></li>
                    <li><Link  to="/user">users</Link></li>
                </ul>
                <p className="navbar-text">{user.name} logged in </p>
                
                <button type='button' className='btn btn-default navbar-btn' onClick={() => logout()}>Logout</button>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    }
}
const mapDispatchToProps = {
    logout
}

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default ConnectedMenu