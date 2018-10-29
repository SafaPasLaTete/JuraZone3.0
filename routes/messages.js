var express = require('express');
var router = express.Router();
const Message = require('../models/messages');
/* GET messages listing. */
router.get('/', function(req, res, next) {
  Message.find().populate("author").sort('id').exec(function(err, messages) {
    if (err) {
      return next(err);
    }
    res.send(messages);
  });
});
module.exports = router;