var express = require('express');
var router = express.Router();
const Theme = require('../models/themes');
/* GET messages listing. */
router.get('/', function(req, res, next) {
    Theme.find().sort('id').exec(function(err, themes) {
        if (err) {
            return next(err);
        }
        res.send(themes);
    });
});
module.exports = router;