import * as axios from "axios"

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
  follow(userId){
    return instance.post(`follow/${userId}`) 
  },
  unfollow(userId){
    return instance.delete(`follow/${userId}`) 
  }
}
