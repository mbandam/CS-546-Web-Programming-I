const express = require('express');
const passport = require('passport');
const router = express.Router();
const ensureLogIn = require('connect-ensure-login');

// when user comes to the website send him to
router.get('/login', (req, res) => {
    // if req.user exists then user is already logged in to website
    if(req.user) {
        res.redirect('/home');
    } else {
        res.render("login", { errorMessage: req.flash('error'), pageTitle: "Login"});
    }
});

router.get('/register', (req, res) => {
    // if req.user exists then user is already logged in to website
    if(req.user) {
        res.redirect('/home');
    } else {
        res.render("register", { errorMessage: req.flash('error'), pageTitle: "Register"});
    }
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/' , successRedirect: '/home', failureFlash : true }),
    (req, res) => {
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

// protect the URL
router.get('/home', ensureLogIn.ensureLoggedIn('/'),
    (req, res) => {
        res.render('profile', { user: req.user });
});

module.exports = router;