import React, { Component } from 'react'
import PropTypes from 'prop-types'

const socket = (ComponentToWrap) => {
  return class SocketComponent extends Component {
    static contextTypes = {
      socket: PropTypes.object.isRequired,
    }

    render() {
      const { socket } = this.context
      // what we do is basically rendering `ComponentToWrap`
      // with an added `socket` prop, like a hook
      return (
        <ComponentToWrap { ...this.props } socket={socket} />
      )
    }
  }
}

export default socket