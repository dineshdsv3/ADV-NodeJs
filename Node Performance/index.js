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

app.listen(3100, () => {
	console.log(`Port running on 3100`);
});
