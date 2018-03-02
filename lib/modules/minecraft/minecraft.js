const debug = require('debug')('dashb0ard:module:minecraft');
const request = require('request');

const serverIP = '18.144.10.174';

module.exports = {
  name: 'minecraft',
  restManager: function (username, callback) {
    debug('minecraft rest manager called');
    request('https://api.mcsrvstat.us/1/' + serverIP, { json: true }, (err, res, body) => {
      if (err) {
        debug(err);
        callback(err);
      }
      callback(body);
    });
  }
};