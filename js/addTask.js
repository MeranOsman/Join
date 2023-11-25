let subtasks = [];
let category = ['Technical Task', 'User Story'];


/**Function for render all render functions */
function render() {
    renderSubtask();
    renderCategory();
}


/**Function for render categories */
function renderCategory() {
    let elements = document.getElementById('categories');

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
        render();
    }
}


function deleteSubtask(i) {
    subtasks.splice(i, 1);

    render();
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
 * Function opens, closes dropdown menu and changes the images + text
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
        <img onclick="addSubtask()" class="crossPlus" src="img/check-black.svg">
    </div>
    `;
}


/**
 * Function cancel adding subtasks
 */
function cancel() {
    document.getElementById('imgChange').innerHTML = '<img onclick="changeSubtaskImg()" src="img/plusAddTask.svg" alt="plus-task">';
    document.getElementById('subtask').value = '';
}