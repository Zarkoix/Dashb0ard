import React, { Component } from 'react'
import './theme/App.css'
import Dashboard from './components/dashboard/dashboard'
import LoginDialog from './components/LoginDialog/loginDialog'
import { getToken, setToken } from './utility/tokenWrapper'
import socket from './components/Websockets/Socket'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: getToken(),
      wsAuth: false
    }
  }

  componentDidMount() {
    if (this.state.token) this.authWS(this.state.token)
  }

  authWS = (token) => this.props.socket.authWS(token)

  login = (token) => {
    setToken(token)
    this.setState({
      token: token
    })
    if (token) this.authWS(token)
  }

  render() {
    return (
        this.state.token
          ? <Dashboard token={this.state.token} />
          : <LoginDialog login={this.login}/>
    )
  }
}

export default socket(App);
