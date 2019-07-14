function pipe(arg) {
	let num = arg;

	for (let i = 1; i < arguments.length; i++) {
		num = arguments[i](num);
	}

	return num; 
}

function addOne(x) {
	return x + 1;
}

pipe(1, addOne);