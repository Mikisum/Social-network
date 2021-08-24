import {createStore, combineReducers} from 'redux'
import messagesReducer from './messagesReducer'
import profileReducer from './profileReducer'
import sideBarReducer from './sideBarReducer'
import usersReducer from './usersReducer'

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sideBar: sideBarReducer,
  usersPage: usersReducer
})

let store = createStore(reducers)

export default store