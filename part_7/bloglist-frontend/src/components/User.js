import React from 'react'
import { connect } from 'react-redux'

const User = ({blogCreatorId, blogCreators}) => {
    const blogCreator = blogCreators.find(blogCreator=>blogCreator.id===blogCreatorId)
    return (
        <div>
            <h4>{blogCreator.name}</h4>
            <h5>Added blogs</h5>
            <ul>
                {blogCreator.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogCreators : state.blogCreators
    }
}
const ConnectedUser = connect(mapStateToProps)(User)
export default ConnectedUser