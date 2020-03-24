import React, { useState } from 'react'

const Blog = ({ blog, likeHandler, removeHandler }) => {
    const [visible, setVisible] = useState(true)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    

    return (
        <div style={blogStyle}>
            <div onClick={() => setVisible(!visible)}>
                {blog.title} {blog.author}
            </div>
            <div style={hideWhenVisible}>
                <a href={blog.url} >{blog.url}</a> <br/>
                <span className='like_num' >{blog.likes} likes</span><button className='likeBtn' data-cy='like' onClick={() => likeHandler(blog)}>like</button><br />
                added by {blog.user.name} <br />
                <button data-cy='remove' onClick={() => removeHandler(blog)}>remove</button>
            </div>
        </div>
    )
}


export default Blog