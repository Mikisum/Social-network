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
        ...action.data,
        isAuth: true
      }
    }
    default:
      return state
  }
}

export const getAuthUserData = () => (dispatch) => {
  authAPI.me()
    .then(res => {
      if (res.data.resultCode === 0) {
        let {id, login, email} = res.data.data
        dispatch(setAuthUserData(id, email, login))
      }
    })
}

export const setAuthUserData = (userId, email, login) => ({
  type: SET_USER_DATA,
  data: {userId, email, login}
})

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(getAuthUserData())
      }
    })
}

export const logout = (email, password, rememberMe) => (dispatch) => {
  authAPI.logout(email, password, rememberMe)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(getAuthUserData())
      }
    })
}

export default authReducer