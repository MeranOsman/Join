/**
 * Function set the first letter of the name to uppercase and insert the data into the api array
 */
async function addUser() {
    let inputName = document.getElementById('name-sign-up');
    let name = inputName.value.charAt(0).toUpperCase() + inputName.value.slice(1).toLowerCase();
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
                name: name.value,
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