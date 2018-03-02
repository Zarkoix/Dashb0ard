const debug = require('debug')('dashb0ard:module:acctg219');
const request = require('request');
const data = require('../../../static/accountingData.json');

let date;
let dayData = {};

function initialize() {
  let d = new Date();
  let day = d.getDate();
  let month = d.getMonth();
  let monthString;
  switch (month) {
    case 0:
      monthString = 'Jan';
      break;
    case 1:
      monthString = 'Feb';
      break;
    case 2:
      monthString = 'Mar';
      break;
  }
  for (let i = 0, len = data.length; i < len; i++) {
    let dateInfo = data[i].date;
    if (dateInfo.substr(0, 3) === monthString) {
      // console.log('month matches')
      // console.log('comparing days: ' + dateInfo.split(' ')[1] + ' and ' + day)
      if (dateInfo.split(' ')[1] > day) {
        dayData = data[i];
        date = day;
        let topic = dayData.topic;
        debug('next topic is: ' + topic);
        break;
      }
    }
  }
}

module.exports = {
  name: 'acctg219',
  initialize: initialize,
  restManager: function (username, callback) {
    if (new Date().getDate() !== date) {
      debug('cache invalidated, finding next class');
      initialize();
    }
    if (dayData) {
      callback(dayData);
    } else {
      debug('No information for next class found');
      callback({ err: 'No information for next class found' });
    }
  }
};