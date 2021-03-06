import React, { Component } from 'react'
import TextField from '../GeneralUI/TextField'
import FlatButton from '../GeneralUI/FlatButton/FlatButton'
import ErrorNotif from '../GeneralUI/ErrorNotif'

import Icon from '../../logo.svg'
import './LoginDialog.css'

class LoginDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      generalError: false
    };
  }

  componentDidMount () {}

  attemptLogin(username, pass) {
    let errorFlag = false

    if (username.length === 0) {
      this.setState({
        usernameError: 'Provide a Username'
      });
      errorFlag = true
    } else {
      this.setState({
        usernameError: ''
      });
    }

    if (pass.length === 0) {
      this.setState({
        passwordError: 'Provide a Password'
      });
      errorFlag = true
    } else {
      this.setState({
        passwordError: ''
      });
    }

    if (errorFlag) return false

    fetch('/auth/login', {
      method: 'GET',
      mode: 'cors',
      headers: {
        user: username,
        pass: pass
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
        console.log('status: ' + status)
        console.log('message: ' + message)
        if (status === 200) {
          this.props.login(message)
        } else if (status === 403) {
          this.setState({
            generalError: message
          });
        }
      })
      .catch(reason => {
        console.log('error')
        console.log(reason)
      });
  }

  render() {
    return (
      <div
        className="login"
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <form
          style={{
            paddingTop: '30%',
            height: 'auto'
          }}
        >
          <div
            className="header"
            style={{
              paddingLeft: '7%'
            }}
          >
            <img
              style={{
                display: 'inline',
                height: '40px',
                marginRight: '10px'
              }}
              src={Icon}
              alt="Logo"
            />
            <h4
              style={{
                display: 'inline',
                lineHeight: '40px',
                verticalAlign: 'bottom'
              }}
            >
              Dashb0ard
            </h4>
          </div>
          {this.state.generalError ? (
            <ErrorNotif message={this.state.generalError}/>
          ) : null}
          <TextField
            placeholder="JohnDoe"
            floatingLabelText="Username"
            type="text"
            onChange={nv => this.setState({username: nv})}
            errorText={this.state.usernameError ? this.state.usernameError : ''}
            style={{
              width: '100%'
            }}
          />
          <TextField
            placeholder="hunter2"
            floatingLabelText="Password"
            type="password"
            onChange={nv => this.setState({password: nv})}
            errorText={this.state.passwordError ? this.state.passwordError : ''}
            style={{
              width: '100%'
            }}
          />
          <FlatButton
            text="Login"
            onClick={e => {
              e.preventDefault()
              this.attemptLogin(this.state.username, this.state.password)
            }}
            type="submit"
            style={{
              width: '40%',
              marginLeft: '30%',
              marginTop: '15px'
            }}
          />
        </form>
      </div>
    );
  }
}

export default LoginDialog
