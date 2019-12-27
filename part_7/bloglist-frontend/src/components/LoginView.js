import React from 'react'
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom'
import BlogView from './BlogView'
import UserView from './UserView'
import Menu from './Menu'
import User from './User'
import Blog from './Blog'

const LoginView = () => {


    return (
        <div>
            <Router>
                <Menu />
                <h2>Blog App</h2>
                <Route exact path="/" render={() => <BlogView />} />
                <Route exact path="/user" render={() => <UserView />} />
                <Route exact path="/user/:id" render={({ match }) => <User blogCreatorId={match.params.id}/>} />
                <Route exact path="/blogs/:id" render={({ match }) => <Blog blogId={match.params.id}/>} />
            </Router>
        </div>
    )
}

export default LoginView

