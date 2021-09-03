import { profileAPI, usersAPI } from "../components/API/api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USERS_STATUS = 'SET_USERS_STATUS'


let initialState = {
  posts : [
  {
    id: 1,
    message: 'hey',
    likesCount: 10
  },
  {
    id: 2,
    message: 'What?',
    likesCount: 15
  }
],
profile: null,
status: ''
}

const profileReducer = (state = initialState , action) => {

  switch(action.type) {
    case ADD_POST:{
      let newPost = {
        id: 6, 
        message: action.newPostText, 
        likesCount: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    }
   
    case SET_USERS_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile
      }
    }
      default:
        return state
  }
}

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText
})

export const getUsersProfile = (userId) => (dispatch) => {
  usersAPI.getUsersProfile(userId)
  .then(data => {
    dispatch(setUserProfile(data.statusText))
  })
}

export const getUsersStatus = (userId) => (dispatch) => {
  profileAPI.getUsersStatus(userId)
  .then(res => {
    dispatch(setUsersStatus(res.data))
  })
}

export const updateUsersStatus = (status) => (dispatch) => {
  profileAPI.updateUsersStatus(status)
  .then(res => {
    if(res.data.resultCode == 0) {
      dispatch(setUsersStatus(status))
    }
  })
}


export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile: profile})
export const setUsersStatus = (status) => ({type: SET_USERS_STATUS, status: status})

export default profileReducer