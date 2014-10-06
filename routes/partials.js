/**
 * Created by vincentleyne on 06/10/2014.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');

/* GET home page. */
router.get('/:page', function (req, res) {
    console.dir(req.headers);
    console.log('authorization' in req.headers);
    if ('authorization' in req.headers) {
        var token = req.header('authorization').split(' ')[1];
        if (!token === null) {
            var decoded = jwt.decode(token, req.app.get('jwtTokenSecret'));
        }
    }

    console.dir(decoded);
    res.sendFile(req.param('page'),
        {root: __dirname + '/../partials/'});
});

module.exports = router;
