import { instance, ResponseType, ResultCodes, ResultCodesForCaptcha } from "./api"

type MeResponseType = {
  id: number
  email: string
  login: string
}

type LoginResponseDataType = {
  userId: number
}

export const authAPI = {
  me(){
    return instance.get<ResponseType<MeResponseType>>(`auth/me`).then(res => res.data)
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null ) {
    return instance.post<ResponseType<LoginResponseDataType, ResultCodes | ResultCodesForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
    .then(res=> res.data)
  },
  logout() {
    return instance.delete(`auth/login`)
  }
}