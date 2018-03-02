const debug = require('debug')('dashb0ard:module:todo')
const db = require('../../database/db')
const todoActions = require('../../../client/src/modules/Todo/todoActions').actions

module.exports = {
  name: 'todo',
  wsManager: function (message, ws, neighbors) {
    let username = ws.username
    let action = message.data.action

    debug(message.data.action)

    db.setDataSlice(username, 'todo', todoActions[action](db.getDataSlice(username, 'todo'), message.data.value))

    neighbors.forEach((ws) => {
      ws.send(JSON.stringify({
        type: 'todo',
        data: message.data
      }))
    })
  }
}
