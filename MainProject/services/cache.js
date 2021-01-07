const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
// We are promisifying the function because redis not providing promises in v3.0
client.get = util.promisify(client.get);
// Referencing the original mongoose exec function
const exec = mongoose.Query.prototype.exec;

// Here we need to ignore arrow function because it doesn't have own "this"
mongoose.Query.prototype.exec = async function () {
	// console.log('This function will run before the query execution');
	// gives us the query which we ran in route
	//  console.log(this.getQuery());
	// gives us the collection name which we ran
	//  console.log(this.mongooseCollection.name);

	// Creating a key for redis cache
	const key = JSON.stringify(Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name }));

	// Check if we have value for 'key' in redis
	const cacheValue = await client.get(key);
	// If we have, return that
	if (cacheValue) {
		console.log(JSON.parse(cacheValue));
		return JSON.parse(cacheValue);
	}

	// Below line is to run the query execution as it is from mongoose
	const result = await exec.apply(this, arguments);
	// else, issue the query and store the result in redis
	// We need to store data in JSON because we'll get mongoose doc from "result"
	client.set(key, JSON.stringify(result));

	return result;
};
