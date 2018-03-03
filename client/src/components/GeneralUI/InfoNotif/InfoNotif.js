import React from 'react'
import { infoColor } from '../../../theme/theme'

const InfoNotif = props => {
  return (
    <div
      style={{
        margin: '5px 10px',
        border: '1px solid #F44336',
        padding: '5px',
        borderRadius: '5px',
        borderColor: infoColor,
        color: infoColor
      }}
    >
      {props.message}
    </div>
  )
}

export default InfoNotif
