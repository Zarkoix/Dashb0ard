import React from 'react'
import { errorColor } from '../../../theme/theme'

const ErrorNotif = props => {
  return (
    <div
      style={{
        margin: '5px 10px',
        border: '1px solid #F44336',
        padding: '5px',
        borderRadius: '5px',
        borderColor: errorColor,
        color: errorColor
      }}
    >
      {props.message}
    </div>
  )
}

export default ErrorNotif
