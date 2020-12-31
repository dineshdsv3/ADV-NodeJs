// Copy of how to build cluster manually
process.env.UV_THREADPOOL_SIZE = 1;

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
	const crypto = require('crypto');
	const app = express();

	app.get('/', (req, res) => {
		crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
			res.send('Hi There');
		});
	});

	app.get('/fast', (req, res) => {
		res.send('Fast route');
	});

	app.listen(3100, () => {
		console.log(`Port running on 3100`);
	});
}
