const express = require('express');
const passport = require('passport');
const router = express.Router();
const ensureLogIn = require('connect-ensure-login');
const data = require("../data");
const usersData = data.users;


/* GET home page. */

// LOGIN ROUTES
// when user comes to the website send him to
router.get('/login', (req, res) => {
    // if req.user exists then user is already logged in to website
    if(req.user) {
        res.redirect('/home');
    } else {
        res.render("login", { errorMessage: req.flash('error'), pageTitle: "Login"});
    }
});


//When user accesses the cart
router.get('/cart', (req, res) => {
    // if(req.user) {
    //     res.redirect('/');
    // } else {
    //     res.render("main", { errorMessage: req.flash('error'), pageTitle: "Login"});
    //  }
    res.render("cart", { errorMessage: req.flash('error'), pageTitle: "Cart"});
  }); 

router.post('/login', passport.authenticate('local', { failureRedirect: '/' , successRedirect: '/home', failureFlash : true }),
    (req, res) => {}
);

// REGISTER ROUTES
router.get('/register', (req, res) => {
    // if req.user exists then user is already logged in to website
    if(req.user) {
        res.redirect('/home');
    } else {
        res.render("register", { errorMessage: req.flash('error'), pageTitle: "Register"});
    }
});

router.post("/register", (req, res) => {
    usersData.registerUser(req.body).then((addedUser) => {
        if(addedUser)
            res.render("register", { isSuccess: true, userName: addedUser.name, pageTitle: "Register"});
        else
            res.render("register", { errorMessage: "Error occurred registering user. Please try again later", pageTitle: "Register"});
    }, (error) => {
        res.status(500).json({message: `Operation failed, Error : ${error}`});
    });
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