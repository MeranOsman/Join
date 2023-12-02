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
    document.getElementById(remove).style.setProperty('opacity','1');
    document.getElementById(remove).classList.remove('hide');
}

/*
*** help function to add single hide classes to elements
*/
function addHide(hide){
    document.getElementById(hide).classList.add('hide');
    document.getElementById(hide).style.setProperty('opacity','0');
}


/*
*** help function to move z-index from 0 to -1
*/
function addZindex(add){
    document.getElementById(add).style.setProperty('z-index','-1');
}


/*
*** help function to remove hide classes with time delay
*/
function wait(remove) {
    // Verzögere den Funktionsaufruf um 250 Millisekunden
    setTimeout(function () {
      removeHide(remove); // Deine Funktion, die aufgerufen werden soll
    }, 250);
  }