/**
 * Created by vincentleyne on 05/10/2014.
 */
var express = require('express');
var moment = require('moment');
var router = express.Router();
var jwt = require('jwt-simple');


/* GET users listing. */
router.post('/login', function (req, res) {
    var creds = req.body;

    if (creds.userName === "vincent" && creds.password === "patchol") {


        var user = {
            id: 500,
            name: 'vincent',
            role: 'admin'
        };

        var expires = moment().add(7, 'days').valueOf();
        var token = jwt.encode({
            iss: user.id,
            name: 'vincent',
            exp: expires
        }, req.app.get('jwtTokenSecret'));

        res.json({
            token: token,
            expires: expires,
            user: user
        });





    } else {
        res.status(403).end();
    }

});

module.exports = router;
