import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { initialUser } from '../reducers/userReducer'

const UserItem = ({blogCreator}) => (
    <tr>
        <td>
            <Link to={`/user/${blogCreator.id}`}>{blogCreator.name}</Link>
        </td>
        <td>{blogCreator.blogs.length}</td>
    </tr>
)

const UserView = ({ blogCreators, initialUser }) => {
    useEffect(()=>{
        initialUser()
    }, [])

    return (
        <div>
            <h3>Users</h3>
            <table>
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
const mapDispatchToProps = {
    initialUser
}

const ConnectedUserView = connect(mapStateToProps, mapDispatchToProps)(UserView)
export default ConnectedUserView