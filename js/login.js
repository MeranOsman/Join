async function initLogin() {
    await loadUsers();
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (error) {
        console.log('anmeldedaten nicht gefunden');
    }
}

function login() {
    let email = document.getElementById('mail');
    let password = document.getElementById('pass');
    let user = user.find(u => u.email == email.value && u.password == password.value);

    if (user) {
        // wenn gefunden dann ...
    } else {
        // wenn nicht gefunden dann ...
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