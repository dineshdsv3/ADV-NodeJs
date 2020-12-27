const https = require('https');

const start = Date.now();

function doRequest() {
	https
		.request('https://www.google.com', (res) => {
			res.on('data', () => {});
			res.on('end', () => {
				console.log(Date.now() - start);
			});
		})
		.end();
}

doRequest(); // 798
doRequest(); // 849
doRequest(); // 851
doRequest(); // 854
doRequest(); // 876
doRequest(); // 882
doRequest(); // 889

// All will have almost simliar times because networking calls will be handled by OS rather than node.js
