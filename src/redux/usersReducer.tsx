import { usersAPI } from "../components/API/api"
import { UserType } from "../components/types/types"
import { updateObjectInArray } from "../components/utils/object-helpers"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOOGLE_IS_DISABLED = 'TOOGLE_IS_DISABLED'

type InitialState = typeof initialState

let initialState = {
  users : [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  isDisabled: [] as Array<number> // array of users ids
}

type followSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}
export const followSuccess = (userId: number):followSuccessActionType => ({type: FOLLOW, userId})

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId}) 

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})

type ToggleIsDisabledActionType = {
  type: typeof TOOGLE_IS_DISABLED
  isFetching: boolean
  userId: number
}
export const toggleIsDisabled = (isFetching: boolean, userId: number): ToggleIsDisabledActionType => ({type: TOOGLE_IS_DISABLED, isFetching, userId})


export const requestUsers = (page: number, pageSize: number) => {

  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    const data = await usersAPI.getUsers(page, pageSize)
  
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
  }
  
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleIsDisabled(true, userId))
    let res = await apiMethod(userId)
    if (res.data.resultCode === 0) {
      dispatch(actionCreator(userId))
    }
    dispatch(toggleIsDisabled(false, userId))
}

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
  }
}

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  }
}

const usersReducer = (state = initialState, action: any): InitialState => {
  switch(action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
      }

    case SET_USERS: {
      return {
        ...state,
        users: action.users
      }
    }  

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }

    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      }
    }

    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }

    case TOOGLE_IS_DISABLED: {
      return {
        ...state,
        isDisabled: action.isFetching 
          ? [...state.isDisabled, action.userId] 
          :state.isDisabled.filter(id => id !== action.userId)
      }
    }

    default: 
      return state
  }
}

export default usersReducer