import { Component, Children } from 'react'
import PropTypes from 'prop-types'

class SocketProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: false,
      socketReady: false,
      socketAuth: false
    }
  }

  static propTypes = {
    children: PropTypes.node
  }

  static childContextTypes = {
    socket: PropTypes.object.isRequired,
  }

  types = {}

  componentWillMount() {
    const socket = new WebSocket('ws://localhost:3001')
    socket.ready = false
    socket.authWS = this.authWS
    socket.registerType = this.registerType
    this.setState({
      socket: socket,
      socketReady: false
    })

    socket.onopen = () => {
      socket.ready = true
      this.setState({
        socket: socket,
        socketReady: true
      })
      console.log('connection established')
    }

    socket.onmessage = (event) => {
      let data = JSON.parse(event.data)
      this.types[data.type](data)
    }

    socket.onclose = () => {
      console.log('connection lost')
    }

    this.setState({
      socket: socket
    })
  }

  authWS = (token) => {
    if (this.state.socketReady) {
      this.state.socket.send(JSON.stringify({
        type: 'auth',
        token: token
      }))
    } else {
      console.log('socket not ready trying again in 200ms')
      setTimeout(() => this.authWS(token), 200)
    }
  }

  registerType = (type, f) => {
    this.types[type] = f
  }

  getChildContext() {
    return {
      socket: this.state.socket
    }
  }

  render() {
    return (
      Children.only(this.props.children)
    )
  }
}

export default SocketProvider;
