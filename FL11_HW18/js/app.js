const loader = toHTMLElement('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>')
document.body.appendChild(loader);
loader.style.display = 'none';

const backBtn = toHTMLElement('<div class="back-btn">Go Back</div>')

backBtn.addEventListener('click', () => {
	document.body.innerHTML = '';
	window.location.href= '';
	usersLoader();
});

usersLoader();

function toHTMLElement(HTMLText) {
	const tempWrapper = document.createElement('div');
	tempWrapper.innerHTML = HTMLText;
	return tempWrapper.children[0];
}

class UserCard {
	constructor(user) {
		this._user = user;
		this._nameField = toHTMLElement(`<a href="#post-${user.id}" class="user-card__name editable">${this._user.name}</a>`);
		this._usernameField = toHTMLElement(`<p class="user-card__username editable">${this._user.username}</p>`);
		this._emailField = toHTMLElement(`<p class="user-card__email editable">${this._user.email}</p>`);		
		
		this._card = toHTMLElement('<div class="user-card"></div>');
		this._editBtn = toHTMLElement(`<button>Edit</button>`);
		this._card.appendChild(this._editBtn);
		this._editBtn.addEventListener('click', () => {
			const editableFieldsArr = this._card.querySelectorAll('.editable');

			for(let i = 0; i < editableFieldsArr.length; i++) {
				const input = toHTMLElement(`<input class="edit-input"type="text">`);
				input.value = editableFieldsArr[i].innerText;
				this._card.appendChild(input);
				editableFieldsArr[i].remove(); 
			}
			this._editBtn.style.display = 'none';
			this._saveBtn.style.display = 'block'
		});

		this._saveBtn = toHTMLElement(`<button>Save</button>`);
		this._saveBtn.style.display = 'none';
		this._card.appendChild(this._saveBtn);
		this._saveBtn.addEventListener('click', () => {
			const editInputsArr = this._card.querySelectorAll('.edit-input');			
			this._nameField.innerText = editInputsArr[0].value;
			this._usernameField.innerText = editInputsArr[1].value;
			this._emailField.innerText = editInputsArr[2].value;

			this._user.name = this._nameField.innerText; 
			this._user.username = this._usernameField.innerText;
			this._user.email = this._emailField.innerText;

			showLoader(loader)
			fetch('https://jsonplaceholder.typicode.com/users/' + this._user.id, {
			    method: 'PUT',
			    body: JSON.stringify(this._user),
			    headers: {
			      "Content-type": "application/json; charset=UTF-8"
			    }	  
			})
			.then(() => {			
			 	for(let i = 0; i < editInputsArr.length; i++) {
			  		editInputsArr[i].remove();
			  	}
			  	
			  	this._editBtn.style.display = 'block';
			  	this._saveBtn.style.display = 'none';
			  	this.render(this._card.parentElement);
			  	hideLoader(loader);
			});			  

		});

		this._deleteBtn = toHTMLElement(`<button  class="del-btn">Delete</button>`);
		this._deleteBtn.addEventListener('click', () => {
			this._card.style.opacity = '0.3';
			showLoader(loader);
			fetch('https://jsonplaceholder.typicode.com/users/' + this._user.id , {
				method: 'DELETE'
			})
			.then(() =>{
				this._card.parentElement.remove();
				hideLoader(loader);
			})
		});

	}

	render(wrap) {
		this._card.appendChild(this._nameField);
		this._card.appendChild(this._usernameField);
		this._card.appendChild(this._emailField);
		this._card.appendChild(this._editBtn);
		this._card.appendChild(this._saveBtn);
		this._card.appendChild(this._deleteBtn);
		
		wrap.innerHTML = '';
		wrap.appendChild(this._card);
	}

}
function usersLoader() {
	showLoader(loader)
	fetch('https://jsonplaceholder.typicode.com/users/')
	.then(response => response.json())
	.then(data => {
		for(let i = 0; i < data.length; i++) {
			const wrapper = toHTMLElement('<div class="user-wrap"></div>')
			new UserCard(data[i]).render(wrapper);
			document.body.appendChild(wrapper);
		}

		hideLoader(loader);
	});
}


window.onhashchange = function() {
	const userWraps = document.querySelectorAll('.user-wrap');

	if (window.location.hash.includes('#post-')) {
		for(let i = 0; i < userWraps.length; i++) {
			userWraps[i].style.display = 'none';
		}

		const id = +window.location.hash.replace('#post-','');
		showLoader();
		Promise.all([getPosts(id), getComments()])
		.then(([post, comments]) => {
			for(let i = 0; i < post.length; i++) {
				new Post([post[i], comments.filter(el => el.postId === post[i].id)]).render();
			}
			document.body.appendChild(backBtn); 
			hideLoader();
		});

	} else {
		for(let i = 0; i < user.length; i++) {
			userWraps[i].style.display = 'block';
		}

		const oldPosts = document.querySelectorAll('.post-wrapper');
		for(let i = 0; i < oldPosts.length; i++) {
			oldPosts[i].remove();
		}
	}
}

class Post {
	constructor([post, commentsArr]) {
		this._postTitle = post.title;
		this._postBody = post.body;
		this._commentsArr = commentsArr;
	}

	render() {
		let innerHTML = 
			`
			<div class="post-wrapper">
				<div class="post">
					<h2>${this._postTitle}</h2>
					<p>${this._postBody}</p>
				</div>
				<div class="comments-wrapper">

				</div>
			</div>
			`

		innerHTML = toHTMLElement(innerHTML);
		for(let i = 0; i < this._commentsArr.length; i++) {
			const commentsHTML = 
			`
			<div class="comment">
				<h3>${this._commentsArr[i].name}</h3>
				<p>${this._commentsArr[i].body}</p>
				<a>${this._commentsArr[i].email}</a>
			</div>
			`
			innerHTML.querySelector('.comments-wrapper').appendChild(toHTMLElement(commentsHTML));
		}

		document.body.appendChild(innerHTML);
	}

}

function getPosts(id) {
	return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
	.then((data) => {
		return data.json()
	});        
}

function getComments() {
	return fetch(`https://jsonplaceholder.typicode.com/comments`)
	.then((response) => {
		return response.json()
	})
}

function showLoader(loaderloader) {
	loader.style.display = 'block';
	document.body.style.opacity = '0.5';
}

function hideLoader(loaderloader) {
	loader.style.display = 'none';
	document.body.style.opacity = '1';
}