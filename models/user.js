const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
 
});

const QnaSchema = new mongoose.Schema({
	question: String,
	answer: String,
	owner: String
})

UserSchema.plugin(passportLocalMongoose);





const User = mongoose.model('User', UserSchema);
module.exports = {User};