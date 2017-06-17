const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require('express-session');

const {DATABASE_URL, TEST_DATABASE_URL, PORT} = require('./config');
const {User} = require('./models/user');
const {routes, app} = require('./routes/index');

mongoose.Promise = global.Promise;

// const app = express();
app.set('views', './views');
app.set('view engine', 'hbs');
// log the http layer
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "asdgasgsafhsdhh",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
// app.use(express.static('public'));

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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









