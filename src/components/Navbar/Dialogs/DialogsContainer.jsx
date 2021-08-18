import React from 'react'
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../../redux/messagesReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'

// const DialogsContainer = (props) => {

//   let state = props.store.getState()

//   let onNewMessageChange = (body) => {
//     props.store.dispatch(updateNewMessageBodyCreator(body))
//   }

//   let onSendMessageChange = () => {
//     props.store.dispatch(sendMessageCreator())
//   }

//     return (<Dialogs onNewMessageChange={onNewMessageChange}
//                       onSendMessageChange={onSendMessageChange} 
//                       newMessageBody={state.c.newMessageBody}
//                       dialogs={state.messagesPage.dialogs}
//                       messages={state.messagesPage.messages}/>)
    
// }
const mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage
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