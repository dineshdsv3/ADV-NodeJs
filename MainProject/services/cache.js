const mongoose = require('mongoose');
// Referencing the original mongoose exec function
const exec = mongoose.Query.prototype.exec;

// Here we need to ignore arrow function because it doesn't have own "this"
mongoose.Query.prototype.exec = function () {
	console.log('This function will run before the query execution');
	// Below line is to run the query execution as it is from mongoose
	return exec.apply(this, arguments);
};
