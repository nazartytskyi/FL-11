function assign(targetObj, ...args) {
	const resultObj = new Object(targetObj)

	for (let i = 0; i < args.length; i++) {
		for (let prop in args[i]) {
			if ( Object.hasOwnProperty.call(args[i], prop) ) {
				resultObj[prop] = args[i][prop];
			}
		}
	}

	return resultObj;
}