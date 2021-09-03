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
  },
  getUsersProfile(userId){
    console.log('Obsolete method.Please profileAPI object')
    return profileAPI.getUsersStatus(userId)
  }
}

export const profileAPI = {
  getUsersProfile(userId){
    return instance.get(`profile/${userId}`)
  },
  getUsersStatus(userId){
    return instance.get(`profile/status/` +userId)
  },
  updateUsersStatus(status){
    return instance.put(`profile/status`, { status: status })
  }
}

export const authAPI = {
  me(){
    return instance.get(`auth/me`)
  },
  login() {
    return instance.post(`auth/login`)
  },

  logout() {
    return instance.delete(`auth/login`)
  }
}
