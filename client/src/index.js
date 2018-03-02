import React from 'react'
import ReactDOM from 'react-dom'
import './theme/index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SocketProvider from './components/Websockets/SocketProvider'
import { muiTheme } from './theme/theme.js'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <SocketProvider>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </SocketProvider>
  , document.getElementById('root'))
registerServiceWorker()
