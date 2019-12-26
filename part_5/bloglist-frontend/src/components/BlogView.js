import React, { useState, useEffect } from 'react'
import BlogService from '../services/BlogService'
import Blog from './Blog'
import BlogForm from './BlogForm'
import TogglableView from './ToggleableView'

const BlogView = ({ setUser, setToken, setMessage, setError }) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const [blogs, setBlogs] = useState([])
    const [updated, setUpdated] = useState(0)
    const blogFormRef = React.createRef()
    const logoutHandler = () => {
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('token')
        setUser(null)
        setToken(null)
    }

    useEffect(() => {
        BlogService.getAll().then( data => {
            let sorted = data.concat()
            sorted.sort((a ,b) => b.likes - a.likes)
            setBlogs(sorted)
        })
    }, [updated])

    return (
        <div>
            <h2>Blogs</h2>
            <p>
                {user.name} logged in <button onClick={logoutHandler}>logout</button>
            </p>
            <h3>Post new blog</h3>
            <TogglableView buttonLabel='New Post' ref={blogFormRef}>
                <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setError={setError} toggleRef={blogFormRef}/>
            </TogglableView>
            <br />
            {blogs.map(blog => <Blog key={blog.id} blog={blog} updated={updated} setUpdated={setUpdated} setMessage={setMessage} setError={setError}/>)}
        </div>
    )
}

export default BlogView

