import React, { Component } from 'react'
import TextField from '../GeneralUI/TextField'
import FlatButton from '../GeneralUI/FlatButton'
import ErrorNotif from '../GeneralUI/ErrorNotif/ErrorNotif'
import InfoNotif from '../GeneralUI/InfoNotif'

class DeleteUserPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      balance: 500,
      admin: false
    };
  }

  componentDidMount () {}

  textFieldStyle = {
    padding: '0 2px'
  };

  attemptDeleteUser = () => {
    console.log('attempting to delete user')
    let errorFlag = false

    if (this.state.username.length === 0) {
      console.log('username error?')
      this.setState({
        usernameError: 'Provide a Username'
      });
      errorFlag = true
    } else {
      this.setState({
        usernameError: ''
      });
    }

    if (errorFlag) {
      this.setState({
        generalError: '' // reset general error
      });
      return false
    }

    fetch('/api/users/delete', {
      method: 'GET',
      mode: 'cors',
      headers: {
        token: this.props.token,
        user: this.state.username
      }
    })
      .then(res => {
        // deconstruct response from server
        return res.text().then(text => {
          return {
            status: res.status,
            message: text
          };
        });
      })
      .then(({status, message}) => {
        // applying body based on status code
        if (status === 200) {
          this.setState({
            username: '',
            generalError: '',
            generalInfo: 'Deleted User!'
          });
        } else if (status === 400) {
          this.setState({
            generalError: message
          });
        }
      })
      .catch(reason => {
        console.log('error')
        console.log(reason)
      });
  };

  render() {
    return (
      <div
        style={{
          border: '1px solid',
          borderColor: 'white',
          borderRadius: '5px',
          padding: '5px',
          margin: '5px',
          maxWidth: '300px'
        }}
      >
        <h3>Delete User</h3>
        {this.state.generalError ? (
          <ErrorNotif message={this.state.generalError}/>
        ) : null}
        {this.state.generalInfo ? (
          <InfoNotif message={this.state.generalInfo}/>
        ) : null}
        <TextField
          placeholder="JohnDoe"
          type="text"
          onChange={nv => this.setState({username: nv})}
          errorText={this.state.usernameError ? this.state.usernameError : ''}
          style={this.textFieldStyle}
        />
        <FlatButton
          text="Delete User"
          onClick={this.attemptDeleteUser}
          style={{
            display: 'block'
          }}
        />
      </div>
    );
  }
}

export default DeleteUserPanel;
