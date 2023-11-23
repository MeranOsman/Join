/*###############################
###
###     JOIN APP 
###     version 1.0.0
###     author: unsere Namen
###
#################################*/

/**
 * Function should hide navigation bar when clicked elsewhere
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
