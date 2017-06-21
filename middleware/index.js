const {Qna} = require("../models/qna");
const {User} = require("../models/user");

// all the middleware goes here
const middlewareObj = {};

// prevents access to /qnas
middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please Login First");
  res.redirect("/login");
}

middlewareObj.checkQuestionOwnership = function(req, res, next) {
  if(req.isAuthenticated()){
    Qna.findById(req.params.id, function(err, foundQuestion){ 
     if(err){
       req.flash("error", "Question not found");
       res.redirect("back");
     } else {
         // does user own the question?
         if(foundQuestion.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

module.exports = middlewareObj;