const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const ADD_POST = 'ADD-POST'

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
newPostText: ''
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

export default profileReducer