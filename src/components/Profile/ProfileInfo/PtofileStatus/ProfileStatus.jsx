import React from 'react'

class ProfileStatus extends React.Component {
 
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

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate = (prevProps, prevstate) => {
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