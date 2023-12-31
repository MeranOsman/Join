/**
 * Asynchronously loads user data.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (error) {
        console.log('Anmeldedaten nicht gefunden');
    }
}


/**
 * Validates email and password for login, redirects to 'summary.html' on success.
 */
function login() {
    let email = document.getElementById('mail');
    let password = document.getElementById('pass');
    let span = document.getElementById('wrong');
    let user = users.find(u => u.email == email.value && u.password == password.value);

    if (user) {
        window.location.href = 'summary.html';
    } else {
        email.style.border = '1px solid red';
        password.style.border = '1px solid red';
        span.innerHTML = 'Wrong email or password Ups! Try again.';
    }
}


/**
 * Performs a guest login and redirects to the 'summary.html' page.
 */
function guestLogin() {
    users.splice(0, users.length);
    setItem('users', JSON.stringify(users));
    window.location.href = 'summary.html';
}


/**
 * Changes the appearance of the checkbox icon for login and sign-up.
 */
function checkboxImgChange() {
    let checkboxLogIn = document.getElementById('checkbox');
    let checkboxSignUp = document.getElementById('checkbox-sign-up');

    if (checkboxLogIn) {
        checkboxLogIn.classList.toggle('icon-checkbox-active');
    }

    if (checkboxSignUp) {
        checkboxSignUp.classList.toggle('icon-checkbox-active');
    }
}


/**
 * Adds a user, validates data, capitalizes first letter of the name, and inserts into the API array.
 */
async function addUser() {
    let name = document.getElementById('name-sign-up');
    let nameParts = name.value.trim().split(' ');
    let fullName = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');
    let nameLetters = nameParts.map(letter => letter.charAt(0).toUpperCase()).join('');
    let email = document.getElementById('mail-sign-up');
    let password = document.getElementById('pass-sign-up');
    let confirmPassword = document.getElementById('pass-sign-up-2');
    let checkbox = document.getElementById('checkbox-sign-up');
    let span = document.getElementById('noticeSpan');
    let policy = document.getElementById('signUpPolicy');
    let success = document.getElementById('success');

    if (checkbox.classList.contains('icon-checkbox-active')) {
        if (confirmPassword.value !== password.value) {
            confirmPassword.style.border = '1px solid red';
            span.innerHTML = `Ups! your password don't match`;
        } else {
            users.push({
                name: fullName,
                nameLetters: nameLetters,
                email: email.value,
                password: password.value
            });
            await setItem('users', JSON.stringify(users));
            success.classList.remove('display-none');
            setTimeout(function () {
                window.location.href = 'index.html';
            }, 3000);
        }
    } else {
        policy.style.color = 'red';
        policy.style.textDecoration = 'underline';
    }
}