let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // if (req.get('token'))
  res.render('index');
});

module.exports = router;