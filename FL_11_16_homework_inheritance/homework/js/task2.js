function create(obj) {
	const temp = new Object();

	temp.__proto__ = obj;

	return temp;
}
 