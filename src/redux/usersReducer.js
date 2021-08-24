const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

let initialState = {
  users : [
    // {
    //   id: 1,
    //   name: 'Kolia',
    //   status: 'hi',
    //   followed: true
    // },
    // {
    //   id: 2,
    //   name: 'Dima',
    //   status: 'hi',
    //   followed: false
    // },
    // {
    //   id: 3,
    //   name: 'Vika',
    //   status: 'hi',
    //   followed: true
    // },
    // {
    //   id: 4,
    //   name: 'Sasha',
    //   status: 'hi',
    //   followed: true
    // },
    // {
    //   id: 5,
    //   name: 'Masha',
    //   status: 'hi',
    //   followed: false
    // },
    // {
    //   id: 6,
    //   name: 'Dasha',
    //   status: 'hi',
    //   followed: true
    // }
  ]
}

export const followAC = (userId) => ({type: FOLLOW, userId})
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId}) 
export const setUsersAC = (users) => ({type: SET_USERS, users})

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if(user.id === action.userId) {
            return {...user, followed: true}
          }
          return user
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if(user.id === action.userId) {
            return {...user, followed: false}
          }
          return user
        })
      }

    case SET_USERS: {
      return {
        ...state,
        users: [...state.users, ...action.users]
      }
    }  


    default: 
      return state
  }
}


export default usersReducer