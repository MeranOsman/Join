/*
*** function to show the contacts input
*/
function showModal(outer, inner){
    document.getElementById(outer).classList.remove('hide');
    document.getElementById(inner).style.setProperty('animation-direction','normal');
    document.body.style.overflow = 'hidden';
}


/*
*** function to close the contacts input
*/
function closeModal(outer,inner){
    document.getElementById(inner).classList.add('move-to-right');
    document.getElementById(inner).style.setProperty('animation-direction','reverse');
    document.body.style.overflow = 'auto';
    setTimeout(function() {hideAgain(outer, inner);}, 250);
}


/*
*** function to reverse the move-to-left animation
*/
function hideAgain(outer, inner){
    document.getElementById(outer).classList.add('hide');
    document.getElementById(inner).classList.remove('move-to-right');
    clearTimeout(hideAgain);
}


/*
*** help function to remove single hide classes from elements
*/
function removeHide(remove){
    document.getElementById(remove).classList.remove('hide');
}