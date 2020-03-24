import React, { useState } from 'react'

const BlogForm = ({ postHandler }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const post = async e => {
        e.preventDefault()
        postHandler(title, author, url)
    }

    return (
        <form onSubmit={post}>
            <label>title: </label>
            <input id='title' data-cy='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)}/> <br />
            <label>author: </label>
            <input id='author' data-cy='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/> <br />
            <label>url: </label>
            <input id='url' data-cy='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)}/><br /><br />
            <button data-cy='post' type='submit'>Post</button>
        </form>
    )
}

export default BlogForm