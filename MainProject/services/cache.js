const mongoose = require('mongoose');
// Referencing the original mongoose exec function
const exec = mongoose.Query.prototype.exec;

// Here we need to ignore arrow function because it doesn't have own "this"
mongoose.Query.prototype.exec = function () {
	console.log('This function will run before the query execution');
	// gives us the query which we ran in route
	//  console.log(this.getQuery());
	// gives us the collection name which we ran
	//  console.log(this.mongooseCollection.name);

	// Creating a key for redis cache
	const key = Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name });

	console.log(key);

	// Below line is to run the query execution as it is from mongoose
	return exec.apply(this, arguments);
};
