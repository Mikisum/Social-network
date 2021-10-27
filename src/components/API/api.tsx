import axios from "axios"
import { UserType } from "../../types/types"

const apikey2 = '6e5bc1c7-0c2b-432f-bef7-736bb3e69d6d'
const apikey1 = "f6626ee3-48fb-4ebf-8359-9e3b7c7c3d6f"

export const instance = axios.create({
  withCredentials: true,
  baseURL : 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": apikey1
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


