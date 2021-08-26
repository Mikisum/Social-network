const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

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
newPostText: '',
profile: null
}

const profileReducer = (state = initialState , action) => {

  let stateCopy
  
  switch(action.type) {
    case ADD_POST:{
      return stateCopy = {
        ...state,
        posts: [
          ...state.messages,
          { id: 6, 
            message: state.newPostText, 
            likesCount: 0
          }
        ],
        newPostText: ''
      }
    }
    case UPDATE_NEW_POST_TEXT: {
      return stateCopy = {
        ...state,
        newPostText: action.newPostText
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

export const addPostActionCreator = () => ({
  type: ADD_POST
})

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, 
    newPostText: text
})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile: profile})

export default profileReducer