import { stopSubmit } from "redux-form"
import { authAPI, securityAPI } from "../components/API/api"

const SET_USER_DATA = 'UPDATE-SET_USER_DATA-POST-TEXT'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null // if null, then captcha is not required
}

const authReducer = (state = initialState , action) => {
  
  switch(action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export const getAuthUserData = () => async (dispatch) => {
  let res = await authAPI.me()
    
  if (res.data.resultCode === 0) {
    let {id, login, email} = res.data.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: {userId, email, login, isAuth}
})

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl}
})

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  let res = await authAPI.login(email, password, rememberMe, captcha)
    
  if (res.data.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    if(res.data.resultCode === 10) {
      dispatch(getCaptchaUrl())
    }
    let messsage = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
    dispatch(stopSubmit('login', {_error: messsage}))
  }
}

export const getCaptchaUrl = () => async (dispatch) => {
  let res = await securityAPI.getCaptchaUrl()
  const captchaUrl = res.data.url
  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
  let res = await authAPI.logout()
    
  if (res.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export default authReducer