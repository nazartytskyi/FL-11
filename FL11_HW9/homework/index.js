const data = [
	{
		'_id': '5b5e3168c6bf40f2c1235cd6',
		'index': 0,
		' birthday ': '2016-03-18T00:00:00',
		'eyeColor': 'green',
		'name': 'Stein',
		'favoriteFruit': 'apple'
	},
	{
		'_id': '5b5e3168e328c0d72e4f27d8',
		'index': 1,
		' birthday ': '1991-02-11T00:00:00',
		'eyeColor': 'blue',
		'name': 'Cortez',
		'favoriteFruit': 'strawberry'    
	},
	{

		'_id': '5b5e3168cc79132b631c666a',
		'index': 2,
		' birthday ': '1984-04-17T00:00:00',
		'eyeColor': 'blue',
		'name': 'Suzette',
		'favoriteFruit': 'apple'
	},
	{
		'_id': '5b5e31682093adcc6cd0dde5',
		'index': 3,
		' birthday ': '1994-04-17T00:00:00',
		'eyeColor': 'green',
		'name': 'George',
		'favoriteFruit': 'banana'
	}
];

// 	--- TASK 0 --- 
function getNumbers(str) {
	let numbers = [];

	for (let i = 0; i < str.length; i++) {
		if ( isFinite(str[i]) && str[i] !== ' ') {
			numbers.push( parseInt(str[i]) );
		}
	}

	return numbers;
}

getNumbers('string');
getNumbers('n1um3ber95'); 

//	--- TASK 1 ---
function findTypes() {
	let typesCount = {};

	for (let i of arguments) {
		typesCount[typeof i] = ++typesCount[typeof i] || 1;
	}

	return typesCount;
}

findTypes('number');
findTypes(null, 0, 'hello');

// 	--- TASK 2 --- 
function executeforEach(arr, func) {
	for(let i = 0; i < arr.length; i++) {
		func(arr[i]);
	}
}

executeforEach([1,0,1], function(el) { 
							console.log(el) 
						});

// 	--- TASK 3 --- 
function mapArray(arr, func) {
	let resultArr = [];

	for (let i = 0; i < arr.length; i++) {
		resultArr.push( func(arr[i]) );
	}

	return resultArr;
}

mapArray([1, 0, 1], function(el) {
						return el + 1 
					});

// 	--- TASK 4 --- 
function filterArray(arr, func) {
	let filteredArr = [];

	executeforEach(arr, el => {
		if ( func(el) ) {
			filteredArr.push(el);
		}
	})

	return filteredArr
}

filterArray([1, 0, 1], function(el) {
							return el > 1 
							});

// 	--- TASK 5 --- 
function showFormattedDate(dateObj) {
	return `Date: ${dateObj.toLocaleString('en-US', {month: 'short'})} ${dateObj.getDate()} ${dateObj.getFullYear()}`;
}

showFormattedDate(new Date('2019-01-27T01:10:00'));

// 	--- TASK 6 --- 
function canConvertToDate(dateStr) {
	return !isNaN(Date.parse(dateStr));
}

canConvertToDate('2016-13-18T00:00:00');

// 	--- TASK 7 --- 
function daysBetween(dateObj1, dateObj2) {
	const MS_IN_HOUR = 86400000;

	return Math.ceil( Math.abs( dateObj1.getTime() - dateObj2.getTime() ) / MS_IN_HOUR );
}

daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00'));

// 	--- TASK 8 --- 
function getAmountOfAdultPeople(data) {
	function isAdult(obj) {
		const ADULT_AGE = 18;
		const now = new Date();
		let ago18 = new Date();
		ago18.setFullYear(now.getFullYear() - ADULT_AGE);

		return daysBetween(new Date(obj[' birthday ']), now) > daysBetween(ago18, now);
	}

	return filterArray(data, isAdult).length;
}

getAmountOfAdultPeople(data);

// 	--- TASK 9 --- 
function keys(obj) {
	let keysArr = [];

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			keysArr.push(key);
		}
	}

	return keysArr;
}

keys({keyOne: 1, keyTwo: 2, keyThree: 3});

// 	--- TASK 10 ---  
function values(obj) {
	let valuesArr = [];

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			valuesArr.push(obj[key]);
		}
	}

	return valuesArr;
}

values({keyOne: 1, keyTwo: 2, keyThree: 3});
