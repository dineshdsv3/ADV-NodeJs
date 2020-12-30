const cluster = require('cluster');

// Is the file being executed in 'Master' mode?
if (cluster.isMaster) {
	// Cause index.js to be executed again but in child mode
	cluster.fork();
	cluster.fork();
	cluster.fork();
	cluster.fork();
} else {
	// This is the child mode, It is going to act like a server nothing else.
	const express = require('express');
	const app = express();

	// Function to keep CPU super busy for the duration provided
	// Blocking the event loop here
	function doWork(duration) {
		let start = Date.now();
		while (Date.now() - start < duration) {}
	}

	app.get('/', (req, res) => {
		doWork(5000);
		res.send('Hi There');
	});

	app.get('/fast', (req, res) => {
		res.send('Fast route');
	});

	app.listen(3100, () => {
		console.log(`Port running on 3100`);
	});
}
