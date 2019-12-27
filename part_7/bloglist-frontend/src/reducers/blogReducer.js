import BlogService from '../services/BlogService'

const reducer = (state = [], action) => {
    let newState
    switch(action.type){
        case 'CREATE_BLOG':
            const newObject = {...action.data}
            newState = state.concat(newObject)
            newState.sort((a, b) => b.votes - a.votes)
            return newState
        case 'LIKE_BLOG':
            const id = action.data.id
            const toChange = state.find(n => n.id === id)
            const changed = {...toChange, likes: toChange.likes + 1}
            newState = state.map(blog => blog.id !==id ? blog : changed)
            newState.sort((a, b) => b.votes - a.votes)
            return newState
        case 'REMOVE_BLOG':
            return state.filter(blog=>blog.id!==action.data.id)
        case 'INIT_BLOG':
            return action.data
        default:
            return state
    }
  }
  
export const initialBlog = () => {
    return async dispatch => {
        const data = await BlogService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            data
        })
    }
}
  
export const createBlog = content => {
    return async dispatch => {
        const data = await BlogService.postBlog(content)
        dispatch({
            type: 'CREATE_BLOG',
            data
        })
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        const newData = await BlogService.likeBlog(blog)
        dispatch({
            type: 'LIKE_BLOG',
            data: newData
        })
    }
}

export const removeBlog = blog => {
    return async dispatch => {
        await BlogService.removeBlog(blog.id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: blog
        })
    }
}


  
  export default reducer