var debug = require('debug')('dashb0ard:database');
let Loki = require('lokijs');
let db = new Loki('database/data.json', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});
let users;
let password = require('password-hash-and-salt');

function databaseInitialize() {
  users = db.getCollection('users');
  if (users === null) {
    debug('Warning: No existing users, creating default admin!');
    users = db.addCollection('users');
    password('root').hash(function (error, hash) {
      if (error) {
        process.exit(1);
      }
      users.insert({
        username: 'root',
        firstName: 'root',
        lastName: 'root',
        hash: hash,
        data: {},
        admin: true
      });
    });
  } else {
    debug('Database populated');
    debug(users.count() + ' Users Loaded');
  }
  debug('DB ready to go');
  db.save();
}

module.exports = {
  init: function () {},

  addUser: function (username, firstName, lastName, pass, admin = false) {
    if (!(username && firstName && lastName && pass)) throw Error('Missing Information');
    if (users.findOne({ username: username })) throw Error('Username Taken!');

    password(pass).hash(function (error, hash) {
      users.insert({
        username: username,
        firstName: firstName,
        lastName: lastName,
        hash: hash,
        data: {},
        admin: admin
      });
    });
  },

  deleteUser: function (username) {
    if (!username) throw Error('Missing Information');
    let user = users.findOne({ username: username });
    if (!user) throw Error('User does not exist!');
    users.remove(user);
  },

  getDataSlice: function (username, l) {
    const data = this.findUserByUsername(username).data[l];
    if (data) {
      return data;
    } else {
      return {};
    }
  },

  setDataSlice: function (username, l, slice) {
    let user = users.findOne({ username: username });
    user.data[l] = slice;
    users.update(user);
  },

  findUserByUsername: function (username) {
    let user = users.findOne({ username: username });
    return user ? {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      hash: user.hash,
      data: user.data,
      admin: user.admin
    } : false;
  },

  loginUser: function (username, pass) {
    return new Promise((resolve, reject) => {
      debug('Attempting to login user with username: ' + username);
      let user = this.findUserByUsername(username);
      if (user) {
        password(pass).verifyAgainst(user.hash, function (error, verified) {
          debug(user.username + ' is verified: ' + verified);
          if (error) {
            throw new Error('Something went wrong!');
          }
          if (!verified) {
            // incorrect password
            reject(new Error('Incorrect Password'));
          } else {
            resolve(user);
          }
        });
      } else {
        // user name does not exist
        reject(new Error('Username does not exist'));
      }
    });
  }
};