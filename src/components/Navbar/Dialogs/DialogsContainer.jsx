import { sendMessageCreator, updateNewMessageBodyCreator } from '../../../redux/messagesReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)