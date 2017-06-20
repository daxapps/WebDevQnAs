const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const ejs = require("ejs");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
 
});

const QnaSchema = new mongoose.Schema({
	question: String,
	answer: String,
	source: String,
	author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
})

QnaSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		question: this.question,
		answer: this.answer,
		source: this.source,
		author: user._id

	};
}

UserSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', UserSchema);
const Qna = mongoose.model('Qna', QnaSchema);

module.exports = {User, Qna};