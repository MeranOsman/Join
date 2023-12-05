async function addUser() {
    let name = document.getElementById('name-sign-up');
    let email = document.getElementById('mail-sign-up');
    let password = document.getElementById('pass-sign-up');
    let confirmPassword = document.getElementById('pass-sign-up-2');

    if (confirmPassword !== password) {
        alert('The passwords do not match.');
    } else {
        users.push({
            name: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        });
    
        await setItem('users', JSON.stringify(users));
    
        window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert';
    }
}