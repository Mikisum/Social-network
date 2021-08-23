import {createStore, combineReducers} from 'redux'
import friendsReducer from './friendsReducer'
import messagesReducer from './messagesReducer'
import profileReducer from './profileReducer'
import sideBarReducer from './sideBarReducer'

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sideBar: sideBarReducer,
  friendsPage: friendsReducer
})

let store = createStore(reducers)

export default store