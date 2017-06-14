const express = require("express");
const app = express();


app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render("home");
});



app.listen(process.env.PORT || 8080, function() {
	console.log('server started.......');
});