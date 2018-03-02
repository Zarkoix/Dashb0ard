const debug = require('debug')('dashb0ard:jwt');
let jwt = require('jsonwebtoken');

module.exports = {
  createToken: function (user, secret) {
    return jwt.sign({
      usr: user.username,
      adm: user.admin
    }, secret);
  },
  verifyToken: function (token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, user) => {
        if (!err) {
          debug('valid token for: ' + user.usr);
          resolve({
            username: user.usr,
            admin: user.adm
          });
        } else {
          debug('jwt token error: ' + err);
          reject(err);
        }
      });
    });
  }
};