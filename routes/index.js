var express = require('express');
var router = express.Router();

const conn = require('../connection');
const save_file_on_server = require('../uploadFile');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
