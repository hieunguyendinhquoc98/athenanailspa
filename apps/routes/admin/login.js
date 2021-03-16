var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var user = require('../../model/admin');

passport.use(new Strategy((username, password, cb) => {
    user.findOne(username).then(user => {
        if (!user) return cb(null, false);
        if (user.password != password) {
            return cb(null, false)
        };
        return cb(null, user);
    })
        .catch(err => {
            return cb(err);
        })
}));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    user.findById(id).then(user => {
        cb(null, user);
    })
        .catch(err => {
            if (err) {
                return cb(err);
            }
        });
});

router.get("/", function (req, res) {
    res.render("login", { layout: false });
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);

        if (!user) {
            return res.render('login', {
                layout: false
            })
        }

        req.logIn(user, err => {
            if (err)
                return next(err);

            return res.redirect('/admin');
        });
    })(req, res, next);
});

module.exports = router;