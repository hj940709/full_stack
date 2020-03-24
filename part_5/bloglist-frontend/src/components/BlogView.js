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
            console.log(sorted)
            setBlogs(sorted)
        })
    }, [updated])
    
    const likeHandler = async (blog) => {
        try{
            await BlogService.likeBlog(blog.id, blog.likes+1)
            setMessage(`${blog.title} liked`)
            //setUpdated(!updated)
            const id = blog.id
            const toChange = blogs.find(n => n.id === id)
            const changed = { ...toChange, likes: toChange.likes + 1 }
            const newBlogs = blogs.map(x => x.id !==id ? x : changed)
            newBlogs.sort((a ,b) => b.likes - a.likes)
            setBlogs(newBlogs)
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

    const removeHandler = async (blog) => {
        try{
            if(blog.user.id===user.id){
                await BlogService.removeBlog(blog.id)
                setMessage(`${blog.title} removed`)
                const id = blog.id
                setBlogs(blogs.filter(x => x.id!==id || x.user.id!==user.id))
                setError(false)
            }
            else {
                setError(true)
                setMessage('Unable to remove')
            }
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

    const postHandler = async ( title, author, url ) => {
        blogFormRef.current.toggleVisibility()
        try{
            const data = await BlogService.postBlog({ title, author, url })
            data.user = user
            setBlogs(blogs.concat(data))
            setMessage(`A new blog: ${data.title} by ${data.author} added`)
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
        <div>
            <h2>Blogs</h2>
            <p>
                {user.name} logged in <button onClick={logoutHandler}>logout</button>
            </p>
            <h3>Post new blog</h3>
            <TogglableView buttonLabel='New Post' ref={blogFormRef}>
                <BlogForm postHandler={postHandler}/>
            </TogglableView>
            <br />
            {blogs.map(blog => <Blog key={blog.id} blog={blog} likeHandler={likeHandler} removeHandler={removeHandler}/>)}
        </div>
    )
}

export default BlogView

