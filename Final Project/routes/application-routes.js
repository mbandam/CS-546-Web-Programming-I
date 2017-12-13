const express = require('express');
const passport = require('passport');
const router = express.Router();
const ensureLogIn = require('connect-ensure-login');
const data = require("../data");
const usersData = data.users;
const ordersData = data.orders;
const usersContact = data.contact;
var fs = require('fs');
var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

/* GET home page. */
router.get('/', (req, res) => {
    res.render("home", { errorMessage: req.flash('error'), title: "Home", user: req.user });
});

// Contact Us Page
router.get('/contact', (req, res) => {
    res.render("contact", { errorMessage: req.flash('error'), title: "Contact Us", user: req.user });
});

//Menu Page
// router.get('/menu', (req, res) => {
//     res.render("menu", { errorMessage: req.flash('error'), title: "Menu" });
// });
router.get('/menu', function (req, res, next) {
    res.render('menu', { title: 'Atilla\'s Menu', products: products, user: req.user } );
});

// LOGIN ROUTES
// when user comes to the website send him to
router.get('/login', (req, res) => {
    // if req.user exists then user is already logged in to website
    if (req.user) {
        res.redirect('/home');
    } else {
        res.render("login", { errorMessage: req.flash('error'), title: "Login", user: req.user });
    }
});


//When user accesses the cart
// router.get('/cart', (req, res) => {
//     // if(req.user) {
//     //     res.redirect('/');
//     // } else {
//     //     res.render("main", { errorMessage: req.flash('error'), title: "Login"});
//     //  }
//     res.render("cart", { errorMessage: req.flash('error'), title: "Cart" });
// });

router.get('/add/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var product = products.filter(function(item) {
      return item.id == productId;
    });
    cart.add(product[0], productId);
    req.session.cart = cart;
    res.redirect('/menu');
  });
  
  router.get('/cart', function(req, res, next) {
    if (!req.session.cart) {
      return res.render('cart', {
        products: null, user: req.user
      });
    }
    var cart = new Cart(req.session.cart);
    res.render('cart', {
        title: 'Your Cart',
        products: cart.getItems(),
        totalPrice: cart.totalPrice,
        user: req.user
    });
  });
  
  router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
  });

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/home', failureFlash: true }),
    (req, res) => { }
);

// REGISTER ROUTES
router.get('/register', (req, res) => {
    // if req.user exists then user is already logged in to website
    if (req.user) {
        res.redirect('/home');
    } else {
        res.render("register", { errorMessage: req.flash('error'), title: "Register" });
    }
});

router.post("/register", (req, res) => {
    usersData.registerUser(req.body).then((addedUser) => {
        if (addedUser)
            res.render("register", { isSuccess: true, userName: addedUser.name, title: "Register" });
        else
            res.render("register", { errorMessage: "Error occurred registering user. Please try again later", title: "Register" });
    }, (error) => {
        res.render("register", { errorMessage: error, title: "Register" });
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

// protect the URL
router.get('/home', ensureLogIn.ensureLoggedIn('/'),
    (req, res) => {
        res.render('home', { user: req.user });
    });

//NEED TO TEST THIS - NESAR
router.get('/submission', ensureLogIn.ensureLoggedIn('/'),
    (req, res) => {
        res.render('submission', { user: req.user });
    });

router.get('/orders', ensureLogIn.ensureLoggedIn('/'), (req, res) => {
    ordersData.getOrdersByUserId(req.user).then((usersOrders) => {
        res.render('orders', { usersOrders: usersOrders, user: req.user });
    }, (error) => {
        res.render('orders', { hasError: true, user: req.user });
    });
});

router.post("/contact", (req, res) => {
    usersContact.userContacting(req.body).then((addedMessage) => {
        if (addedMessage)
            res.render("contact", { isSuccess: true, userName: addedMessage.name, title: "contact", user: req.user });
        else
            res.render("contact", { errorMessage: "Error occurred submitting message. Please try again later", title: "contact", user: req.user });
    }, (error) => {
        res.status(500).json({ message: `Operation failed, Error : ${error}` });
    });
});

module.exports = router;

