import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Spinner.css'

class Spinner extends Component {

  styles = {
    wrapper: {
      margin: '41px 41px'
    },
    square: {
      backgroundColor: this.props.color
    }
  }

  render () {
    return (
      <div style={this.styles.wrapper}>
        <div className="sk-cube-grid">
          <div style={this.styles.square} className="sk-cube sk-cube1"/>
          <div style={this.styles.square} className="sk-cube sk-cube2"/>
          <div style={this.styles.square} className="sk-cube sk-cube3"/>
          <div style={this.styles.square} className="sk-cube sk-cube4"/>
          <div style={this.styles.square} className="sk-cube sk-cube5"/>
          <div style={this.styles.square} className="sk-cube sk-cube6"/>
          <div style={this.styles.square} className="sk-cube sk-cube7"/>
          <div style={this.styles.square} className="sk-cube sk-cube8"/>
          <div style={this.styles.square} className="sk-cube sk-cube9"/>
        </div>
      </div>
    )
  }
}

export default Spinner;

Spinner.propTypes = {
  color: PropTypes.string
}