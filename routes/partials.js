/**
 * Created by vincentleyne on 06/10/2014.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:page', function (req, res) {
    console.dir(req.headers);
    res.sendFile(req.param('page'),
        {root: __dirname + '/../partials/'});
});

module.exports = router;
