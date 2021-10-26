import { GetItemsType, instance } from './api'

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10){
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`) 
      .then(res => res.data)
  },
  getFriends(count = 100){
    return instance.get<GetItemsType>(`users?friend=true&count=${count}`) 
      .then(res => res.data)
  },
  follow(userId: number){
    return instance.post<ResponseType>(`follow/${userId}`) 
  },
  unfollow(userId: number){
    return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
  }
}
