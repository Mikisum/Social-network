import { stopSubmit } from "redux-form"
import { profileAPI, usersAPI } from "../components/API/api"
import { PhotosType, PostType, ProfileType } from "../components/types/types"

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
] as Array<PostType>,
profile: null as ProfileType | null,
status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState , action: any) => {

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

type addPostActionType = {
  type: typeof ADD_POST
  newPostText: string
}

export const addPostActionCreator = (newPostText: string): addPostActionType => ({
  type: ADD_POST,
  newPostText
})

type DeletePostActiontype = {
  type: typeof DELETE_POST
  postId: number
}

export const deletePost = (postId: number): DeletePostActiontype => ({type: DELETE_POST, postId})

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile: profile})

type setUsersStatusActionType = {
  type: typeof SET_USERS_STATUS
  status: string
}
export const setUsersStatus = (status: string):setUsersStatusActionType => ({type: SET_USERS_STATUS, status})


type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType):SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUsersProfile = (userId: number) => async (dispatch: any) => {
  const res = await usersAPI.getUsersProfile(userId)
 
  dispatch(setUserProfile(res.data))
}

export const getUsersStatus = (userId = 2) => async (dispatch: any) => {
  const res = await profileAPI.getUsersStatus(userId)
 
  dispatch(setUsersStatus(res.data))
}

export const updateUsersStatus = (status: string) => async (dispatch: any) => {
  try{
    const res = await profileAPI.updateUsersStatus(status)
    if(res.data.resultCode === 0) {
      dispatch(setUsersStatus(status))
    }
  } catch(error) {
    alert('some error')
  }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
  const res = await profileAPI.savePhoto(file)

  if(res.data.resultCode === 0) {
    dispatch(savePhotoSuccess(res.data.data.photos))
  }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.userId
  const res = await profileAPI.saveProfile(profile)
  if(res.data.resultCode === 0) {
    dispatch(getUsersProfile(userId))
  } else {
    dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0]}))
    return Promise.reject(res.data.messages[0]);
  }
}

export default profileReducer