var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var account = require('../models/account');
var auth = require('../middlewares/auth');


router.post('/signup', function(req, res) {
    var account = new account();
    account.name = req.body.name;
    account.surname = req.body.surname;
    account.email = req.body.email;
    account.password = bcrypt.hashSync(req.body.password, 10);
    account.iban = req.body.iban;
    account.bill = req.body.bill;
    account.save(function(err, accountCreated) {
        if (err) return res.status(400).json(err);
        res.status(201).json(accountCreated);
    })
})

router.post('/login', function(req, res) {
    account.findOne({email: req.body.email}, function(err, user){
        if (user === null) {
            return res.status(404).json({message: 'User not found'})
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
            var token = jwt.encode(user._id, auth.secret);
            return res.json({token: token});
        } else {
            return res.status(401).json({message: 'password not valid'});
        }

    })

})

module.exports = router;
