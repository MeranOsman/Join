/*###############################
###
###     JOIN APP 
###     version 1.0.0
###     author: unsere Namen
###
#################################*/

/*
*** Function for changing the checkbox image on click
*** checked and unchecked image
*/
function checkboxImgChange() {
    document.getElementById('checkbox').classList.toggle('icon-checkbox-active');
}


/**
 * Function to show and close menu from header
 */
function showMenu() {
    document.getElementById('menuNav').classList.toggle('display-none');
}


/**
 * Function to close menu from header outside
 * @param {*} event 
 */
function closeMenuOutsideClick(event) {

}