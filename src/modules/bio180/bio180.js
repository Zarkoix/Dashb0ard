const debug = require('debug')('dashb0ard:module:bio180')
const request = require('request')
const data = require('../../../static/bioData.json')

let date
let dayData = {}

function initialize () {
  let d = new Date()
  let day = d.getDate()
  let month = d.getMonth()
  let monthString
  switch (month) {
    case 0:
      monthString = 'Jan'
      break
    case 1:
      monthString = 'Feb'
      break
    case 2:
      monthString = 'Mar'
      break
  }
  for (let i = 0, len = data.length; i < len; i++) {
    let dateInfo = data[i].date
    if (dateInfo.substr(0, 3) === monthString) {
      if (dateInfo.substr(4) > day) {
        dayData = data[i]
        date = day
        break
      }
    }
  }
  debug('next topic is: ' + dayData.lectureTopic)
}

module.exports = {
  name: 'bio180',
  initialize: initialize,
  restManager: function (username, callback) {
    debug('bio180 manager called')
    if (new Date().getDate() === date) {
      if (dayData) {
        callback(dayData)
      } else {
        callback({err: 'No information for next class found'})
      }
    } else {
      initialize()
      if (dayData) {
        callback(dayData)
      } else {
        callback({err: 'No information for next class found'})
      }
    }
  }
}