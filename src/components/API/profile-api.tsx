import { PhotosType, ProfileType } from "../../types/types"
import { APIResponseType, GetItemsType, instance } from "./api"

type SavePhohoResponseDataType = {
  photos: PhotosType
}

export const profileAPI = {
  getUsersProfile(userId: number){
    return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
  },
  getUsersStatus(userId: number){
    return instance.get<string>(`profile/status/` +userId).then(res => res.data)
  },
  updateUsersStatus(status: string){
    return instance.put<APIResponseType>(`profile/status`, { status: status }).then(res => res.data)
  },
  savePhoto(photoFile: any){
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put<APIResponseType<SavePhohoResponseDataType>>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
     }).then(res => res.data)
  },
  saveProfile(profile: ProfileType){
    return instance.put<APIResponseType>(`profile`, profile).then(res => res.data)
  }
}