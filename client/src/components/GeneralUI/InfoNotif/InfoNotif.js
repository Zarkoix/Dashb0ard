import React from 'react'
import { infoNotif } from '../../../theme/theme'

const InfoNotif = props => {
  return (
    <div
      style={{
        margin: '5px 10px',
        border: '1px solid #F44336',
        padding: '5px',
        borderRadius: '5px',
        borderColor: infoNotif,
        color: infoNotif
      }}
    >
      {props.message}
    </div>
  )
}

export default InfoNotif
