let express = require('express');
let router = express.Router();
let db = require('../database/db');
let secret = require('../authenticationMiddleware').secret;
let jwt = require('../database/jwt');

/* GET home page. */
router.get('/login', function (req, res, next) {
  let username = req.get('user');
  let password = req.get('pass');
  if (username && password) {
    db.loginUser(username, password).then(user => {
      if (user) {
        console.log('sending token');
        res.send(jwt.createToken(user, secret));
      } else {
        res.status(403);
        res.send('Bad Credentials');
      }
    }).catch(() => {
      res.status(403);
      res.send('Bad Credentials');
    });
  } else {
    res.status(403);
    res.send('Missing Field');
  }
});

module.exports = router;