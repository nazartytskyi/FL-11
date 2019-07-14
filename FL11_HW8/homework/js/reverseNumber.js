function reverseNumber(number) {
	let reverse = 0;

	while (number / 10 % 10 !== 0) {
		reverse *= 10;
		reverse += number % 10;
		number = Math.sign(number) * Math.floor( Math.abs(number / 10) ); //- number / 10 % 1;
	}
	return reverse;
}

reverseNumber(-123);