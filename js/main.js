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
 * Function should hide navigation bar when clicked elsewhere
 */
document.addEventListener('click', function(event) {
    let menuNav = document.getElementById('menuNav');
    let targetElement = event.target;
    
    if (!menuNav.contains(targetElement)) {
        menuNav.classList.add('display-none');
    }
});