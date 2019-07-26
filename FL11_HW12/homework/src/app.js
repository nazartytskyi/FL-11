location.hash = '';
const listElement = document.getElementById('list');
const list = new List('list');
list.render(listElement);

window.addEventListener('hashchange', function() {
	if (location.hash === '') {
	document.getElementById('main-page').style.display = 'flex';
	document.getElementById('modify-page').style.display = 'none';
	document.getElementById('add-task-page').style.display = 'none';
	list.render(listElement);
	} else if (location.hash === '#add') {
	document.getElementById('add-input').value = '';
	document.getElementById('save-new-task-btn').setAttribute('disabled', '');
	document.getElementById('main-page').style.display = 'none';
	document.getElementById('modify-page').style.display = 'none';
	document.getElementById('add-task-page').style.display = 'flex';
	} else if ( location.hash.includes('#modify') ) {
	document.getElementById('main-page').style.display = 'none';
	document.getElementById('modify-page').style.display = 'flex';
	document.getElementById('add-task-page').style.display = 'none';
	}
});

let currentlyModifying = null;

const cancelBtnArr = document.getElementsByClassName('cancel-btn');
cancelBtnArr[0].addEventListener('click', cancel);
cancelBtnArr[1].addEventListener('click', cancel);

document.getElementById('add-task-btn').addEventListener('click', function() {
	location.hash = 'add';
});

document.getElementById('save-new-task-btn').addEventListener('click', function() {
	const description = document.getElementById('add-input').value;
	if ( list.includes(description) ) {
		showMessage('You can\'t add already exist item');
	} else {
		list.addNew(description);
		location.hash = '';
	}
});

document.getElementById('save-modified-btn').addEventListener('click', function() {
	const description = document.getElementById('modify-input').value;
	if ( list.includes(description) ) {
		showMessage('You can\'t add already exist item');
	} else {
		list.modify(currentlyModifying, description);
		location.hash = '';
	}
});

document.getElementById('add-input').addEventListener('input', function(e) {
	if (e.target.value.trim() === '') {
		document.getElementById('save-new-task-btn').setAttribute('disabled', '');
	} else {
		document.getElementById('save-new-task-btn').removeAttribute('disabled');
	}
});

document.getElementById('modify-input').addEventListener('input', function(e) {
	if (e.target.value.trim() === '') {
		document.getElementById('save-modified-btn').setAttribute('disabled', '');
	} else {
		document.getElementById('save-modified-btn').removeAttribute('disabled');
	}
});

document.getElementById('close').addEventListener('click', function(e) {
	e.target.parentElement.parentElement.style.display = 'none';
});

function List(localStorageKey) {
	const key = localStorageKey;
	let toDoArr = [];
	let doneArr = [];

	if (localStorage.getItem(key)) {
		toDoArr = JSON.parse(localStorage.getItem(key)).toDoArr;
		doneArr = JSON.parse(localStorage.getItem(key)).doneArr;
	}

	function saveToLocalStorage() {
		localStorage.setItem(key, JSON.stringify({toDoArr,doneArr}));
	}

	function addNew(description) {
		toDoArr.push({description: description.trim(), isDone: false});
		saveToLocalStorage();
	}

	function markAsChecked(description) {
		for (let i = 0; i < toDoArr.length; i++) {
			if (toDoArr[i].description === description) {
				toDoArr[i].isDone = true;
				doneArr.push(toDoArr[i]);
				toDoArr = toDoArr.remove(i);
				break;
			}
		}
		saveToLocalStorage();
	}

	function markAsUnchecked(description) {
		for (let i = 0; i < doneArr.length; i++) {
			if (doneArr[i].description === description) {
				doneArr[i].isDone = false;
				toDoArr.push(doneArr[i]);
				doneArr = doneArr.remove(i);
				break;
			}
		}
		saveToLocalStorage();
	}

	function modify(prevDes, newDes) {
		for (let i = 0; i < toDoArr.length; i++) {
			if (toDoArr[i].description === prevDes) {
				toDoArr[i].description = newDes.trim();
				saveToLocalStorage();
				return;
			}
		}

		for (let i = 0; i < toDoArr.length; i++) {
			if (doneArr[i].description === prevDes) {
				doneArr[i].description = newDes;
				saveToLocalStorage();
				return;
			}
		}
	}

	function remove(description) {
		for (let i = 0; i < toDoArr.length; i++) {
			if (toDoArr[i].description === description) {
				toDoArr = toDoArr.remove(i);
				saveToLocalStorage();
				return;
			}
		}

		for (let i = 0; i < doneArr.length; i++) {
			if (doneArr[i].description === description) {
				doneArr = doneArr.remove(i);
				saveToLocalStorage();
				return;
			}
		}
	}

	function getItemsArr() {
		return toDoArr.concat(doneArr);
	}

	function render(listEl) {
		const itemsArr = getItemsArr();
		listEl.innerHTML = '';

		if (isEmpty()) {
			const warning = document.createElement('li');
			warning.setAttribute('class', 'warning');
			warning.appendChild(document.createTextNode('TODO is empty'));
			listEl.appendChild(warning);
			return;
		}

		for (let i = 0; i < itemsArr.length; i++) {
			listEl.appendChild( createListItem(itemsArr[i].description, itemsArr[i].isDone) );
		}
	}

	function createListItem(innerText, isDone) {
		const li = document.createElement('li');
		
		const text = document.createElement('p');
		text.appendChild( document.createTextNode(innerText) );
		text.addEventListener('click', function(e) {
			if (isDone) {
				showMessage('You can\'t edit already done item');
			} else {
				let index = 0;
				for(; index < getItemsArr().length; index++) {
					if (getItemsArr()[index].description === innerText) {
						break;
					}
				}
				location.hash = 'modify/:' + index;	
				currentlyModifying = e.target.innerText;
				document.getElementById('modify-input').value = e.target.innerText;
			}
		});

		const checkBoxImg = document.createElement('img');
		if (isDone) {
			checkBoxImg.setAttribute('src', './assets/img/done-s.png');
			li.style.backgroundColor = 'grey';
		} else {
			checkBoxImg.setAttribute('src', './assets/img/todo-s.png');
			li.style.backgroundColor = 'white';
		}
		checkBoxImg.addEventListener('click', checkBoxClick);

		const removeImg = document.createElement('img');
		removeImg.setAttribute('src', './assets/img/remove-s.jpg')
		removeImg.addEventListener('click', removeItem);

		li.setAttribute('class', 'list-item');
		li.appendChild(checkBoxImg)
		li.appendChild(text);
		li.appendChild(removeImg);

		return li;
	}

	function includes(description) {
		const itemsArr = getItemsArr();
		
		for (let i = 0; i < itemsArr.length; i++) {
			if (description === itemsArr[i].description) {
				return true;
			}
		}

		return false
	}

	function isEmpty() {
		return getItemsArr().length === 0;
	}

	return {
		addNew,
		markAsChecked,
		markAsUnchecked,
		remove,
		modify,
		render,
		includes
	}
}

function removeItem(e) {
	list.remove(e.target.previousSibling.innerText);
	list.render(listElement);
}

function checkBoxClick(e) {
	if (e.target.getAttribute('src') === './assets/img/todo-s.png') {
		list.markAsChecked(e.target.nextSibling.innerText);
	} else {
		list.markAsUnchecked(e.target.nextSibling.innerText);
	}

	list.render(listElement);
}

function cancel() {
	location.hash = '';
}

function showMessage(text) {
	const TIME = 2000;

	document.getElementById('message-text').innerText = text;

	const message = document.getElementById('message');
	message.style.display = 'flex';
	if ( !navigator.userAgent.search(/Chrome/) ) {
		message.style.right = '0'
	} else {
		message.style.left = '0'
	}
	
	setTimeout(function() {
		message.style.display = 'none';
	}, TIME);
}

Array.prototype.remove = function(index) {
	let resultArr = [];
	for (let i = 0; i < this.length; i++) {
		if (i === index) {
			continue;
		}
		resultArr.push(this[i]);
	}

	return resultArr;
}

