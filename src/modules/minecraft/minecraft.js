const debug = require('debug')('dashb0ard:module:minecraft')
const request = require('request')
const db = require('../../database/db')

const defaultIP = '18.144.10.174'

module.exports = {
  name: 'minecraft',
  restManager: function (username, callback, data) {
    debug('minecraft rest manager called' + (data.data) ? 'with params ' + data.data : '')
    let ip
    if (data.data) {
      ip = data.data
      db.setDataSlice(username, 'minecraft', {ip: ip})
    } else {
      let userdata = db.getDataSlice(username, 'minecraft')
      ip = userdata.ip ? userdata.ip : defaultIP
    }
    debug('querying ' + JSON.stringify(ip))
    request(
      'https://api.mcsrvstat.us/1/' + ip,
      {json: true},
      (err, res, body) => {
        if (err) {
          debug(err)
          callback(err)
        }
        callback(body)
      }
    )
  }
};
