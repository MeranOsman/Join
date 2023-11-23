/*###############################
###
###     JOIN APP 
###     version 1.0.0
###     author: unsere Namen
###
#################################*/


/*
* Function for changing the checkbox image on click
* checked and unchecked image
*/
function checkboxImgChange() {
    document.getElementById('checkbox').classList.toggle('icon-checkbox-active');
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
    let menuIds = ['menuNav','dropdownContact'];

    for (let i = 0; i < menuIds.length; i++) {
        let currentMenu = document.getElementById(menuIds[i]);

        if (!currentMenu.contains(event.target)) {
            currentMenu.classList.add('display-none');
        }  
    }
});
