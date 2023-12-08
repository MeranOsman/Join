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