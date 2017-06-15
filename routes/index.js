const express = require('express');
const passport = require('passport');
const {Account} = require('../models/user');
// const Entry = require('../models/entry');

const router = express.Router();
const app = express();

//GET /
// router.get('/', (req, res) => {
//     res.render('index', {user: req.user});
// });

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/secret', isLoggedIn, function(req, res) {
	res.render('secret');
});

// Auth Routes
//show sign up form
router.get("/register", function(req, res){
	console.log('Register')
   res.render("register"); 
});

//handling user sign up
router.post("/register", function(req, res){
	var newUser = new Account({username: req.body.username});
	Account.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});

// LOGIN ROUTES
//render login form
router.get("/login", function(req, res){
   res.render("login"); 
});
//login logic middleware
router.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// prevents access to /secret
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

///module.exports = router;
var routes = router;
module.exports = {routes, app};