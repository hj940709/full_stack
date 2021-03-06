const reducer = (state = '', action) => {
    switch(action.type){
        case 'CHANGE_FILTER':
            return action.data
        default:
            return state
    }
  }
  
export const changeFilter = (content) => {
    return {
        type: 'CHANGE_FILTER',
        data: content
    }
}


export default reducer