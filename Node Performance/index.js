const express = require('express');
const crypto = require('crypto');
const app = express();
const Worker = require('web-worker');

app.get('/', (req, res) => {
	const worker = new Worker('workerScript.js');

	worker.onmessage = (message) => {
		console.log(message.data);
		res.send(String(message.data));
	};

	worker.postMessage();
	// crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
	// 	res.send('Hi There');
	// });
});

app.get('/fast', (req, res) => {
    let counter = 0;
	// while (counter < 1e9) {
	// 	counter++;
	// }
	res.send('Fast route');
});

app.listen(3100, () => {
	console.log(`Port running on 3100`);
});
