import { AppStateType } from "../../redux/redux-store"

export const getFriends = (state: AppStateType) => {
  return state.usersPage.users.filter(u => u.followed = true)
}