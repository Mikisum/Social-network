import { stopSubmit } from "redux-form"
import { authAPI } from "../components/API/api"

const SET_USER_DATA = 'UPDATE-SET_USER_DATA-POST-TEXT'

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
}

const authReducer = (state = initialState , action) => {
  
  switch(action.type) {
    case SET_USER_DATA:{
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export const getAuthUserData = () => (dispatch) => {
  return authAPI.me()
    .then(res => {
      if (res.data.resultCode === 0) {
        let {id, login, email} = res.data.data
        dispatch(setAuthUserData(id, email, login, true))
      }
    })
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: {userId, email, login, isAuth}
})

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(getAuthUserData())
      } else {
        let messsage = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: messsage}))
      }
    })
}

export const logout = () => (dispatch) => {
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
      }
    })
}

export default authReducer