async function initLogin() {
    await loadUsers();
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (error) {

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


if (msg) {
    msgBox.innerHTML = msg;
} else {
    // display-none
}


/*
*** Function for changing the checkbox image on click
*** checked and unchecked image
*/
function checkboxImgChange() {
    document.getElementById('checkbox').classList.toggle('icon-checkbox-active');
}