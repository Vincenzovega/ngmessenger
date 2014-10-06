/**
 * Created by vincentleyne on 05/10/2014.
 */
var express = require('express');
var moment = require('moment');
var router = express.Router();
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name: String,
    password: String,
    role: String
});

mongoose.model('users', usersSchema);

/* GET users listing. */
router.post('/login', function (req, res) {
    var creds = req.body;

    var user = mongoose.model('users').findOne({name: creds.userName}, function (err, user) {
        if (err) console.log('login Error ' + err.stack);
        if (!user) {
            console.log('user ' + creds.userName + ' introuvable');
            res.status(401).end('Unknown user');

        } else {
            console.log('Attempt to login as : ' + user.name);
            if (user.password === creds.password) {
                console.log('Authentication reussie');

                var expires = moment().add(7, 'days').valueOf();
                var token = jwt.encode({
                        iss: user._id,
                        name: user.name,
                        exp: expires
                    },
                    req.app.get('jwtTokenSecret'));

                res.json({
                    token: token,
                    expires: expires,
                    user: user
                });
            } else {

                console.log("wrong password");
                res.status('401').end("wrong password");
            }
        }
    })
})


router.get('/userlist', function (req, res) {
    var users = mongoose.model('users').find(function (err, users) {
        if (err) {
            res.status(500).end('OOUPS');
        } else {
            res.json(users);
        }

    })
})

module.exports = router;
