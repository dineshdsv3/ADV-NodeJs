const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
	https
		.request('https://www.google.com', (res) => {
			res.on('data', () => {});
			res.on('end', () => {
				console.log(`request: `, Date.now() - start);
			});
		})
		.end();
}

function dohash() {
	crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
		console.log(`Hash: `, Date.now() - start);
	});
}

doRequest();

fs.readFile('multiTask.js', 'utf8', () => {
	console.log(`FS: `, Date.now() - start);
});

dohash();
dohash();
dohash();
dohash();
dohash();

