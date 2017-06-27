const express = require('express');
const passport = require('passport');
const {User} = require('../models/user');
const {Qna} = require('../models/qna');
const middleware = require("../middleware/index");
const router = express.Router();
const app = express();

//INDEX - show all questions
router.get('/', (req, res) => {
  // Get all questions from DB
  Qna.find({}, function(err, allQnas){
    if(err){
      console.log(err);
    } else {
      res.render("home",{qnas:allQnas, page: 'home'});
    }
  });
});

// AUTH ROUTES
//show sign up form
router.get("/register", function(req, res){
	console.log('Register')
   res.render("register", {page: "register"}); 
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
      req.flash("success", "Welcome to Web Dev Interview Q&A's " + user.username);
			res.redirect("/");
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
	failureRedirect: "/register"
}) ,function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
   	req.flash("success", "Logged you out!");
    res.redirect("/");
});

// FLASHCARDS ROUTES
router.get('/flashcards', (req, res) => {
  // Get all questions from DB
  Qna.find({}, function(err, allQnas){
    if(err){
      req.flash("error", "Something went wrong, try again");
      console.log(err);
    } else {
      res.render("flashcards",{qnas:allQnas, page: 'flashcards'});
    }
  });
});

//ADD QnA ROUTES
router.get('/new', middleware.isLoggedIn, (req, res) => {
	Qna.find({}, function(err, allQnas){
    console.log(Qna)
		if(err){
      req.flash("error", "Something went wrong, try again");
      console.log(err);
    } else {
      res.render("new",{qnas:allQnas, page: 'new'});
    }
	});
});

router.post('/new', middleware.isLoggedIn, (req, res) => {
	var question = req.body.question;
  var answer = req.body.answer;
	var source = req.body.source;
	var author = {
        id: req.user._id,
        username: req.user.username
    };
   var newQna = {question: question, answer: answer, source: source, author: author};
   Qna.create(newQna, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        req.flash("success", "Your new question was created.");

            //redirect back to home page
            console.log(newlyCreated);
            res.redirect("/");
        }
    });
});

// EDIT QnA ROUTE
router.get("/:id/edit", middleware.checkQuestionOwnership, function(req, res){
  Qna.findById(req.params.id, function(err, foundQuestion){
    res.render("edit", {question: foundQuestion});
  });
});

// UPDATE QnA ROUTE
router.put("/:id", middleware.checkQuestionOwnership, function(req, res){
  // find and update the correct question
  Qna.findByIdAndUpdate(req.params.id, req.body.qnas, function(err, updatedQuestion){
   if(err){
       res.redirect("/");
       console.log(err);
   } else {
    req.flash("success", "Your question was edited.");

       res.redirect("/");
   }
  });
});

// DESTROY QnA ROUTE
router.delete("/:id", middleware.checkQuestionOwnership, function(req, res){
   Qna.findByIdAndRemove(req.params.id, function(err){
    if(err){
        res.redirect("/");
        console.log(err);
    } else {
      req.flash("success", "Your question was deleted.");
        res.redirect("/");
    }
   });
});

var routes = router;
module.exports = {routes, app};
