import {createStore, combineReducers, applyMiddleware, compose, Action} from 'redux'
import authReducer from './auth-reducer'
import messagesReducer from './messagesReducer'
import profileReducer from './profileReducer'
import sideBarReducer from './sideBarReducer'
import usersReducer from './usersReducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'
import chatReducer from './chat-reducer'

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sideBar: sideBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
  chat: chatReducer
})

type RootreducerType = typeof rootReducer
export type AppStateType = ReturnType<RootreducerType>

export type InferActionsTypes<T> =T  extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store