import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const UserItem = ({blogCreator}) => (
    <tr>
        <td>
            <Link to={`/user/${blogCreator.id}`}>{blogCreator.name}</Link>
        </td>
        <td>{blogCreator.blogs.length}</td>
    </tr>
)

const UserView = ({ blogCreators }) => {
    return (
        <div>
            <h3>Users</h3>
            <table className='table'>
                <tbody>
                    <tr>
                        <td></td>
                        <td>blogs created</td>
                    </tr>
                    {blogCreators.map(blogCreator=><UserItem key={blogCreator.id} blogCreator={blogCreator}/>)}
                </tbody>
            </table>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        blogCreators : state.blogCreators
    }
}

const ConnectedUserView = connect(mapStateToProps)(UserView)
export default ConnectedUserView