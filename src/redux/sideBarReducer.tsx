import { usersAPI } from "../components/API/users-api"
import { UserType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

let initialState = {
  friends: [] as Array<UserType>
}
export const actions = {
  setFriends: (friends: Array<UserType>)=> ({type: 'SN/SIDEBAR/SET_FRIENDS', friends})
}

export const requestFriends = (): ThunkType => {
  return async(dispatch) => {
    const data = await usersAPI.getFriends()
    dispatch(actions.setFriends(data.items))
  }
}  

export const sideBarReducer = (state = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case 'SN/SIDEBAR/SET_FRIENDS': {
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

type InitialState = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>