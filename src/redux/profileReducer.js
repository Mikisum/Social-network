import { stopSubmit } from "redux-form"
import { profileAPI, usersAPI } from "../components/API/api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USERS_STATUS = 'SET_USERS_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


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
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.id)
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
    
    case SAVE_PHOTO_SUCCESS: {
    return {
      ...state,
      profile: {
        ...state.profile,
        photos: action.photos
      }
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

export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const getUsersProfile = (userId) => async (dispatch) => {
  const res = await usersAPI.getUsersProfile(userId)
 
  dispatch(setUserProfile(res.data))
}

export const getUsersStatus = (userId = 2) => async (dispatch) => {
  const res = await profileAPI.getUsersStatus(userId)
 
  dispatch(setUsersStatus(res.data))
}

export const updateUsersStatus = (status) => async (dispatch) => {
  const res = await profileAPI.updateUsersStatus(status)

  if(res.data.resultCode === 0) {
    dispatch(setUsersStatus(status))
  }
}

export const savePhoto = (file) => async (dispatch) => {
  const res = await profileAPI.savePhoto(file)

  if(res.data.resultCode === 0) {
    dispatch(savePhotoSuccess(res.data.data.photos))
  }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const res = await profileAPI.saveProfile(profile)
  if(res.data.resultCode === 0) {
    dispatch(getUsersProfile(userId))
  } else {
    dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0]}))
    return Promise.reject(res.data.messages[0]);
  }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile: profile})
  
export const setUsersStatus = (status) => ({type: SET_USERS_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export default profileReducer