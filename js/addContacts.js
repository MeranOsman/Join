/*###############################
###
###     JOIN APP 
###     version 1.0.0
###     author: unsere Namen
###
#################################*/


function addContact(){
    document.getElementById('contacts-modal').classList.remove('hide');
    document.getElementById('modal-inner').style.setProperty('animation-direction','normal');
}

function closeContactsModal(){
    document.getElementById('modal-inner').classList.add('move-to-right');
    document.getElementById('modal-inner').style.setProperty('animation-direction','reverse');
    setTimeout(hideAgain,500);
}

function hideAgain(){
    document.getElementById('contacts-modal').classList.add('hide');
    document.getElementById('modal-inner').classList.remove('move-to-right');
    clearTimeout(hideAgain);
}



function infoBox(){
    document.getElementById('infobox-outer').classList.remove('hide');
    document.getElementById('infobox-inner').style.setProperty('animation-direction','normal');
}