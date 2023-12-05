/**
 * Function set the first letter of the name to uppercase and insert the data into the api array
 */
async function addUser() {
    let inputName = document.getElementById('name-sign-up');
    let name = inputName.value.charAt(0).toUpperCase() + inputName.value.slice(1).toLowerCase();;
    let email = document.getElementById('mail-sign-up');
    let password = document.getElementById('pass-sign-up');
    let confirmPassword = document.getElementById('pass-sign-up-2');
    let checkbox = document.getElementById('checkbox-sign-up');

    if (checkbox.classList.contains('icon-checkbox-active')) {
        if (confirmPassword.value !== password.value) {
            confirmPassword.style.border = '1px solid red';
            alert('The passwords do not match!');
        } else {
            users.push({
                name: name.value,
                email: email.value,
                password: password.value
            });

            await setItem('users', JSON.stringify(users));

            window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert';
        }
    } else {
        alert('bitte ankreuzen');
    }
}