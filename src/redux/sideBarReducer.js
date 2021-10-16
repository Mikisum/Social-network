import { usersAPI } from "../components/API/api"

const SET_FRIENDS = 'SET_FRIENDS'
let initialState = {
  friends: []
  }

export const requestFriends = (isFriend) => {
  return async(dispatch) => {
    const data = await usersAPI.getFriends(isFriend)
    dispatch(setFriends(data.items))
  }
}  

export const setFriends = (friends) => ({type: SET_FRIENDS, friends})

export const sideBarReducer = (state = initialState, action) => {
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