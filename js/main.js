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
 * Function to open, close menu and prevent an event
 */
function showMenu(event) {
    document.getElementById('menuNav').classList.toggle('display-none');

    event.stopPropagation();
}


/**
 * Function should hide dropdown menu when clicked elsewhere
 */
document.addEventListener('click', function(event) {
    let menuIds = ['menuNav','dropdownContact', 'dropdownCategory', 'dropdown-contacts'];

    for (let i = 0; i < menuIds.length; i++) {
        let currentMenu = document.getElementById(menuIds[i]);

        if (!currentMenu.contains(event.target)) {
            currentMenu.classList.add('display-none');
        }  else {
            return;
        }
    }
});