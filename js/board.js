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
            try {
                progressBar(element, progressBarId);
            } catch (error) {
            }
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
        subtasksHtml = `<div id="progress-${element['id']}" class="bar-distance">
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
            <div class="contact-icons-info ${task.color[index]}">${employee}</div>
            <div class="pop-task-description">${task.contacts[index]}</div>
        </div>
    `).join('');

    document.getElementById('task-employees').innerHTML = employeesHtml;

    const subtasksHtml = task.subtasks.map((subtask, index) => {
        const subtaskId = `${taskId}-${index}`;
        const subtaskCheck = subtaskStatus[subtaskId] ? 'check-icon' : 'uncheck-icon';

        return `
            <div class="hover">
                <div id="subtasks-${subtaskId}" class="${subtaskCheck} margin-l-s subtask pointer" onclick="checkIcon('${subtaskId}')">${subtask}</div>
            </div>`;
    }).join('');

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
*** function to render the tasks informations in edit mode
*/
function editTask(taskId) {
    changeStyles(taskId);
    // find the index of the task with the given ID
    const task = tasks.find(t => t.id === taskId);

    document.getElementById('title').value = `${task.title}`;
    document.getElementById('description').innerHTML = `${task.description}`;

    // check for prio value to trigger the right function
    switch (task.prio) {
        case 'Urgent':// reference to addTask.js
            SelectPrioBtn('urgentBtn', 'urgent-color', 'Urgent', 'prioUrgent.svg');
            break;
        case 'Medium':
            SelectPrioBtn('mediumBtn', 'medium-color', 'Medium', 'prioMedium.svg');
            break;
        case 'Low':
            SelectPrioBtn('lowBtn', 'low-color', 'Low', 'prioLow.svg');
            break;
        default: //fallback
            break;
    }
    // loop trough contactsIndex for actual tasks
    for (const contactIndex of task.contactsIndex) {
        selectContact(contactIndex); // reference to addTask.js
    }
}


/*
*** function for edit a spcific task
*/
function changeStyles(taskId) {
    closeModal('task-info-modal','task-pop-up');
    showModal('add-task-board','addTask-inner-modal');

    document.getElementById('edit-heading').classList.add('display-none');
    document.getElementById('close-btn-addTask').classList.add('display-none');
    document.getElementById('close-btn-addTask-edit').classList.remove('display-none');
    
    document.getElementById('addTask-inner-modal').classList.remove('add-task-modal-inner');
    document.getElementById('addTask-inner-modal').classList.add('add-task-modal-inner-edit');

    document.getElementById('flex-edit').classList.add('flex-column-start');
    document.getElementById('edit-section-l').classList.remove('left-section');
    document.getElementById('edit-section-r').classList.remove('right-section');
    document.getElementById('edit-section-l').classList.remove('flex-column-start');
    document.getElementById('edit-section-r').classList.remove('flex-column-start');
    document.getElementById('edit-section-l').classList.add('flex-column-start-edit');
    document.getElementById('edit-section-r').classList.add('flex-column-start-edit');

    document.getElementById('flex-btn-edits').classList.remove('btn-addTask');
    document.getElementById('addTask-clear').classList.add('display-none');
    document.getElementById('addTask-create').classList.add('display-none');
    document.getElementById('edits-save-btn').classList.remove('display-none');
    document.getElementById('edits-save-btn').innerHTML = 
    `<button type="submit" class="btn-login edits" onclick="saveTaskEdit(${taskId}),closeModal('add-task-board','addTask-inner-modal'),clearAndCloseTaskEditWithDelay()">Save<span class="icon-check-new"></span></button>`;
}


/*
*** function to reset the edits values
*/
function resetEdits(){
    document.getElementById('title').value = ``;
    document.getElementById('description').innerHTML = ``;
}


/*
*** function delay the styles reset, prevents a screen flicker and empty array
*/
function clearAndCloseTaskEditWithDelay() {
    setTimeout(function() {
        clearAndCloseTaskEdit();
        resetEdits();
    }, 600);

    selectedContacts = [];
}


/*
*** function for close and clear the edit mode
*/
function clearAndCloseTaskEdit() {
    document.getElementById('task-pop-up').style.setProperty('display', 'block');

    document.getElementById('edit-heading').classList.remove('display-none');
    document.getElementById('close-btn-addTask').classList.remove('display-none');
    document.getElementById('close-btn-addTask-edit').classList.add('display-none');

    document.getElementById('addTask-inner-modal').classList.add('add-task-modal-inner');
    document.getElementById('addTask-inner-modal').classList.remove('add-task-modal-inner-edit');

    document.getElementById('flex-edit').classList.remove('flex-column-start');
    document.getElementById('edit-section-l').classList.add('left-section');
    document.getElementById('edit-section-r').classList.add('right-section');
    document.getElementById('edit-section-l').classList.add('flex-column-start');
    document.getElementById('edit-section-r').classList.add('flex-column-start');
    document.getElementById('edit-section-l').classList.remove('flex-column-start-edit');
    document.getElementById('edit-section-r').classList.remove('flex-column-start-edit');

    document.getElementById('flex-btn-edits').classList.add('btn-addTask');
    document.getElementById('addTask-clear').classList.remove('display-none');
    document.getElementById('addTask-create').classList.remove('display-none');
    document.getElementById('edits-save-btn').classList.add('display-none');
}


/*
*** function save the edits on board
*/
function saveTaskEdit(taskId) {
    const taskToUpdate = tasks.find(t => t.id === taskId);

    if (taskToUpdate) {
        taskToUpdate.title = document.getElementById('title').value;
        taskToUpdate.description = document.getElementById('description').value;
        // Hier kannst du weitere Attribute aktualisieren, wenn nötig
    } else {
        console.error('Task not found'); // fallback
    }
    updateHTML();
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


/**
 * Function for search tasks
 */
function searchTask() {
    let input = document.getElementById('search-board');
    let search = input.value.trim().toLowerCase();

    let allTasks = document.querySelectorAll('.tasks-card');
    let matchingTasks = Array.from(allTasks).filter(task => {
        const taskTitle = task.querySelector('.task-card-title').innerText.toLowerCase();
        const taskDescription = task.querySelector('.task-card-note').innerText.toLowerCase();
        const taskCategory = task.querySelector('.task-card-heading').innerText.toLowerCase();
        const taskPrio = task.querySelector('img').getAttribute('src').toLowerCase();

        return (
            taskTitle.includes(search) ||
            taskDescription.includes(search) ||
            taskCategory.includes(search) ||
            taskPrio.includes(search)
        );
    });

    if (matchingTasks.length === 0) {
        allTasks.forEach(task => {
            task.style.display = 'none';
        });

    } else {
        allTasks.forEach(task => {
            task.style.display = matchingTasks.includes(task) ? 'block' : 'none';
        });
    }
}

