import { getAuthUserData } from "./auth-reducer"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
  initialized: false
}

const appReducer = (state = initialState , action) => {
  
  switch(action.type) {
    case INITIALIZED_SUCCESS:{
      return {
        ...state,
        initialized: true
      }
    }
    default:
      return state
  }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData())
  //dispatch(somethingelse())
  //dispatch(somethingelse())
  Promise.all([promise])
    .then(() => {
      dispatch(initializedSuccess())
  })
}

// export const login = (email, password, rememberMe) => (dispatch) => {
//   authAPI.login(email, password, rememberMe)
//     .then(res => {
//       if (res.data.resultCode === 0) {
//         dispatch(getAuthUserData())
//       } else {
//         let messsage = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
//         dispatch(stopSubmit('login', {_error: messsage}))
//       }
//     })
// }

// export const logout = () => (dispatch) => {
//   authAPI.logout()
//     .then(res => {
//       if (res.data.resultCode === 0) {
//         dispatch(setAuthUserData(null, null, null, false))
//       }
//     })
// }

export default appReducer