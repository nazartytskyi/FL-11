function getMin() {
	let min = arguments[0];

	for (let i in arguments) {
		if (arguments[i] < min) {
			min = arguments[i];
		}
	}

	return min;
}

getMin(1,2,3);