import { ChangeEvent, Component } from 'react'

type PropsType = {
  status: string
  updateUsersStatus: (newStatus: string) => void
}

type StateType = {
  editMode: boolean
  status: string
}

class ProfileStatus extends Component<PropsType, StateType> {

  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateUsersStatus(this.state.status)
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate = (prevProps: PropsType, prevstate: StateType) => {
    if (prevProps.status !== this.props.status)
    this.setState({
      status: this.props.status
    })
  }

  render(){
    return (
      <div>
        {
          !this.state.editMode &&
            <div>
              <span onClick={this.activateEditMode}>{this.props.status || '---'}</span>
            </div>
        }
        {
          this.state.editMode &&
            <div>
              <input 
                value={this.state.status}
                onBlur={this.deactivateEditMode}
                onChange={this.onStatusChange}
                autoFocus
              />
            </div>
        } 
      </div>
    )
  }
}

export default ProfileStatus