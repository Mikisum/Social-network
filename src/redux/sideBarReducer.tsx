import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { usersAPI } from "../components/API/users-api"
import { UserType } from "../types/types"
import { AppStateType } from "./redux-store"

const SET_FRIENDS = 'SET_FRIENDS'

type InitialState = typeof initialState

let initialState = {
  friends: [] as Array<UserType>
  }

type ActionsType = SetFriendsActionType
type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestFriends = (): ThunkType => {
  return async(dispatch) => {
    const data = await usersAPI.getFriends()
    dispatch(setFriends(data.items))
  }
}  

type SetFriendsActionType = {
  type: typeof SET_FRIENDS, 
  friends: Array<UserType>
}
export const setFriends = (friends: Array<UserType>): SetFriendsActionType => ({type: SET_FRIENDS, friends})

export const sideBarReducer = (state = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case SET_FRIENDS: {
      return {
        ...state,
        friends: action.friends
      }
    }
    default: 
      return state
  }
}

export default sideBarReducer