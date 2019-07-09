const PASS_MIN_LENGTH = 6;
const NEW_PASS_MIN_LENGTH = 5;

let user = {
	mail: 'user@gmail.com',
	pass: 'UserPass'
};

let admin = {
	mail: 'admin@gmail.com',
	pass: 'AdminPass'
};

// Step 1 - Validating email
let mail = prompt('Enter your email:');

while (mail !== user.mail && mail !== admin.mail) {
	if (!mail) {
		alert('Canceled');
	} else if (mail.length < PASS_MIN_LENGTH) {
		alert('I don’t know any emails having name length less than 6 symbols');
	} else {
		alert('I don’t know you');
	}

	mail = prompt('Enter your email:');
} 

// Step 2 - Checking password
let pass = prompt('Enter password:');

while (!(mail === user.mail && pass === user.pass || mail === admin.mail && pass === admin.pass)) {
	if(!pass) {
		alert('Canceled');
	} else {
		alert('Wrong password');
	}

	pass = prompt('Enter password:');
}

// Step 3 - Changing password
if (confirm('Do you want to change your password?')) {
	pass = prompt('Enter your current password:');

	while (!(mail === user.mail && pass === user.pass || mail === admin.mail && pass === admin.pass)) {
		pass = prompt('Invalid password. Enter your current password again:');
	}

	let newPass = prompt('Enter new password:');

	while (!newPass || newPass.length < NEW_PASS_MIN_LENGTH) {
		alert('It’s too short password. Sorry.');
		newPass = prompt('Enter new password:');
	}

	let passConfirm = prompt('Enter new password again:');

	while (newPass !== passConfirm ) {
		alert('You wrote the wrong password');
		passConfirm = prompt('Enter new password again:');
	}

	alert('You have successfully changed your password.');
} else {
	alert('You have failed the change.');
}
