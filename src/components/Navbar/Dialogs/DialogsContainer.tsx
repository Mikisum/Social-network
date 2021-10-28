import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'
import { DialogType, MessageType } from '../../../types/types'
import { AppStateType } from '../../../redux/redux-store'
import { actions } from '../../../redux/messagesReducer'

// type MapStatePropsType = {
//   messages: Array<MessageType>
//   dialogs: Array<DialogType>
// }

// type MapDispatchPropsType = {
//   onSendMessage: (newMessage: string) => void
// }

const mapStateToProps = (state: AppStateType)=> {
  return {
    messagesPage: state.messagesPage,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return{
//     onSendMessage: (newMessage: string) => {
//       dispatch(actions.sendMessage(newMessage))
//     }
//   }
// }

export default compose(
  connect(mapStateToProps, {...actions}),
  withAuthRedirect
)(Dialogs)