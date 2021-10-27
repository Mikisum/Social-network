import { createSelector } from "reselect"
import { AppStateType } from "./redux-store"
import usersReducer from "./usersReducer"

export const getUsers = (state: AppStateType) => {
  return state.usersPage.users
}

export const getFriends = createSelector(getUsers, 
  (users) => {
  return users.filter(u => u.followed === true)
})

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress
}