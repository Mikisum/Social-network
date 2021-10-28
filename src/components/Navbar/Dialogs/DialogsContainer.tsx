import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'
import { DialogType, MessageType } from '../../../types/types'
import { AppStateType } from '../../../redux/redux-store'
import { actions } from '../../../redux/messagesReducer'
import { ComponentType } from 'react'

const mapStateToProps = (state: AppStateType)=> {
  return {
    messagesPage: state.messagesPage,
  }
}

export default compose<ComponentType>(
  connect(mapStateToProps, {...actions}),
  withAuthRedirect
)(Dialogs)