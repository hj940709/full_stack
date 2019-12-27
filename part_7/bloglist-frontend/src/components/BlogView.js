import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import TogglableView from './ToggleableView'
import { initialBlog } from '../reducers/blogReducer'

const BlogItem = ({blog}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <Link style={blogStyle} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    )
}

const BlogView = ({ blogs, initialBlog }) => {
    const blogFormRef = React.createRef()

    useEffect(() => {
        initialBlog()
    }, [])

    return (
        <div>
            <h3>Post new blog</h3>
            <TogglableView buttonLabel='New Post' ref={blogFormRef}>
                <BlogForm  toggleRef={blogFormRef}/>
            </TogglableView>
            <br />
            {blogs.map(blog => <p key={blog.id} ><BlogItem blog={blog} /></p>)}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}
const mapDispatchToProps = {
    initialBlog
}

const ConnectedBlogView = connect(mapStateToProps, mapDispatchToProps)(BlogView)
export default ConnectedBlogView

