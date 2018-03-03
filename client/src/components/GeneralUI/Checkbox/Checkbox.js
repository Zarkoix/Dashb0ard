import React from 'react'
import PropTypes from 'prop-types'

import './Checkbox.css'

const Checkbox = props => {
  return (
    <div style={props.style}>
      {props.label ? (
        <span
          style={{
            color: props.color ? props.color : 'white',
            margin: '0 5px'
          }}
        >
          {props.label}
        </span>
      ) : null}
      <div className="checkbox__wrapper">
        <input
          type="checkbox"
          id={props.name}
          onChange={() => {
            props.onChange()
          }}
        />
        <label htmlFor={props.name}/>
      </div>
    </div>
  )
}

export default Checkbox

Checkbox.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
}
