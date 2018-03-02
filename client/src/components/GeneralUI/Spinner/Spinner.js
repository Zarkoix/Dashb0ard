import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Spinner.css'

class Spinner extends Component {

  styles = {
    backgroundColor: this.props.color
  }

  render () {
    return (
      <div className="sk-cube-grid">
        <div style={this.styles} className="sk-cube sk-cube1"></div>
        <div style={this.styles} className="sk-cube sk-cube2"></div>
        <div style={this.styles} className="sk-cube sk-cube3"></div>
        <div style={this.styles} className="sk-cube sk-cube4"></div>
        <div style={this.styles} className="sk-cube sk-cube5"></div>
        <div style={this.styles} className="sk-cube sk-cube6"></div>
        <div style={this.styles} className="sk-cube sk-cube7"></div>
        <div style={this.styles} className="sk-cube sk-cube8"></div>
        <div style={this.styles} className="sk-cube sk-cube9"></div>
      </div>
    )
  }
}

export default Spinner;

Spinner.propTypes = {
  color: PropTypes.string
}