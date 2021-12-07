import { message } from "antd"
import { stopSubmit } from "redux-form"
import { ResultCodeForCapcthaEnum, ResultCodesEnum } from "../components/API/api"
import { authAPI } from "../components/API/auth-api"
import { securityAPI } from "../components/API/security-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
// import { useForm, ErrorMessage } from "react-hook-form";
const getLocalStorage = () => {
  if (localStorage.getItem('data')) return  +JSON.parse(localStorage.data).userId
}

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, // if null, then captcha is not required
  error:'',
  isFetching: false,
}



const authReducer = (state = initialState , action: ActionsType): InitialStateType => {
  
  switch(action.type) {
    case 'SN/auth/SET_USER_DATA':
    case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
    case 'SN/auth/GET_ERROR':
    case 'SN/auth/SET_IS_FETCHING':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SN/auth/SET_USER_DATA',
    payload: {userId, email, login, isAuth}
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',payload: {captchaUrl}} as const),
  getError: (error: string) => ({type: 'SN/auth/GET_ERROR', payload: {error} as const}),
  setIsFetching: (isFetching: boolean) => ({type: 'SN/auth/SET_IS_FETCHING', payload: {isFetching} as const}),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  if(localStorage.data) {
   
    let {userId, email, login, isAuth} = JSON.parse(localStorage.data)
    dispatch(actions.setAuthUserData(userId, email, login, isAuth))
    return
  }
  let meData = await authAPI.me()
    
  if (meData.resultCode === ResultCodesEnum.Success) {
    let {id, login, email} = meData.data
    let data = {'userId': `${id}`, 'email': `${email}`, 'login': `${login}`, 'isAuth': true}
    localStorage.setItem('data', JSON.stringify(data))
    dispatch(actions.setAuthUserData(id, email, login, true))
    
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string): ThunkType => async (dispatch) => {
  dispatch(actions.setIsFetching(true))
  let loginData = await authAPI.login(email, password, rememberMe, captcha);
  dispatch(actions.setIsFetching(false))
    
  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData())
  } else {
    if(loginData.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let messsage = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
    dispatch(stopSubmit('login', {_error: messsage}))
    dispatch(actions.getError(messsage))
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl()
  const captchaUrl = data.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch: any) => {
  let data = await authAPI.logout()
    
  if (data.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
    localStorage.removeItem('data')
  }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

export default authReducer