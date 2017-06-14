const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('./models/user');
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");



mongoose.connect('mongodb://dax:password@ds123722.mlab.com:23722/webdevqna');
const app = express();
app.set('view engine', 'ejs');

app.use(require("express-session")({
    secret: "asdgasgsafhsdhh",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
	res.render("home");
});

app.get('/secret', function(req, res) {
	res.render('secret');
})



app.listen(process.env.PORT || 8080, function() {
	console.log('server started.......');
});