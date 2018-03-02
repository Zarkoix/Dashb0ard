import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'

class NewUserPanel extends Component {
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

  attemptCreateNewUser = () => {
    console.log('attempting to create new user')
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

    if(this.state.firstName.length === 0) {
      this.setState({
        firstNameError: 'Provide a First Name'
      })
      errorFlag = true
    } else {
      this.setState({
        firstNameError: ''
      })
    }

    if(this.state.lastName.length === 0) {
      this.setState({
        lastNameError: 'Provide a Last Name'
      })
      errorFlag = true
    } else {
      this.setState({
        lastNameError: ''
      })
    }

    if(this.state.password.length === 0) {
      this.setState({
        passwordError: 'Provide a Password'
      })
      errorFlag = true
    } else {
      this.setState({
        passwordError: ''
      })
    }

    if (errorFlag) {
      this.setState({
        generalError: '' // reset general error
      })
      return false
    }

    fetch('/api/users/create',{ method: 'GET',
      mode: 'cors',
      headers: {
        token: this.props.token,
        user: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        pass: this.state.password,
        admin: this.state.admin
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
            firstName: '',
            lastName: '',
            password: '',
            balance: 500,
            admin: false,
            generalError: '',
            generalInfo: 'Created New User!'
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

  render () {
    return (
          <Paper style={{
            margin: '15px 5%',
            padding: '5px',
            backgroundColor: '#d9d9d9',
          }} children={
            <div>
              <h4>Create New User!</h4>
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
              <TextField
                hintText="John"
                floatingLabelText="First Name"
                type="text"
                value={this.state.firstName}
                onChange={(e, nv) => this.setState({firstName: nv})}
                errorText={this.state.firstNameError ? this.state.firstNameError : ''}
                style={this.textFieldStyle}
              />
              <TextField
                hintText="Doe"
                floatingLabelText="Last Name"
                type="text"
                value={this.state.lastName}
                onChange={(e, nv) => this.setState({lastName: nv})}
                errorText={this.state.lastNameError ? this.state.lastNameError : ''}
                style={this.textFieldStyle}
              />
              <TextField
                hintText="Hunter2"
                floatingLabelText="Password"
                type="text"
                value={this.state.password}
                onChange={(e, nv) => this.setState({password: nv})}
                errorText={this.state.passwordError ? this.state.passwordError : ''}
                style={this.textFieldStyle}
              />
              <Toggle
                label="Admin"
                value={this.state.admin}
                onToggle={(e, nv) => this.setState({admin: nv})}
                style={{
                  maxWidth: '100px',
                  display: 'inline-block'
                }}
              />
              <RaisedButton
                label="Create User"
                onClick={this.attemptCreateNewUser}
                style={{
                  display: 'block'
                }}
              />
            </div>
          }/>
    )
  }
}

export default NewUserPanel;
