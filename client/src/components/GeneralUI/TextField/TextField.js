import PropTypes from 'prop-types'
import React from 'react'
import { errorColor } from '../../../theme/theme'

import './TextField.css'

const TextField = ({onChange, type, placeholder, color, errorText}) =>
  (<div className="TextField">
    {errorText !== '' && (
      <div
        className="errorText"
        style={{ color: errorColor }}
      >{errorText}</div>
    )}
    <input
      style={{
        borderColor: color ? color : 'white'
      }}
      type={type}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value)
      }}
    />
  </div>)

export default TextField

TextField.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.string,
  errorText: PropTypes.string
}