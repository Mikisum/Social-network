import { stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { profileAPI } from "../components/API/api"
import { usersAPI } from "../components/API/users-api"
import { PhotosType, PostType, ProfileType } from "../types/types"
import { AppStateType } from "./redux-store"

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

type ActionsType = AddPostActionType | DeletePostActiontype | SetUserProfileActionType
  | SetUsersStatusActionType | SavePhotoSuccessActionType

const profileReducer = (state = initialState , action: ActionsType): InitialStateType => {

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
        posts: state.posts.filter(p => p.id !== action.postId)
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
      } as ProfileType
    }
  }
      default:
        return state
  }
}

type AddPostActionType = {
  type: typeof ADD_POST
  newPostText: string
}

export const addPostActionCreator = (newPostText: string): AddPostActionType => ({
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

type SetUsersStatusActionType = {
  type: typeof SET_USERS_STATUS
  status: string
}
export const setUsersStatus = (status: string):SetUsersStatusActionType => ({type: SET_USERS_STATUS, status})

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType):SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
  const res = await profileAPI.getUsersProfile(userId)
 
  dispatch(setUserProfile(res.data))
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUsersStatus = (userId : number): ThunkType => async (dispatch) => {
  const res = await profileAPI.getUsersStatus(userId)
 
  dispatch(setUsersStatus(res.data))
}

export const updateUsersStatus = (status: string): ThunkType => async (dispatch) => {
  try{
    const res = await profileAPI.updateUsersStatus(status)
    if(res.data.resultCode === 0) {
      dispatch(setUsersStatus(status))
    }
  } catch(error) {
    alert('some error')
  }
}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
  const res = await profileAPI.savePhoto(file)

  if(res.data.resultCode === 0) {
    dispatch(savePhotoSuccess(res.data.data.photos))
  }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const res = await profileAPI.saveProfile(profile)
  if(res.data.resultCode === 0) {
    if (userId != null) {
      dispatch(getUsersProfile(userId))
    } else {
      throw new Error("userId can't be null")
    }
  } else {
    // dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0]}))
    return Promise.reject(res.data.messages[0]);
  }
}

export default profileReducer