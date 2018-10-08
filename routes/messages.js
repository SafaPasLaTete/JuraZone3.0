var express = require('express');
var router = express.Router();
const Message = require('../models/messages');
/* GET messages listing. */
router.get('/', function(req, res, next) {
  Message.find().sort('id').exec(function(err, messages) {
    if (err) {
      return next(err);
    }
    res.send("lol");
  });
});
module.exports = router;