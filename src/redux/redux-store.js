import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import authReducer from './auth-reducer'
import messagesReducer from './messagesReducer'
import profileReducer from './profileReducer'
import sideBarReducer from './sideBarReducer'
import usersReducer from './usersReducer'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sideBar: sideBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store