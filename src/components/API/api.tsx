import axios, { AxiosResponse } from "axios"
import { ProfileType, UserType } from "../../types/types"

const apikey2 = '6e5bc1c7-0c2b-432f-bef7-736bb3e69d6d'
const apikey1 = "f6626ee3-48fb-4ebf-8359-9e3b7c7c3d6f"

export const instance = axios.create({
  withCredentials: true,
  baseURL : 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": apikey2
  }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCapcthaEnum {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}

export const profileAPI = {
  getUsersProfile(userId: number){
    return instance.get(`profile/${userId}`)
  },
  getUsersStatus(userId: number){
    return instance.get(`profile/status/` +userId)
  },
  updateUsersStatus(status: string){
    return instance.put(`profile/status`, { status: status })
  },
  savePhoto(photoFile: any){
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
     })
  },
  saveProfile(profile: ProfileType){
    return instance.put(`profile`, profile)
  }
}

export enum ResultCodes {
  Success = 0,
  Error = 1,
}

export enum ResultCodesForCaptcha {
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodes
  messages: Array<string>
}

type LoginResponseType = {
  resultCode: ResultCodes | ResultCodesForCaptcha
    messages: Array<string>
    data: {
      userId: number
    }
}

export const authAPI = {
  me(){
    return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null ) {
    return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
    .then(res=> res.data)
  },
  logout() {
    return instance.delete(`auth/login`)
  }
}

export const securityAPI = {
  getCaptchaUrl(){
    return instance.get(`security/get-captcha-url`)
  }
}

