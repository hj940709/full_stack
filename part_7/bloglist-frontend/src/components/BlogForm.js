import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'


const BlogForm = ({ setNotification, createBlog, toggleRef }) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const postHandler = async e => {
        e.preventDefault()
        toggleRef.current.toggleVisibility()
        try{
            createBlog({ title: title.value, author: author.value, url: url.value })
            setNotification({message: `A new blog: ${title.value} by ${author.value} added`, isError: false}, 5000)
        }catch(error){
            setNotification({message: error.response.data.error, isError: true}, 5000)
        }
    }

    return (
        <form onSubmit={postHandler}>
            <label>title: </label>
            <input value={title.value} type={title.type} onChange={title.onChange}/> <br />
            <label>author: </label>
            <input value={author.value} type={author.type} onChange={author.onChange}/> <br />
            <label>url: </label>
            <input value={url.value} type={url.type} onChange={url.onChange}/><br /><br />
            <button type='submit'>Post</button>
        </form>
    )
}


const mapDispatchToProps = {
    setNotification,
    createBlog
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm
