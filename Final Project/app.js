const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userData = require('./data').users;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const exphbs = require("express-handlebars");
const handlebarsInstance = exphbs.create({defaultLayout: "login-register"});

const app = express();

// Configure local strategy for passport use
passport.use(new LocalStrategy(
    {usernameField: 'email',passwordField: 'password'},
    async (username, password, callback) => {

        await userData.findByUsername(username, async (err, user) => {

            if (err) { return callback(err); }

            if (!user) { return callback(null, false, { message: 'Incorrect username or password.' }); }

            let isValidPassword = await userData.verifyPassword(user, password);

            if (isValidPassword === false) { return callback(null, false, { message: 'Incorrect username or password.' }); }

            return callback(null, user);
        });
    }
));

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, callback) {
    callback(null, user._id);
});

passport.deserializeUser(function(id, callback) {
    userData.findById(id, function (err, user) {
        if (err) { return callback(err); }
        callback(null, user);
    });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// set views engine for handlebar templates
app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

// Define routes
app.use("/public", express.static('public'));
let configRoutes = require('./routes');
configRoutes(app);

app.listen(3000, function () {
    console.log("We've now got a server for CS 546 Project");
    console.log('Express Server listening on http://localhost:3000')
});