import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    user: loginReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    blogCreators: userReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

export default store