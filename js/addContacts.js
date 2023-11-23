/*###############################
###
###     JOIN APP 
###     version 1.0.0
###     author: unsere Namen
###
#################################*/


/*
*** function to show the contacts input
*/
function addContact(){
    document.getElementById('contacts-modal').classList.remove('hide');
    document.getElementById('modal-inner').style.setProperty('animation-direction','normal');
}


/*
*** function to close the contacts input
*/
function closeContactsModal(){
    document.getElementById('modal-inner').classList.add('move-to-right');
    document.getElementById('modal-inner').style.setProperty('animation-direction','reverse');
    setTimeout(hideAgain,500);
}


/*
*** function to reverse the move-to-left animation
*/
function hideAgain(){
    document.getElementById('contacts-modal').classList.add('hide');
    document.getElementById('modal-inner').classList.remove('move-to-right');
    clearTimeout(hideAgain);
}


/*
*** function to show the contacts infobox
*/
function infoBox(){
    document.getElementById('infobox-outer').classList.remove('hide');
    document.getElementById('infobox-outer').style.setProperty('animation-direction','normal');
}