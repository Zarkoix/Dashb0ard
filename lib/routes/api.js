const debug = require('debug')('dashb0ard:api');
let express = require('express');
let router = express.Router();
let auth = require('../authenticationMiddleware');
let db = require('../database/db');

/**
 * Register Rest Endpoints of Modules
 */
let restEndpoints = {};
let modules = require('../modules');

debug('modules: ' + JSON.stringify(modules));
for (let i = 0, len = modules.length; i < len; i++) {
  if (modules[i].restManager) {
    if (typeof modules[i].restManager === 'function') {
      debug('registered a REST endpoint for ' + modules[i].name);
      restEndpoints[modules[i].name] = modules[i].restManager;
    } else {
      debug('Incorrectly setup module: ' + modules[i].name);
      debug('typeof rest manager was ' + typeof modules[i].restManager);
    }
  }
}

/**
 * Register routes for /api/*
 */
router.get('/module/data', auth.isAuthenticated, function (req, res, next) {
  const module = req.get('module');
  debug('getting data slice for module ' + module);
  res.json(db.getDataSlice(req.user.username, module));
});

router.get('/module/endpoint', auth.isAuthenticated, function (req, res, next) {
  const module = req.get('module');
  if (restEndpoints[module]) {
    debug('endpoint called for ' + module);
    restEndpoints[module](req.user.username, function (value) {
      res.json(value);
    });
  } else {
    res.status(400);
    res.send('No endpoint for module');
  }
});

router.get('/user', auth.isAuthenticated, function (req, res, next) {
  debug('finding user info: ' + req.user.username);
  const user = db.findUserByUsername(req.user.username);
  res.json({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    admin: user.admin
  });
});

router.get('/users/create', auth.isAuthenticated, auth.isAdmin, function (req, res, next) {
  try {
    debug('Attempting to create new user with username: ' + req.get('user'));
    db.addUser(req.get('user'), req.get('firstName'), req.get('lastName'), req.get('pass'), req.get('balance') ? req.get('balance') : 500, req.get('admin') ? req.get('admin') : false);
    debug('Created an account for ' + req.get('firstName'));
    res.status(200);
    res.send('Created an account for ' + req.get('firstName'));
  } catch (err) {
    debug('error in /users/create: ' + err.message);
    res.status(400);
    res.send(err.message);
  }
});

router.get('/users/delete', auth.isAuthenticated, auth.isAdmin, function (req, res, next) {
  try {
    debug('Attempting to delete user with username: ' + req.get('user'));
    db.deleteUser(req.get('user'));
    res.status(200);
    res.send('Deleted user with username: ' + req.get('user'));
  } catch (err) {
    debug('error in /users/delete: ' + err.message);
    res.status(400);
    res.send(err.message);
  }
});

router.get('/transfer', auth.isAuthenticated, function (req, res, next) {
  try {
    debug('Attempting to transfer money');
    db.transferMoney(req.user.username, req.get('value'), req.get('recipient'));
    res.status(200);
    res.send('Deleted user with username: ' + req.get('user'));
  } catch (err) {
    debug('error in /users/delete: ' + err.message);
    res.status(400);
    res.send(err.message);
  }
});

module.exports = router;