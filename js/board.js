/*
*** function to show the contacts input
*/
function showTaskInfo(){
    document.getElementById('task-info-modal').classList.remove('hide');
    document.getElementById('task-pop-up').style.setProperty('animation-direction','normal');
}


/*
*** function to close the contacts input
*/
function closeTaskModal(){
    document.getElementById('task-pop-up').classList.add('move-to-right-pop');
    document.getElementById('task-pop-up').style.setProperty('animation-direction','reverse');
    setTimeout(hideAgainPop,500);
}


/*
*** function to reverse the move-to-left animation
*/
function hideAgainPop(){
    document.getElementById('task-info-modal').classList.add('hide');
    document.getElementById('task-pop-up').classList.remove('move-to-right-pop');
    clearTimeout(hideAgainPop);
}