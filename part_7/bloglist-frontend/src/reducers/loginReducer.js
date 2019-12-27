import LoginService from '../services/LoginService'
let initialState = JSON.parse(window.localStorage.getItem('user'))
if (initialState === null) initialState = {user: null, token: null}
const reducer = ( state = initialState, action ) => {
    switch(action.type){
    case 'LOGIN':
        return action.data
    case 'LOGOUT':
        return initialState
    default:
        return state
    }
}

export const login = (credentials) => {
    return async dispatch => {
        const data = await LoginService.login(credentials)
        window.localStorage.setItem('user', JSON.stringify(data))
        dispatch({
            type: 'LOGIN',
            data: data
        })
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('user')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default reducer