const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require('express-session');
const ejs = require('ejs');
const flash = require('connect-flash');
const methodOverride = require("method-override");

const middleware = require("./middleware/index");
const {DATABASE_URL, TEST_DATABASE_URL, PORT} = require('./config');
const {User} = require('./models/user');
const {Qna} = require('./models/qna');
const {routes, app} = require('./routes/index');

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");

app.use(session({
    secret: "asdgasgsafhsdhh",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// log the http layer
app.use(morgan('common'));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use('/', routes);


let server;

function runServer(databaseUrl) {
	const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      server = app.listen(port, () => {
       console.log(`Your app is listening on port ${port}`);
       resolve(server);
     }).on('error', err => {
      mongoose.disconnect();
      reject(err)
    });
   });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};









