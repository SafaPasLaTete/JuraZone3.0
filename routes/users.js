var express = require('express');
var router = express.Router();
const User = require('../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().sort('id').exec(function(err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});
module.exports = router;