import { FormAction, stopSubmit } from "redux-form"
import { profileAPI } from "../components/API/profile-api"
import { PhotosType, PostType, ProfileType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const ADD_POST = 'SN/PROFILE/ADD-POST'
const SET_USER_PROFILE = 'SN/PROFILE/SET_USER_PROFILE'
const SET_USERS_STATUS = 'SN/PROFILE/SET_USERS_STATUS'
const DELETE_POST = 'SN/PROFILE/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SN/PROFILE/SAVE_PHOTO_SUCCESS'

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

export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
  deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
  setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile: profile} as const),
  setUsersStatus: (status: string) => ({type: SET_USERS_STATUS, status} as const),
  savePhotoSuccess: (photos: PhotosType)=> ({type: SAVE_PHOTO_SUCCESS, photos} as const)
}

export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getUsersProfile(userId)
  dispatch(actions.setUserProfile(data))
}

export const getUsersStatus = (userId : number): ThunkType => async (dispatch) => {
  const res = await profileAPI.getUsersStatus(userId)
  dispatch(actions.setUsersStatus(res))
}

export const updateUsersStatus = (status: string): ThunkType => async (dispatch) => {
  try{
    const res = await profileAPI.updateUsersStatus(status)
    if(res.resultCode === 0) {
      dispatch(actions.setUsersStatus(status))
    }
  } catch(error) {
    alert('some error')
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const res = await profileAPI.savePhoto(file)

  if(res.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(res.data.photos))
  }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const res = await profileAPI.saveProfile(profile)
  if(res.resultCode === 0) {
    if (userId != null) {
      dispatch(getUsersProfile(userId))
    } else {
      throw new Error("userId can't be null")
    }
  } else {
    dispatch(stopSubmit('edit-profile', {_error: res.messages[0]}))
    return Promise.reject(res.messages[0]);
  }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export default profileReducer