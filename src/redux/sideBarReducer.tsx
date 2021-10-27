import { usersAPI } from "../components/API/users-api"
import { UserType } from "../types/types"
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store"

let initialState = {
  friends: [] as Array<UserType>
}
export const actions = {
  setFriends: (friends: Array<UserType>)=> ({type: 'SN/SIDEBAR/SET_FRIENDS', friends})
}

export const requestFriends = (): ThunkType => async(dispatch) => {
    const data = await usersAPI.getFriends()
    dispatch(actions.setFriends(data))
}  

export const sideBarReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>