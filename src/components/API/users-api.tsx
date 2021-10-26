import { APIResponseType, GetItemsType, instance, profileAPI } from "./api"

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10){
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`) 
      .then(res => res.data)
  },
  getFriends(count = 100){
    return instance.get(`users?friend=true&count=${count}`) 
      .then(res => res.data)
  },
  follow(userId: number){
    return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data) 
  },
  unfollow(userId: number){
    return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
  }
}