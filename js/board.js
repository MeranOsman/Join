/*
*** INITIALISATION
*/
async function initBoard() {
    await includeHTML();
    await loadUsers();
    await renderUserLetters();
    await updateHTML();
    await renderSubtask();
    await renderCategory();
    await renderContacts();
}


/* ########################################################################################   DRAG n DROP ### BLOCK */
/*
*** function for make elements moveable
*/
function allowDrop(ev) {
    ev.preventDefault();
}


/*
*** function for calling each sorted category
*** first = elements id
*** snd   = array value from 'sort'
*/
async function updateHTML() {
    updateCategory('toDo', 'toDo');
    updateCategory('inProgress', 'inProgress');
    updateCategory('feedback', 'feedback');
    updateCategory('done', 'done');
}


/*
*** function for sorting the tasks
*** checked the 'sort' value and arranged them
*** check if there are content to render, if not then show a no task container
*/
function updateCategory(categoryId, categoryType) {
    let categoryTasks = tasks.filter(t => t['sort'] == categoryType);
    let categoryContainer = document.getElementById(categoryId);

    if (categoryTasks.length === 0) {
        categoryContainer.innerHTML = '<div class="empty-card-container"><div id="empty-card" class="tasks-card-empty"><p>No tasks To do</p></div></div>';
    } else {
        categoryContainer.innerHTML = '';

        for (let index = 0; index < categoryTasks.length; index++) {
            const element = categoryTasks[index];
            const progressBarId = `progressBar-${element['id']}`;
            categoryContainer.innerHTML += renderTasks(element, progressBarId);
            progressBar(element, progressBarId);
        }
    }
}

/*
*** function to track the tasks id
*/
function startDragging(id) {
    currentDraggedElement = id;
}


/*
*** function for render the tasks
*/
function renderTasks(element, progressBarId) {
    let subtasksHtml = '';
    //check if subtask is more then 0, if true then save html content in variable subtasksHtml
    // if not, then subtasksHtml remains empty
    if (element.subtasks.length > 0) {
        subtasksHtml = `<div id="progress-${element['id']}" class="flex-btw">
            <div class="flex-start-progress">
                <div class="task-progress-bar-bg"></div>
                <div id="${progressBarId}" class="task-progress-bar"></div>
            </div>
            <p class="task-progress-task">${element.subTaskCount}/${element.subtasks.length} Subtasks</p>
        </div>`;
    }

    return `<div id="task-${element['id']}" onclick="taskInfo(${element['id']}), clearAndCloseTaskEdit()" class="tasks-card" draggable="true" ondragstart="startDragging(${element['id']})">
            <p class="task-card-heading upper-text ${element.categoryCol}">${element.category}</p>
            <p class="task-card-title">${element.title}</p>
            <p class="task-card-note">${truncateText(element.description, 40)}</p>
            ${subtasksHtml}
            <div class="flex-btw">
                <div class="flex-icons-task">
                    ${element.employees.map((employee, index) => `
                        <div class="contact-icons-task ${element.color[index]}${index > 0 ? ' margin-left-neg' : ''}">
                            ${employee}
                        </div>`).join('')}
                </div>
                <img src="img/prio${element.prio.charAt(0).toUpperCase() + element.prio.slice(1)}.svg" />
            </div>
        </div>`;
}


/*
*** shortens the description if longer then 40 chars
*/
function truncateText(taskDescription, maxLength) {
    return taskDescription.length > maxLength ? taskDescription.slice(0, maxLength) + '...' : taskDescription;
}


/*
*** function for set the new sort value
*/
function moveTo(sorting) {
    tasks[currentDraggedElement - 1]['sort'] = sorting;
    removeHighlight(sorting);
    noRotate(sorting);
    updateHTML();
}


/* ########################################################################################   TASKS INFOS AND EDITS ### BLOCK */
/*
*** function for render the task info
*/
function taskInfo(taskId) {
    const task = tasks.find(t => t.id === taskId);

    document.getElementById('closeX').innerHTML = `<div onclick="closeModal('task-info-modal','task-pop-up'), updateHTML();" class="close-task-pop">X</div>`;
    document.getElementById('sorting').textContent = task.category;
    document.getElementById('sorting').classList = `task-pop-category ${task.categoryCol} upper-text margin-b-16`;
    document.getElementById('title-task').textContent = task.title;
    document.getElementById('description-task').textContent = task.description;
    document.getElementById('date-task').textContent = task.date;
    document.getElementById('prio-task').innerHTML = `${task.prio} <img class="prio-pop" src="img/prio${task.prio.charAt(0).toUpperCase() + task.prio.slice(1)}.svg" />`;
    document.getElementById('tasks-delete-btn').innerHTML = `<img src="img/delete.svg"/><div class="subtask" onclick="deleteTask(${taskId}),closeModal('task-info-modal','task-pop-up')">Delete</div>`;
    document.getElementById('task-edit-btn').innerHTML = `<img src="img/edit.svg"/><div class="subtask" onclick="editTask(${taskId})">Edit</div>`;

    const employeesHtml = task.employees.map((employee, index) => `
        <div class="flex-start">
            <div class="contact-icons-task ${task.color[index]}">${employee}</div>
            <div class="margin-l-s">${task.contacts[index]}</div>
        </div>
    `).join('');

    document.getElementById('task-employees').innerHTML = employeesHtml;

    const subtasksHtml = task.subtasks.map((subtask, index) => {
        const subtaskId = `${taskId}-${index}`;
        const subtaskCheck = subtaskStatus[subtaskId] ? 'check-icon' : 'uncheck-icon';

        return `
            <div class="hover">
                <div id="subtasks-${subtaskId}" class="${subtaskCheck} margin-l-s subtask pointer" onclick="checkIcon('${subtaskId}')">${subtask}</div>
            </div>`;}).join('');

    document.getElementById('task-subtask').innerHTML = subtasksHtml;

    showTaskInfoModal();
}


/*
*** function handle the check icons
*/
function checkIcon(subtaskId) {

    const subtaskElement = document.getElementById(`subtasks-${subtaskId}`);
    subtaskElement.classList.toggle('check-icon');

    // update status
    subtaskStatus[subtaskId] = !subtaskStatus[subtaskId];

    // Increase subTaskCount if check-icon is active
    const [taskId] = subtaskId.split('-');
    const task = tasks.find(t => t.id === parseInt(taskId));

    if (subtaskElement.classList.contains('check-icon')) {
        task.subTaskCount += 1;
    } else {
        task.subTaskCount -= 1;
    }
}




/*
*** function for show the info modal
*/
function showTaskInfoModal() {
    document.getElementById('task-info-modal').classList.remove('hide');
    document.getElementById('task-pop-up').style.setProperty('animation-direction', 'normal');
    document.body.style.overflow = 'hidden';
}


/*
*** function to delete the contact
*/
function deleteTask(taskId) {
    // Find the index of the task with the given ID
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    // Check if the task with the given ID exists
    if (taskIndex !== -1) {
        // Remove the task from the tasks array
        tasks.splice(taskIndex, 1);
        updateHTML();
    } else {
        console.error('Task not found for deletion');
    }
}


/*
*** function for edit a spcific task
*/
function editTask(taskId) {
    clearAndCloseTaskEdit();
    // Find the index of the task with the given ID
    const task = tasks.find(t => t.id === taskId);

    document.getElementById('task-pop-up').style.setProperty('display', 'none');
    document.getElementById('edit-mode').classList.remove('display-none');
    document.getElementById('input-task-title').innerHTML = `<input type="text" value="${task.title}">`;
    //document.getElementById('textarea-task-description').innerHTML = `<textarea>${task.description}</textarea>`;
    document.getElementById('calender-input').innerHTML = `<input type="date">`;
    document.getElementById('task-save-btn').innerHTML = `<button type="submit" class=" btn-login media" onclick="saveTask(${taskId}),clearAndCloseTaskEdit()">Save
                                                            <span class="icon-check-new"></span></button>`
}


/*
*** function for close and clear the edit mode
*/
function clearAndCloseTaskEdit() {
    document.getElementById('task-pop-up').style.setProperty('display', 'block');
    document.getElementById('edit-mode').classList.add('display-none');

    document.getElementById('input-task-title').innerHTML = '';
    document.getElementById('textarea-task-description').innerHTML = '';
    document.getElementById('calender-input').innerHTML = '';
    document.getElementById('prio-task-input').innerHTML = '';
    document.getElementById('task-employees-input').innerHTML = '';
    document.getElementById('task-subtask-input').innerHTML = '';
}


/**
 * Function to set progress bar in connection with the subtasks
 * 
 * @param {*} element 
 * @param {*} progressBarId 
 */
function progressBar(element, progressBarId) {
    let progressBar = document.getElementById(progressBarId);
    let subtaskNumber = element.subTaskCount;
    let amountSubtasks = element.subtasks.length;
    let percent = subtaskNumber / amountSubtasks;
    percent = Math.round(percent * 100);

    progressBar.style.width = `${percent}%`;
} 