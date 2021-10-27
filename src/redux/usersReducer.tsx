import { UserType } from "../types/types"
import { updateObjectInArray } from "../components/utils/object-helpers"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { Dispatch } from "react"
import { usersAPI } from "../components/API/users-api"

let initialState = {
  users : [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number> // array of users ids
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch(action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
      }

    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
      }

    case "SET_USERS": {
      return {
        ...state,
        users: action.users
      }
    }  

    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }

    case "SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      }
    }

    case "TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }

    case "TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching 
          ? [...state.followingInProgress, action.userId] 
          :state.followingInProgress.filter(id => id !== action.userId)
      }
    }

    default: 
      return state
  }
}

export const actions = {
  followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
  unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
  setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
  setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
  setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
  toogleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

export const requestUsers = (page: number, 
                            pageSize: number): ThunkType  => {

  return async (dispatch, getstate) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))

    const data = await usersAPI.getUsers(page, pageSize)
  
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) =>ActionsTypes) => {
  dispatch(actions.toogleFollowingProgress(true, userId))
    let res = await apiMethod(userId)
    if (res.resultCode === 0) {
      dispatch(actionCreator(userId))
    }
    dispatch(actions.toogleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType=> {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
  }
}

export default usersReducer

type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>