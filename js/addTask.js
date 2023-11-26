let subtasks = [];
let category = ['Technical Task', 'User Story'];


/**Function for render all render functions */
function renderAddtask() {
    renderSubtask();
    renderCategory();
}


/**Function for render categories */
function renderCategory() {
    let elements = document.getElementById('categories');
    let input = document.getElementById('inputCategory'); 

    elements.innerHTML = '';
    input.value = '';

    for (let i = 0; i < category.length; i++) {
        elements.innerHTML += `
        <li>
            <span>${category[i]}</span>
            <div class="circle-blue"></div>
        </li>
        `;
    }
}


/**
 * Function for render subtasks
 */
function renderSubtask() {
    let tasks = document.getElementById('subtasks');
    let input = document.getElementById('subtask');

    tasks.innerHTML = '';
    input.value = '';

    for (let i = 0; i < subtasks.length; i++) {
        tasks.innerHTML += /*html*/ `
        <li>
            <span>${subtasks[i]}</span>
            <div class="edit">
                <img class="editDelete " onclick="" src="img/edit.svg">
                <div class="line"></div>
                <img onclick="deleteSubtask(${i})" class="editDelete " src="img/delete.svg">
            </div>
        </li>
        `;
    }
}


/**
 * Function push subtask to array
 * @returns 
 */
function addSubtask() {
    let tasks = document.getElementById('subtasks');
    let input = document.getElementById('subtask');

    if (input.value === '') {
        return;
    } else {
        subtasks.push(input.value);
        renderAddtask();
    }
}


/**
 * Function delete subtask
 * @param {*} i 
 */
function deleteSubtask(i) {
    subtasks.splice(i, 1);

    renderAddtask();
}


/**
 * Function opens, closes dropdown menu contacts
 * @param {*} event 
 */
function showCloseContacts(event) {
    document.getElementById('dropdownContact').classList.toggle('display-none');

    event.stopPropagation();
}


/**
 * Function opens, closes dropdown menu category
 * @param {*} event 
 */
function showCloseCategory(event) {
    document.getElementById('dropdownCategory').classList.toggle('display-none');

    event.stopPropagation();
}


/**
 * Function change the input img from subtask 
 */
function changeSubtaskImg() {
    document.getElementById('imgChange').innerHTML = /*html*/ `
    <div class="add-subtask">
        <img class="crossPlus" onclick="cancelSubtask()" src="img/cross.svg">
        <div class="line"></div>
        <img onclick="addSubtask()" class="crossPlus" src="img/check-black.svg">
    </div>
    `;
}


/**
 * Function cancel adding subtasks
 */
function cancelSubtask() {
    document.getElementById('imgChange').innerHTML = '<img onclick="changeSubtaskImg()" src="img/plusAddTask.svg" alt="plus-task">';
    document.getElementById('subtask').value = '';
}