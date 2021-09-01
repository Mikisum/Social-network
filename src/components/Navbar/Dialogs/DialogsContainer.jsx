import { sendMessageCreator, updateNewMessageBodyCreator } from '../../../redux/messagesReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'

const mapStateToProps = (state) => {
  return {
    messages: state.messagesPage.messages,
    dialogs: state.messagesPage.dialogs,
    newMessageBody: state.messagesPage.newMessageBody,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onNewMessageChange : (body) => {
      dispatch(updateNewMessageBodyCreator(body))
    },
    onSendMessageChange: () => {
      dispatch(sendMessageCreator())
    }
  }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
  
export default DialogsContainer