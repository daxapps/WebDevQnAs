const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const ejs = require("ejs");

const QnaSchema = new mongoose.Schema({
	question: String,
	category: String,
	answer: String,
	source: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

QnaSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		question: this.question,
		category: this.category,
		answer: this.answer,
		source: this.source,
		author: user._id
	};
};

const Qna = mongoose.model('Qna', QnaSchema);

module.exports = {Qna};
