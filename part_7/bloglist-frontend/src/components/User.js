import React from 'react'
import { connect } from 'react-redux'
import {
    useParams
   } from 'react-router-dom'

const User = ({blogCreators}) => {
    const id = useParams().id
    const blogCreator = blogCreators.find(blogCreator=>blogCreator.id===id)
    if(!blogCreator)
        return <div>No such user</div>
    else{
        return (
            <div>
                <h4>{blogCreator.name}</h4>
                <h5>Added blogs</h5>
                <ul className='list-group col-sm-6'>
                    {blogCreator.blogs.map(blog => <li key={blog.id} className='list-group-item'>{blog.title}</li>)}
                </ul>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        blogCreators : state.blogCreators
    }
}
const ConnectedUser = connect(mapStateToProps)(User)
export default ConnectedUser