import { usersAPI } from '../components/API/users-api'
import { UserType } from '../types/types'
import { BaseThunkType, InferActionsTypes } from './redux-store'

const initialState = {
  friends: [] as Array<UserType>,
  totalCount: 0
}
export const actions = {
  setFriends: (friends: Array<UserType>) => ({ type: 'SN/SIDEBAR/SET_FRIENDS', friends } as const),
  setTotalCount: (totalCount: number) => ({ type: 'SN/SIDEBAR/SET_TOTAL_COUNT', totalCount } as const)
}

export const requestFriends = (): ThunkType => async (dispatch) => {
  const data = await usersAPI.getFriends()
  dispatch(actions.setFriends(data.items))
  dispatch(actions.setTotalCount(data.totalCount))
}

export const sideBarReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/SIDEBAR/SET_FRIENDS': {
      return {
        ...state,
        friends: action.friends
      }
    }
    case 'SN/SIDEBAR/SET_TOTAL_COUNT': {
      return {
        ...state,
        totalCount: action.totalCount
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
