import {createStore, combineReducers, applyMiddleware} from 'redux'
import authReducer from './auth-reducer'
import messagesReducer from './messagesReducer'
import profileReducer from './profileReducer'
import sideBarReducer from './sideBarReducer'
import usersReducer from './usersReducer'
import thunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sideBar: sideBarReducer,
  usersPage: usersReducer,
  auth: authReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.store = store
export default store