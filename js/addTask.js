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

    elements.innerHTML = '';

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
 * Function opens, closes dropdown menu category and arrow img + text
 * @param {*} event 
 */
function showCloseCategory() {
    let dropdownCategory = document.getElementById('dropdownCategory');
    let input = document.getElementById('categoryText');

    dropdownCategory.classList.toggle('display-none');
    input.classList.toggle('light-gray-placeholder');
    
    let arrowImage = document.getElementById('arrow');

    if (arrowImage.src.endsWith('arrow_drop_down.svg')) {
        arrowImage.src = 'img/arrow_drop_up.svg';
        input.placeholder = 'Create new task category';
        // input.classList.add('light-gray-placeholder');
    } else {
        arrowImage.src = 'img/arrow_drop_down.svg';
        input.placeholder = 'Select or create new task category';
    }
}


function changeCategoryImg() {
    document.getElementById('addCancel').innerHTML = /*html*/ `
    <div class="addCancel">
        <img class="crossPlus" onclick="cancelCategory()" src="img/cross.svg">
        <div class="line"></div>
        <img onclick="addSubtask()" class="crossPlus" src="img/check-black.svg">
    </div>
    `;
}


function cancelCategory() {
    document.getElementById('addCancel').innerHTML = `
    <div id="addCancel" class="add-category">
        <img onclick="changeCategoryImg()" class="plus-category" src="img/plusAddTask.svg" alt="plus-task">
        <div class="line"></div>
        <img id="arrow" class="arrow" onclick="showCloseCategory()"
        src="img/arrow_drop_down.svg" alt="arrow-up">
    </div>
    `;
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