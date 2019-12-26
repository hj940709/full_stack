import React, { useState } from 'react'
import BlogService from '../services/BlogService'
const Blog = ({ blog, updated, setUpdated, setMessage, setError }) => {
    const [visible, setVisible] = useState(true)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const likeHandler = async () => {
        try{
            await BlogService.likeBlog(blog.id, blog.likes+1)
            setUpdated(!updated)
            setMessage(`${blog.title} liked`)
            setError(false)
            setTimeout(() => {
                setMessage(null)
                setError(false)
            }, 5000)
        }catch(error){
            setMessage(error.response.data.error)
            setError(true)
            setTimeout(() => {
                setMessage(null)
                setError(false)
            }, 5000)
        }
    }

    const removeHandler = async () => {
        try{
            await BlogService.removeBlog(blog.id)
            setUpdated(!updated)
            setMessage(`${blog.title} removed`)
            setError(false)
            setTimeout(() => {
                setMessage(null)
                setError(false)
            }, 5000)
        }catch(error){
            setMessage(error.response.data.error)
            setError(true)
            setTimeout(() => {
                setMessage(null)
                setError(false)
            }, 5000)
        }
    }

    return (
        <div style={blogStyle}>
            <div onClick={() => setVisible(!visible)}>
                {blog.title} {blog.author}
            </div>
            <div style={hideWhenVisible}>
                <a href={blog.url} >{blog.url}</a>
                <p>{blog.likes} likes <button onClick={() => likeHandler()}>like</button></p>
                added by {blog.user.name} <br />
                <button onClick={() => removeHandler()}>remove</button>
            </div>
        </div>
    )
}


export default Blog