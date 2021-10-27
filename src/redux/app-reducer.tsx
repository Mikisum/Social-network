import { getAuthUserData } from "./auth-reducer"
import { InferActionsTypes } from "./redux-store"

type InitialStateType = typeof initialState

let initialState = {
  initialized: false
}

type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState , action: ActionsType): InitialStateType => {
  
  switch(action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS':{
      return {
        ...state,
        initialized: true
      }
    }
    default:
      return state
  }
}

const actions = {
  initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  //dispatch(somethingelse())
  Promise.all([promise])
    .then(() => {
      dispatch(actions.initializedSuccess())
  })
}

export default appReducer