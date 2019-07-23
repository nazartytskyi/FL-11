const MAX_ITEMS = 10;

const list = document.getElementById('list')

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', addTodoItem);

const input = document.getElementById('input');
input.addEventListener('input', checkEmptyOrFull);

let dragged, NumOfItems = 0;

document.addEventListener('dragover', function(event) {
    event.preventDefault();
});

function dragStart(el) {
	dragged = el.target;
}

function dragDrop(el) {
	el.preventDefault();

	let target = el.target;

	while (!target.classList.contains('list-item')) {
		target = target.parentElement;
	}

	target.parentElement.insertBefore(dragged, target);

}


function addTodoItem() {
	const input = document.getElementById('input');

	const checkBox = createEl('i', 'material-icons','check_box_outline_blank');
	checkBox.addEventListener('click', markAsChecked);

	const editBtn = createEl('i', 'material-icons','edit');
	editBtn.addEventListener('click', editTodoItem);

	const wrapper = createEl('span', 'content-wrapper');
	wrapper.appendChild(checkBox);
	wrapper.appendChild( createEl('p', '', input.value) );
	wrapper.appendChild(editBtn);

	const deleteBtn = createEl('i', 'material-icons','delete');
	deleteBtn.addEventListener('click', deleteTodoItem);
	
	const listItem = createEl('li', 'list-item')
	listItem.appendChild(wrapper);
	listItem.appendChild(deleteBtn);
	listItem.setAttribute('draggable', 'true');
	listItem.addEventListener('dragstart', dragStart);
	listItem.ondrop = dragDrop;
	list.appendChild(listItem);

	NumOfItems++;
	checkEmptyOrFull();
}

function checkEmptyOrFull() {
	if (NumOfItems >= MAX_ITEMS) {
		document.getElementById('full-notification').style.display = 'block';
		submitBtn.setAttribute('disabled','');
	} else {
		document.getElementById('full-notification').style.display = 'none';
		submitBtn.removeAttribute('disabled');
	}

	if (!input.value) {
		submitBtn.setAttribute('disabled','');
	}
}

function deleteTodoItem(el) {
	el.target.parentNode.remove();
	NumOfItems--;
	checkEmptyOrFull();
}

function markAsChecked(el) {
	el.target.innerText = 'check_box';
}

function editTodoItem(el) {
	if (el.target.previousSibling.previousSibling.innerText === 'check_box') {
		return;
	}

	el.target.innerText = 'save';
	el.target.removeEventListener('click', editTodoItem);
	el.target.addEventListener('click', saveEditedItem);

	const editField = createEl('input', 'edit-field');
	editField.setAttribute('type', 'text');
	editField.value = el.target.previousElementSibling.innerText;


	el.target.previousSibling.remove();
	el.target.previousSibling.style.display = 'none';
	el.target.parentElement.insertBefore(editField, el.target);
}

function saveEditedItem(el) {
	if(!el.target.previousSibling.value) {
		return;
	}

	el.target.innerText = 'edit';
	el.target.removeEventListener('click',saveEditedItem);
	el.target.addEventListener('click', editTodoItem);

	const todoText = createEl('p', '', el.target.previousSibling.value);
	el.target.previousSibling.remove();
	el.target.previousSibling.style.display = 'flex';
	el.target.parentElement.insertBefore(todoText, el.target);
}


function createEl(tagName, className = '', innerText = '') {
	const el = document.createElement(tagName);
	const text = document.createTextNode(innerText);
	el.setAttribute('class', className); 
	el.appendChild(text);

	return el;
}
