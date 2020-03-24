import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import {
    useHistory
  } from 'react-router-dom'

const Blog = ({ blog, user, setNotification, likeBlog, removeBlog, commentBlog }) => {
    const comment = useField('text')
    const history = useHistory()
    const likeHandler = async () => {
        try{
            likeBlog(blog)
            setNotification({message: `${blog.title} liked`, isError: false}, 5000)
        }catch(error){
            setNotification({message: error.response.data.error, isError: true}, 5000)
        }
    }

    const removeHandler = async () => {
        try{
            if(blog.user.id === user.id){
                removeBlog(blog)
                setNotification({message: `${blog.title} removed`, isError: false}, 5000)
            }
            else setNotification({message: `Unable to remove ${blog.title}`, isError: true}, 5000)
            history.push('/')
        }catch(error){
            setNotification({message: error.response.data.error, isError: true}, 5000)
        }
    }

    const commentHandler = async (e) => {
        e.preventDefault()
        try{
            await commentBlog(blog.id, comment.value)
            console.log(blog)
        }catch(error){
            setNotification({message: error.response.data.error, isError: true}, 5000)
        }
    }

    return (
        <div >
            <div className='col-sm-6'>
                <div >
                    {blog.title} {blog.author}
                </div>
                <div>
                    <a href={blog.url} >{blog.url}</a>
                    <p>{blog.likes} likes <button onClick={() => likeHandler()} className='btn btn-warning' data-cy='like'>like</button></p>
                    added by {blog.user.name} <br />
                    <button onClick={() => removeHandler()} className='btn btn-danger'>remove</button>
                </div>
                <h5>Comments</h5>
                <form onSubmit={commentHandler} className='input-group col-sm-6'>
                    <input value={comment.value} onChange={comment.onChange} type={comment.type} className={comment.className} data-cy='comment-text'/>
                    <span className="input-group-btn"><button type='submit' className='btn btn-default' data-cy='comment-btn'>comment</button></span>
                </form>
            </div>
            <ul className='list-group col-sm-6'>
                {blog.comments.map(comment=><li key={comment.timestamp} className='list-group-item'>{comment.content}</li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user.user
    }
}
const mapDispatchToProps = {
    logout,
    setNotification,
    likeBlog, 
    removeBlog,
    commentBlog
}


const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog
