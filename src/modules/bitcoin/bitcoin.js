const debug = require('debug')('dashb0ard:module:bitcoin')
const request = require('request')

const endpoint = 'http://blockchain.info/ticker'
//const endpoint = 'https://api.coindesk.com/v1/bpi/currentprice.json'

module.exports = {
  name: 'bitcoin',
  restManager: function (username, callback) {
    debug('bitcoin manager called')
    request(endpoint, { json: true }, (err, res, body) => {
      if (err) {
        debug(err)
        callback(err)
      }
      debug('price is: ' + body.USD)
      callback(body.USD)
    })
  }
}