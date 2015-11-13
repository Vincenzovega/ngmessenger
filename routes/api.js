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

var callsSchema = new Schema({
    caller: String,
    date: String,
    time: String,
    case: String,
    complete: Boolean
});

mongoose.model('users', usersSchema);
var call = mongoose.model('calls', callsSchema);

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
});


router.get('/userlist', function (req, res) {
    var users = mongoose.model('users').find(function (err, users) {
        if (err) {
            res.status(500).end('OOUPS');
        } else {
            res.json(users);
        }

    })
});

router.get('/callList', function (req, res) {
    var calls = call.find(function (err, calls) {
        if (err) {
            res.status(500).end('OOUPS');
        } else {
            res.json(calls);
        }

    })
});


router.post('/addItem', function (req, res) {
    var item = new call(req.body);
    item.save(function (err, savedItem) {
        if (err) console.log("error !!!");
        console.log("created new id: " + savedItem._id);
        res.json(savedItem);
    })
});

router.post('/updateItem', function(req,res){
    console.log('updateItem called');
    call.findOne({'_id':req.body._id},function(err,doc){
        if (err) console.log('err.err');
        Object.keys(req.body).forEach(function(key){
            console.log(key + " in request equals " + req.body[key]);
            doc[key] = req.body[key];
            doc.save();
            res.status(200).end('success');
        });
    });
});

router.post('/delItem', function (req, res) {
    var item = new call(req.body);
    console.log("request to delete record with _id:  " + item._id);
    call.remove({_id: item._id}, function (err) {
            if (err) {
                console.log("couldn't delete, reason: " + err);
                res.status(500).end('OOUPS');
            }
            res.status(200).end('success');
        }
    )
});





module.exports = router;
