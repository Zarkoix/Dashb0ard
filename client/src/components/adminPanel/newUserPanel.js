import React, { Component } from 'react'
import TextField from '../GeneralUI/TextField'
import FlatButton from '../GeneralUI/FlatButton'
import ErrorNotif from '../GeneralUI/ErrorNotif'
import InfoNotif from '../GeneralUI/InfoNotif'
import Checkbox from '../GeneralUI/Checkbox'

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
    };
  }

  componentDidMount () {}

  textFieldStyle = {
    padding: '0 2px'
  };

  attemptCreateNewUser = () => {
    console.log('attempting to create new user')
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

    if (this.state.firstName.length === 0) {
      this.setState({
        firstNameError: 'Provide a First Name'
      });
      errorFlag = true
    } else {
      this.setState({
        firstNameError: ''
      });
    }

    if (this.state.lastName.length === 0) {
      this.setState({
        lastNameError: 'Provide a Last Name'
      });
      errorFlag = true
    } else {
      this.setState({
        lastNameError: ''
      });
    }

    if (this.state.password.length === 0) {
      this.setState({
        passwordError: 'Provide a Password'
      });
      errorFlag = true
    } else {
      this.setState({
        passwordError: ''
      });
    }

    if (errorFlag) {
      this.setState({
        generalError: '' // reset general error
      });
      return false
    }

    fetch('/api/users/create', {
      method: 'GET',
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
            firstName: '',
            lastName: '',
            password: '',
            balance: 500,
            admin: false,
            generalError: '',
            generalInfo: 'Created New User!'
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

  render () {
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
        <h3>Create New User!</h3>
        {this.state.generalError ? (
          <ErrorNotif message={this.state.generalError}/>
        ) : null}
        {this.state.generalInfo ? (
          <InfoNotif message={this.state.generalInfo}/>
        ) : null}
        <TextField
          placeholder="Username"
          type="text"
          onChange={nv => this.setState({username: nv})}
          errorText={this.state.usernameError ? this.state.usernameError : ''}
          style={this.textFieldStyle}
        />
        <TextField
          placeholder="First Name"
          type="text"
          onChange={nv => this.setState({firstName: nv})}
          errorText={this.state.firstNameError ? this.state.firstNameError : ''}
          style={this.textFieldStyle}
        />
        <TextField
          placeholder="Last Name"
          type="text"
          onChange={nv => this.setState({lastName: nv})}
          errorText={this.state.lastNameError ? this.state.lastNameError : ''}
          style={this.textFieldStyle}
        />
        <TextField
          placeholder="Password"
          type="password"
          onChange={nv => this.setState({password: nv})}
          errorText={this.state.passwordError ? this.state.passwordError : ''}
          style={this.textFieldStyle}
        />
        <Checkbox
          style={{
            margin: '5px 0'
          }}
          name="Admin"
          label="Admin: "
          onChange={() => this.setState({admin: !this.state.admin})}
        />
        <FlatButton
          text="Create User"
          onClick={this.attemptCreateNewUser}
          style={{
            display: 'block'
          }}
        />
      </div>
    );
  }
}

export default NewUserPanel;
