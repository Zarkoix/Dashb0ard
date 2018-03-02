let jwt = require("./database/jwt");
let debug = require("debug")("dashb0ard:authMiddleware");
let secret = "16";

module.exports = {
  isAuthenticated: function(req, res, next) {
    if (req.get("token")) {
      jwt
        .verifyToken(req.get("token"), secret)
        .then(user => {
          req.user = user;
          req.user.authenticated = true;
          return next();
        })
        .catch(reason => {
          req.user = {
            authenticated: false
          };
          res.status(403);
          res.send(reason);
        });
    } else {
      debug("cannot authenticate: no token provided");
      req.user = {
        authenticated: false
      };
      res.status(403);
      res.send();
    }
  },
  isAdmin: function(req, res, next) {
    if (req.user && req.user.admin) {
      next();
    } else {
      res.status(403);
      res.send("is not admin");
    }
  },
  secret: secret
};
