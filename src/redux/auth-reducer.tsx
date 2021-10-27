import { stopSubmit } from "redux-form"
import { ResultCodeForCapcthaEnum, ResultCodesEnum } from "../components/API/api"
import { authAPI } from "../components/API/auth-api"
import { securityAPI } from "../components/API/security-api"

const SET_USER_DATA = 'UPDATE-SET_USER_DATA-POST-TEXT'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null // if null, then captcha is not required
}

export type InitialStateType = typeof initialState

type ActionsType = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

const authReducer = (state = initialState , action: any): InitialStateType => {
  
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

export const getAuthUserData = () => async (dispatch: any) => {
  let meData = await authAPI.me()
    
  if (meData.resultCode === ResultCodesEnum.Success) {
    let {id, login, email} = meData.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}

type SetAuthUserDataActionPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean | null
}

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: {userId, email, login, isAuth}
})


type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: { captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string):GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl}
})

export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string) => async (dispatch: any) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha)
    
  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData())
  } else {
    if(loginData.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let messsage = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
    dispatch(stopSubmit('login', {_error: messsage}))
  }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
  let data = await securityAPI.getCaptchaUrl()
  const captchaUrl = data.url
  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: any) => {
  let data = await authAPI.logout()
    
  if (data.data.resultCode === ResultCodesEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export default authReducer