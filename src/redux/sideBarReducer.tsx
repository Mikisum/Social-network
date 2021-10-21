import { usersAPI } from "../components/API/api"
import { UserType } from "../types/types"

const SET_FRIENDS = 'SET_FRIENDS'

type InitialState = typeof initialState

let initialState = {
  friends: [] as Array<UserType>
  }

export const requestFriends = () => {
  return async(dispatch: any) => {
    const data = await usersAPI.getFriends()
    dispatch(setFriends(data.items))
  }
}  

type SetFriendsActionType = {
  type: typeof SET_FRIENDS, 
  friends: Array<UserType>
}
export const setFriends = (friends: Array<UserType>): SetFriendsActionType => ({type: SET_FRIENDS, friends})

export const sideBarReducer = (state = initialState, action: any): InitialState => {
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