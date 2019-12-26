import React, { useState } from 'react'
import BlogService from '../services/BlogService'

const BlogForm = ({ blogs, setBlogs, setMessage, setError, toggleRef }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const postHandler = async e => {
        e.preventDefault()
        toggleRef.current.toggleVisibility()
        try{
            const data = await BlogService.postBlog({ title, author, url })
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
        <form onSubmit={postHandler}>
            <label>title: </label>
            <input type='text' value={title} onChange={({ target }) => setTitle(target.value)}/> <br />
            <label>author: </label>
            <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/> <br />
            <label>url: </label>
            <input type='text' value={url} onChange={({ target }) => setUrl(target.value)}/><br /><br />
            <button type='submit'>Post</button>
        </form>
    )
}

export default BlogForm