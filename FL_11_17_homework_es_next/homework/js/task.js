// --- Task 1 ---
function maxElement(arr) {
	return Math.max(...arr);
}

// --- Task 2 ---
function copyArray(arr) {
	return [...arr];
}

// --- Task 3 ---
function addUniqueId(obj) {
	return Object.assign({id: Symbol('id')}, obj);
}

// --- Task 4 ---
function regroupObject(oldObj) {
	const {
		name,
		details: {
			university,
			age,
			id
		}
	} = oldObj;

	return {
		university,
		user: {
			age,
			firstName: name,
			id
		}
	}
}

// --- Task 5 ---
function findUniqueElements(arr) {
	return Array.from(new Set(arr));
}

// --- Task 6 ---
function hideNumber(phoneNumber) {
	return phoneNumber.slice(-4).padStart(10, '*');
}

// --- Task 7 ---
function missedParamError() {
	throw new Error('Missing property');
}

function add(addition1, addition2 = missedParamError()) {
	return addition1 + addition2;
}

// --- Task 8 ---
function logNamesAlphabetical(username = 'nazartytskyi') {
	fetch(`https://api.github.com/users/${username}/repos`).then(response => {
		return response.json();
	}).then(dataArr => {
		const names = [];
		dataArr.map(data => names.push(data.name));
		console.log(names.sort());
	})
}

// --- Task 9 ---
async function logNamesAlphabeticalAsync(username = 'nazartytskyi') {
	try {
		const response = await fetch(`https://api.github.com/users/${username}/repos`);
		const dataArr = await response.json();
		const names = [];
		dataArr.map(data => names.push(data.name));
		console.log(names.sort());
	} catch(e) {
		console.log(e);
	}
}
