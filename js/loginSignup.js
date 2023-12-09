async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (error) {
        console.log('Anmeldedaten nicht gefunden');
    }
}


function login() {
    let email = document.getElementById('mail');
    let password = document.getElementById('pass');
    let span = document.getElementById('wrong');
    let user = users.find(u => u.email == email.value && u.password == password.value);

    if (user) {
       window.location.href ='summary.html';
    } else {
        email.style.border = '1px solid red';
        password.style.border = '1px solid red';
        span.innerHTML = 'Wrong email or password Ups! Try again.';
    }
}


/*
* Function for changing the checkbox image on click
* checked and unchecked image
*/
function checkboxImgChange() {
    let checkboxLogIn = document.getElementById('checkbox');
    let checkboxSignUp = document.getElementById('checkbox-sign-up');

    if(checkboxLogIn){
        checkboxLogIn.classList.toggle('icon-checkbox-active');
    }

    if(checkboxSignUp){
        checkboxSignUp.classList.toggle('icon-checkbox-active');
    }
}


/**
 * Function set the first letter of the name to uppercase and insert the data into the api array
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