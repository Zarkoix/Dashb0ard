import PropTypes from 'prop-types'
import React from 'react'
import './FlatButton.css'

const defaultOnClick = (e) => e.preventDefault()

const FlatButton = ({onClick=defaultOnClick, text, type, color, style={}}) =>
  (<button
    style={{ borderColor: color ? color : 'white', ...style }}
    onClick={onClick}
    type={type}
  > {text} </button>)


export default FlatButton

FlatButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object
}