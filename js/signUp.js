let users = [
    {
        name:'Vorname Nachname',
        email: 'meran@test.de',
        password: 'test0000',
        confirmPassword: 'test0000'
    }
];


function addUser() {
    let name = document.getElementById('name-sign-up');
    let email = document.getElementById('mail-sign-up');
    let password = document.getElementById('pass-sign-up');
    let confirmPassword = document.getElementById('pass-sign-up-2');

    users.push({
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    });

    window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert';
}