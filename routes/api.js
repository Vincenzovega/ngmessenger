/**
 * Created by vincentleyne on 05/10/2014.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function (req, res) {
    var creds = req.body;

    if (creds.userName === "vincent" & creds.password === "patchol") {
        res.status(200).jsonp({ userName: 'vincent', access_token: 'connard' });
    } else {
        res.status(403).end();
    }

});

module.exports = router;
