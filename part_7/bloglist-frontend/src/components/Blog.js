import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'


const Blog = ({ blogId, blogs, setNotification, likeBlog, removeBlog }) => {
    const blog = blogs.find(blog=>blog.id===blogId)

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
            removeBlog(blog)
            setNotification({message: `${blog.title} removed`, isError: false}, 5000)
        }catch(error){
            setNotification({message: error.response.data.error, isError: true}, 5000)
        }
    }

    return (
        <div >
            <div >
                {blog.title} {blog.author}
            </div>
            <div>
                <a href={blog.url} >{blog.url}</a>
                <p>{blog.likes} likes <button onClick={() => likeHandler()}>like</button></p>
                added by {blog.user.name} <br />
                <button onClick={() => removeHandler()}>remove</button>
            </div>
            <h5>Comments</h5>
            <ul>
                {blog.comments.map(comment=><li key={comment.id}>{comment.content}</li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}
const mapDispatchToProps = {
    logout,
    setNotification,
    likeBlog, 
    removeBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog
