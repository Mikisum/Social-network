import React from 'react'
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../../redux/messagesReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    messages: state.messagesPage.messages,
    dialogs: state.messagesPage.dialogs,
    newMessageBody : state.messagesPage.newMessageBody
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
  
export default DialogsContainer