import React, {useEffect} from 'react'
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom'
import { connect } from 'react-redux'
import BlogView from './BlogView'
import UserView from './UserView'
import Menu from './Menu'
import User from './User'
import Blog from './Blog'
import Notification from './Notifiaction'
import { initialUser } from '../reducers/userReducer'
import { initialBlog } from '../reducers/blogReducer'

const LoginView = ({initialUser, initialBlog}) => {
    useEffect(()=>{
        console.log(123)
        initialUser()
        initialBlog()
    }, [])

    return (
        <div className='col-sm-12'>
            <Router>
                <Menu />
                <Notification />
                <h2>Blog App</h2>
                <Route exact path="/" render={() => <BlogView />} />
                <Route exact path="/user" render={() => <UserView />} />
                <Route exact path="/user/:id">
                    <User />
                </Route>
                <Route exact path="/blogs/:id">
                    <Blog />
                </Route>
            </Router>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        blogCreators: state.blogCreators
    }
}
const mapDispatchToProps = {
    initialUser,
    initialBlog
}

const ConnectedLoginView = connect(mapStateToProps, mapDispatchToProps)(LoginView)
export default ConnectedLoginView


