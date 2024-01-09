/**
 * Sorts tasks based on the 'sort' value and renders them; displays a container for no tasks if none exist.
 * 
 * @param {string} categoryId - The ID of the HTML container for the category.
 * @param {string} categoryType - The type of the category used for filtering tasks.
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


/**
 * Renders tasks and their progress in the specified HTML element.
 * 
 * @param {Object} element - The task element containing task details.
 * @param {string} progressBarId - The ID of the progress bar element.
 * @returns {string} - The HTML representation of the rendered tasks.
 */
function renderTasks(element, progressBarId) {
    let subtasksHtml = '';

    if (element.subtasks.length > 0) {
        subtasksHtml = `<div id="progress-${element['id']}" class="bar-distance">
            <div class="flex-start-progress">
                <div class="task-progress-bar-bg"></div>
                <div id="${progressBarId}" class="task-progress-bar"></div>
            </div>
            <p class="task-progress-task">${element.subTaskCount}/${element.subtasks.length} Subtasks</p>
        </div>`;
    }

    return innerHtmlTasks(element, subtasksHtml);
}


/**
 * Generates the HTML representation of a task with optional subtasks.
 * 
 * @param {Object} element - The task element containing task details.
 * @param {string} subtasksHtml - The HTML representation of subtasks, if any.
 * @returns {string} - The HTML representation of the task.
 */
function innerHtmlTasks(element, subtasksHtml) {
    return `
    <div id="task-${element['id']}" onclick="taskInfo(${element['id']}), clearAndCloseTaskEdit()" class="tasks-card" draggable="true" ondragstart="startDragging(${element['id']})">
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


/**
 * Renders task information and displays it in a modal.
 * 
 * @param {number} taskId - The ID of the task to render information for.
 */
function taskInfo(taskId) {
    const task = tasks.find(t => t.id === taskId);

    contentTaskInfo(taskId, task);
    employeesHtml(task);
    subtasksHtml(taskId, task);
    showTaskInfoModal();
}


/**
 * Updates the display of task information in the modal.
 * 
 * @param {number} taskId - The unique identifier of the task.
 * @param {Object} task - The task object containing details.
 */
function contentTaskInfo(taskId, task) {
    const dateParts = task.date.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    document.getElementById('closeX').innerHTML = `<div onclick="closeModal('task-info-modal','task-pop-up'), updateHTML();" class="close-task-pop">X</div>`;
    document.getElementById('sorting').textContent = task.category;
    document.getElementById('sorting').classList = `task-pop-category ${task.categoryCol} upper-text margin-b-16`;
    document.getElementById('title-task').textContent = task.title;
    document.getElementById('description-task').textContent = task.description;
    document.getElementById('date-task').textContent = formattedDate;
    document.getElementById('prio-task').innerHTML = `${task.prio} <img class="prio-pop" src="img/prio${task.prio.charAt(0).toUpperCase() + task.prio.slice(1)}.svg" />`;
    document.getElementById('tasks-delete-btn').innerHTML = `<div onclick="deleteTask(${taskId}),closeModal('task-info-modal','task-pop-up')" class="flex-start gap-s links link-pop-del"><img src="img/delete.svg"><div class="subtask">Delete</div></div>`;
    document.getElementById('task-edit-btn').innerHTML = `<div onclick="editTask(${taskId})" class="flex-start gap-s links link-pop-edit"><img src="img/edit.svg" > <div class="subtask">Edit</div></div>`;
}


/**
 * Generates HTML elements for employee information and updates the content of a specific HTML container.
 * 
 * @param {Object} task - The task information.
 */
function employeesHtml(task) {
    const employeesHtml = task.employees.map((employee, index) => `
        <div class="flex-start">
            <div class="contact-icons-info ${task.color[index]}">${employee}</div>
            <div class="pop-task-description">${task.contacts[index]}</div>
        </div>
    `).join('');

    document.getElementById('task-employees').innerHTML = employeesHtml;
}


/**
 * Generates HTML for subtasks and updates the corresponding element in the document.
 * 
 * @param {number} taskId - The ID of the main task.
 * @param {Object} task - The task object containing subtasks.
 */
function subtasksHtml(taskId, task) {
    const subtasksHtml = task.subtasks.map((subtask, index) => {
        const subtaskId = `${taskId}-${index}`;
        const subtaskCheck = subtaskStatus[subtaskId] ? 'check-icon' : 'uncheck-icon';

        return `
            <div class="hover">
                <div id="subtasks-${subtaskId}" class="${subtaskCheck} margin-l-s subtask pointer" onclick="checkIcon('${subtaskId}')">${subtask}</div>
            </div>`;
    }).join('');

    document.getElementById('task-subtask').innerHTML = subtasksHtml;
}


/**
 * Displays the modal with task information.
 */
function showTaskInfoModal() {
    document.getElementById('task-info-modal').classList.remove('hide');
    document.getElementById('task-pop-up').style.setProperty('animation-direction', 'normal');
    document.body.style.overflow = 'hidden';
}