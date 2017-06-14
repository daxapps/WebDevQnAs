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
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "asdgasgsafhsdhh",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//============
// ROUTES
//============

app.get('/', function(req, res) {
	res.render("home");
});

app.get('/secret', function(req, res) {
	res.render('secret');
})

// Auth Routes

//show sign up form
app.get("/register", function(req, res){
   res.render("register"); 
});

//handling user sign up
app.post("/register", function(req, res){
	req.body.username
	req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/secret");
    });
  });
});



app.listen(process.env.PORT || 8080, function() {
	console.log('server started.......');
});








