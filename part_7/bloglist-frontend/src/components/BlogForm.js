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
            await createBlog({ title: title.value, author: author.value, url: url.value })
            title.reset()
            author.reset()
            url.reset()
            setNotification({message: `A new blog: ${title.value} by ${author.value} added`, isError: false}, 5000)
        }catch(error){
            setNotification({message: error.response.data.error, isError: true}, 5000)
        }
    }

    return (
        <form onSubmit={postHandler}>
            <div className="form-group">
                <label>title: </label>
                <input value={title.value} type={title.type} onChange={title.onChange} className={title.className} data-cy='title'/>
            </div>
            <div className="form-group">
                <label>author: </label>
                <input value={author.value} type={author.type} onChange={author.onChange} className={author.className} data-cy='author'/>
            </div>
            <div className="form-group">
                <label>url: </label>
                <input value={url.value} type={url.type} onChange={url.onChange} className={url.className} data-cy='url'/>
            </div>
            <button type='submit' className='btn btn-primary col-sm-3' data-cy='post'>Post</button>
        </form>
    )
}


const mapDispatchToProps = {
    setNotification,
    createBlog
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm
