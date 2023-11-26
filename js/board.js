/*
*** function to show the task info input
*/
function showTaskInfo(){
    document.getElementById('task-info-modal').classList.remove('hide');
    document.getElementById('task-pop-up').style.setProperty('animation-direction','normal');
}


/*
*** function to close the task info input
*/
function closeTaskModal(){
    document.getElementById('task-pop-up').classList.add('move-to-right-pop');
    document.getElementById('task-pop-up').style.setProperty('animation-direction','reverse');
    setTimeout(hideAgainPop,250);
}


/*
*** function to reverse the move-to-left animation
*/
function hideAgainPop(){
    document.getElementById('task-info-modal').classList.add('hide');
    document.getElementById('task-pop-up').classList.remove('move-to-right-pop');
    clearTimeout(hideAgainPop);
}


/*
*** function to show add task modal
*/
function addTaskOnBoard(){
    document.getElementById('add-task-board').classList.remove('hide');
    document.getElementById('close-btn-addTask').classList.remove('hide');
    document.getElementById('addTask-inner-modal').style.setProperty('animation-direction','normal');
}


/*
*** function to close add task modal
*/
function closeAddTaskModal(){
    document.getElementById('addTask-inner-modal').classList.add('move-to-right-pop');
    document.getElementById('addTask-inner-modal').style.setProperty('animation-direction','reverse');
    setTimeout(hideAgainAddTask,250);
}

/*
*** function to reverse the move-to-left animation
*/
function hideAgainAddTask(){
    document.getElementById('add-task-board').classList.add('hide');
    document.getElementById('addTask-inner-modal').classList.remove('move-to-right-pop');
    clearTimeout(hideAgainAddTask);
}