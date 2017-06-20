const express = require('express');
const passport = require('passport');
const {User, Qna} = require('../models/user');
const middleware = require("../middleware");
const router = express.Router();
const app = express();

//INDEX - show all campgrounds
router.get('/', (req, res) => {
  // Get all campgrounds from DB
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

router.post('/new', middleware.isLoggedIn, (req, res) => {
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

// EDIT CAMPGROUND ROUTE
// router.get("/:id", function(req, res){
//     //find the campground with provided ID
//     Qna.findById(req.params.id).exec(function(err, foundQuestion){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundQuestion)
//             //render show template with that campground
//             res.render("edit", {qnas: foundQuestion});
//         }
//     });
// });

router.get("/:id/edit", function(req, res){
    Qna.findById(req.params.id, function(err, foundQuestion){
        res.render("edit", {question: foundQuestion});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
    // find and update the correct campground
    Qna.findByIdAndUpdate(req.params.id, req.body.qnas, function(err, updatedQuestion){
       if(err){
           res.redirect("/");
           console.log(err);
       } else {
           //redirect somewhere(show page)
           res.redirect("/");
       }
    });
});





// // catch-all endpoint if client makes request to non-existent endpoint
// app.use('*', function(req, res) {
//   res.status(404).json({message: 'Not Found'});
// });


var routes = router;
module.exports = {routes, app};



