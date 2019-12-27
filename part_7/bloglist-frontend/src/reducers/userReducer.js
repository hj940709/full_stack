import UserService from '../services/UserService'

const reducer = (state = [], action) => {
    switch(action.type){
        case 'INIT_USER':
            return action.data
        default:
            return state
    }
  }

export const initialUser = () => {
    return async dispatch => {
        const data = await UserService.getAll()
        dispatch({
            type: 'INIT_USER',
            data
        })
    }
}

export default reducer