import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Menu = ({ user, logout }) => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/user">users</Link>
        {user.name} logged in <button onClick={() => logout()}>logout</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    }
}
const mapDispatchToProps = {

}

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default ConnectedMenu