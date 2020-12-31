addEventListener('message', () => {
	let counter = 0;
	while (counter < 1e9) {
		counter++;
	}
	postMessage(counter);
});
