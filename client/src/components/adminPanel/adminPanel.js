import React, { Component } from 'react';
import NewUserPanel from './newUserPanel'
import DeleteUserPanel from './deleteUserPanel'

class AdminPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: '1'
      }}>
        <NewUserPanel token={this.props.token}/>
        <DeleteUserPanel token={this.props.token}/>
      </div>
    )
  }
}

export default AdminPanel;
