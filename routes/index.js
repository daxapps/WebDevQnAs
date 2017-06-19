const express = require('express');
const passport = require('passport');
const {User, Qna} = require('../models/user');

// const Entry = require('../models/entry');

const router = express.Router();
const app = express();

router.get('/', (req, res) => {
  Qna.find({}, function(err, allQnas){
    console.log(Qna)
    if(err){
      console.log(err);
    } else {
      res.render("home",{qnas:allQnas, page: 'home'});
    }
  });
});



// Auth Routes
//show sign up form
router.get("/register", function(req, res){
	console.log('Register')
   res.render("register"); 
});

//handling user sign up
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
      // req.flash("success", "Welcome to Web Dev Interview Q&A's " + user.username);
			res.redirect("/home");
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
	successRedirect: "/",
	failureRedirect: "/login"
}) ,function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
   	req.flash("success", "Logged you out!");
    res.redirect("/");
});

// prevents access to /qnas
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//ADD QnA ROUTES
router.get('/new', (req, res) => {
	Qna.find({}, function(err, allQnas){
    console.log(Qna)
		if(err){
      console.log(err);
    } else {
      res.render("new",{qnas:allQnas, page: 'new'});
    }
	});
});

router.post('/new', isLoggedIn, (req, res) => {
	var question = req.body.question;
	var answer = req.body.answer;
	var author = {
        id: req.user._id,
        username: req.user.username
    };
   var newQna = {question: question, answer: answer, author: author};
   Qna.create(newQna, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to home page
            console.log(newlyCreated);
            res.redirect("/");
        }
    });
});



// // catch-all endpoint if client makes request to non-existent endpoint
// app.use('*', function(req, res) {
//   res.status(404).json({message: 'Not Found'});
// });

///module.exports = router;
var routes = router;
module.exports = {routes, app};



