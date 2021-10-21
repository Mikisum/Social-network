import { sendMessageCreator } from '../../../redux/messagesReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'
import { DialogType, MessageType } from '../../../types/types'
import { AppStateType } from '../../../redux/redux-store'

type MapStatePropsType = {
  messages: Array<MessageType>
  dialogs: Array<DialogType>
}

type MapDispatchPropsType = {
  onSendMessage: (newMessage: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    messages: state.messagesPage.messages,
    dialogs: state.messagesPage.dialogs,
  }
}

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return{
    onSendMessage: (newMessage: string) => {
      dispatch(sendMessageCreator(newMessage))
    }
  }
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)