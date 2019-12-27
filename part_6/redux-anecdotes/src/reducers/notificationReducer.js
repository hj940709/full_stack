const reducer = (state = null, action) => {
    switch(action.type){
        case 'CREATE_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
  }
  
export const createNotification = (content) => {
    return {
        type: 'CREATE_NOTIFICATION',
        data: content
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
    }
}


export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(createNotification(content))
        setTimeout(()=>dispatch(removeNotification()), time)
    }
}

export default reducer