import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import TogglableView from './ToggleableView'


const BlogItem = ({blog}) => {

    return (
        <Link to={`/blogs/${blog.id}`} data-cy={blog.title} >{blog.title} {blog.author}</Link>
    )
}

const BlogView = ({ blogs }) => {
    const blogFormRef = React.createRef()
    
    return (
        <div className='col-sm-12'>
            <div className='col-sm-6'>
                <h3>Post new blog</h3>
                <TogglableView buttonLabel='New Post' ref={blogFormRef}>
                    <BlogForm  toggleRef={blogFormRef}/>
                </TogglableView>
            </div >
            <div className='col-sm-6'>
            <ul className='list-group'>
                {blogs.map(blog => <li key={blog.id} className='list-group-item'><BlogItem blog={blog} /></li>)}
            </ul>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}


const ConnectedBlogView = connect(mapStateToProps)(BlogView)
export default ConnectedBlogView

