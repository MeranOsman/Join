let subtasks = [];


function addsubtask() {
    let tasks = document.getElementById('subtasks');
    let inputValue = document.getElementById('subtask').value;

    subtasks.push(inputValue);
    inputValue = '';

    for (let i = 0; i < i.length; i++) {
        tasks.innerHTML = '';
        tasks.innerHTML = `
        <li>
            <span>${subtasks[i]}</span>
        </li>
        `;
    }
}


/**
 * Function opens, closes dropdown menu
 * @param {*} event 
 */
function showCloseContacts(event) {
    document.getElementById('dropdownContact').classList.toggle('display-none');

    event.stopPropagation();
}


/**
 * Function opens, closes dropdown menu and changes the arrow img
 * @param {*} event 
 */
function showCloseCategory(event) {
    let dropdownCategory = document.getElementById('dropdownCategory');
    dropdownCategory.classList.toggle('display-none');

    let arrowImage = document.getElementById('arrow');

    if (arrowImage.src.endsWith('arrow_drop_down.svg')) {
        arrowImage.src = 'img/arrow_drop_up.svg';
    } else {
        arrowImage.src = 'img/arrow_drop_down.svg';
    }

    event.stopPropagation();
}


/**
 * Function change the input img from subtask 
 */
function changeSubtaskImg() {
    document.getElementById('imgChange').innerHTML = /*html*/ `
    <div class="add-subtask">
        <img class="crossPlus" onclick="cancel()" src="img/cross.svg">
        <div class="line"></div>
        <img onclick="addsubtask()" class="crossPlus" src="img/cross.svg">
    </div>
    `;
}


/**
 * Function cancel adding subtasks
 */
function cancel() {
    document.getElementById('imgChange').innerHTML = '<img src="img/plusAddTask.svg" alt="plus-task">';
    document.getElementById('subtask').value = '';
}