import axios, { AxiosResponse } from "axios"
import { ProfileType } from "../../types/types"

const instance = axios.create({
  withCredentials: true,
  baseURL : 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "f6626ee3-48fb-4ebf-8359-9e3b7c7c3d6f"
  }
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10){
    return instance.get(`users?page=${currentPage}&count=${pageSize}`) 
      .then(res => res.data)
  },
  getFriends(count = 100){
    return instance.get(`users?friend=true&count=${count}`) 
      .then(res => res.data)
  },
  follow(userId: number){
    return instance.post(`follow/${userId}`) 
  },
  unfollow(userId: number){
    return instance.delete(`follow/${userId}`) 
  },
  getUsersProfile(userId: number){
    console.log('Obsolete method.Please profileAPI object')
    return profileAPI.getUsersProfile(userId)
  }
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

