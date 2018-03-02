import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

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
    }
  }

  componentDidMount() {

  }

  textFieldStyle = {
    padding: '0 2px'
  }

  attemptDeleteUser = () => {
    console.log('attempting to delete user')
    let errorFlag = false

    if(this.state.username.length === 0) {
      console.log('username error?')
      this.setState({
        usernameError: 'Provide a Username'
      })
      errorFlag = true
    } else {
      this.setState({
        usernameError: ''
      })
    }

    if (errorFlag) {
      this.setState({
        generalError: '' // reset general error
      })
      return false
    }

    fetch('/api/users/delete',{ method: 'GET',
      mode: 'cors',
      headers: {
        token: this.props.token,
        user: this.state.username
      }
    })
      .then((res) => { // deconstruct response from server
        return res.text().then((text) => {
          return {
            status: res.status,
            message: text
          }
        })
      })
      .then(({status, message}) => { // applying body based on status code
        if (status === 200) {
          this.setState({
            username: '',
            generalError: '',
            generalInfo: 'Deleted User!'
          })
        } else if (status === 400) {
          this.setState({
            generalError: message
          })
        }
      })
      .catch((reason) => {
        console.log('error')
        console.log(reason)
      })
  }

  render() {
    return (
      <Paper style={{
        margin: '15px 5%',
        padding: '5px',
        backgroundColor: '#d9d9d9',
      }} children={
        <div>
          <h4>Delete User</h4>
          {this.state.generalError ?
            <div style={{
              margin: '5px 10px',
              backgroundColor: '#E57373',
              border: '1px solid #F44336',
              padding: '5px',
              borderRadius: '5px'
            }}>
              {this.state.generalError}
            </div>
            : null}
          {this.state.generalInfo ?
            <div style={{
              margin: '5px 10px',
              backgroundColor: '#64B5F6',
              border: '1px solid #2196F3',
              padding: '5px',
              borderRadius: '5px'
            }}>
              {this.state.generalInfo}
            </div>
            : null}
          <TextField
            hintText="JohnDoe"
            floatingLabelText="Username"
            type="text"
            value={this.state.username}
            onChange={(e, nv) => this.setState({username: nv})}
            errorText={this.state.usernameError ? this.state.usernameError : ''}
            style={this.textFieldStyle}
          />
          <RaisedButton
            label="Delete User"
            onClick={this.attemptDeleteUser}
            style={{
              display: 'block'
            }}
          />
        </div>
      }/>
    )
  }
}

export default DeleteUserPanel;
