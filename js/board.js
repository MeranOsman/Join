/**
 * Initiates rendering of various components.
 */
async function initBoard() {
    await includeHTML();
    await loadUsers();
    await loadTasks();
    await loadContacts();
    await loadCategory();
    await renderUserLetters();
    await updateHTML();
    await renderSubtask();
    await renderCategory();
    await renderContacts();
}


/**
 * Makes an HTML element movable by enabling drag-and-drop functionality.
 * 
 * @param {Event} ev - The event object.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Updates the HTML content for the categories 'toDo', 'inProgress', 'feedback', and 'done'.
 */
async function updateHTML() {
    updateCategory('toDo', 'toDo');
    updateCategory('inProgress', 'inProgress');
    updateCategory('feedback', 'feedback');
    updateCategory('done', 'done');
}


/**
 * Initiates dragging (Drag-and-Drop) of an element.
 * 
 * @param {string} id - Die ID des zu ziehenden Elements.
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * Truncates the text to the specified maximum length if necessary.
 * 
 * @param {string} taskDescription - The text to truncate.
 * @param {number} maxLength - Maximum length of the truncated text.
 * @returns {string} - The truncated text or the original text if it's not too long.
 */
function truncateText(taskDescription, maxLength) {
    return taskDescription.length > maxLength ? taskDescription.slice(0, maxLength) + '...' : taskDescription;
}


/**
 * Updates the sorting order of a task.
 * 
 * @param {number} sorting - The new sorting order of the task.
 */
function moveTo(sorting) {
    const index = tasks.indexOf(tasks.find(task => task.id === currentDraggedElement));
    if (index !== -1) {
        tasks[index]['sort'] = sorting;
        removeHighlight(sorting);
        noRotate(sorting);
        setItem('tasks', JSON.stringify(tasks)).then(() => updateHTML());
    }
}


/**
 * Checks and updates the status icon for a subtask.
 * 
 * @param {number} subtaskId - The ID of the subtask.
 */
function checkIcon(subtaskId) {
    const subtaskElement = document.getElementById(`subtasks-${subtaskId}`);
    subtaskElement.classList.toggle('check-icon');

    subtaskStatus[subtaskId] = !subtaskStatus[subtaskId];

    const [taskId] = subtaskId.split('-');
    const task = tasks.find(t => t.id === parseInt(taskId));

    if (subtaskElement.classList.contains('check-icon')) {
        task.subTaskCount += 1;
    } else {
        task.subTaskCount -= 1;
    }
}


/**
 * Deletes a task based on its ID.
 * 
 * @param {number} taskId - The ID of the task to be deleted.
 */
async function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        await setItem('tasks', JSON.stringify(tasks));
        updateHTML();
    } else {
        console.error('Task not found for deletion');
    }
}


/**
 * Edits a task based on the provided task ID.
 * 
 * @param {number} taskId - The ID of the task to be edited.
 */
function editTask(taskId) {
    changeStyles(taskId);

    const task = tasks.find(t => t.id === taskId);

    editTaskTitle(task);
    editTaskDescription(task);
    editTaskDate(task);
    editTaskPrio(task);
    editTaskContact(task);
    editTaskCategory(task);
    editTaskSubtasks(task);
}


/**
 * Edits the title of a task and updates the corresponding HTML element.
 * 
 * @param {object} task - The task to be edited.
 */
function editTaskTitle(task) {
    document.getElementById('title').value = task.title;
}


/**
 * Edits the description of a task and updates the corresponding HTML element.
 * 
 * @param {Object} task - The task to be edited.
 */
function editTaskDescription(task) {
    document.getElementById('description').innerHTML = task.description;
}


/**
 * Edits the date of a task and updates the corresponding HTML element.
 * 
 * @param {object} task - The task to be edited.
 */
function editTaskDate(task) {
    document.getElementById('date').value = task.date;
}


/**
 * Edits the priority of a task and adjusts the appearance accordingly.
 * 
 * @param {Object} task - The task to be edited.
 */
function editTaskPrio(task) {
    switch (task.prio) {
        case 'Urgent':
            SelectPrioBtn('urgentBtn', 'urgent-color', 'Urgent', 'prioUrgent.svg');
            break;
        case 'Medium':
            SelectPrioBtn('mediumBtn', 'medium-color', 'Medium', 'prioMedium.svg');
            break;
        case 'Low':
            SelectPrioBtn('lowBtn', 'low-color', 'Low', 'prioLow.svg');
            break;
    }
}


/**
 * Edits the contact information of a task.
 * 
 * @param {object} task - The task to be edited.
 */
function editTaskContact(task) {
    for (let i = 0; i < task.contactsIndex.length; i++) {
        const contactIndex = task.contactsIndex[i];
        const contactId = task.contactId[i];

        toggleFunction(contactIndex, contactId);
    }
}


/**
 * Edits the category of a task.
 * 
 * @param {object} task - The task to be edited.
 */
function editTaskCategory(task) {
    addSelectedCategory(task.categoryIndex);
}


/**
 * Appends subtasks of a task and renders them.
 * 
 * @param {Object} task - The task to be edited.
 */
function editTaskSubtasks(task) {
    subtasks.push(...task.subtasks);
    renderSubtask();
}


/**
 * Changes the appearance of the user interface for editing a task.
 * 
 * @param {string} taskId - The ID of the task to be edited.
 */
function changeStyles(taskId) {
    closeModal('task-info-modal', 'task-pop-up');
    showModal('add-task-board', 'addTask-inner-modal');
    changeStylesAdd();
    changeStylesRemove();

    document.getElementById('edit-heading').innerHTML = 'Edit Task';
    document.getElementById('addTask-inner-modal').style.backgroundColor = 'white';
    document.getElementById('edits-save-btn').innerHTML = `<button type="submit" class="btn-login edits">Save<span class="icon-check-new"></span></button>`;
    document.getElementById('addTaskForm').onsubmit = function (event) { saveEditTask(event, `${taskId}`); }
}


/**
 * Adds the style elements for the edit display.
 */
function changeStylesAdd() {
    document.getElementById('close-btn-addTask').classList.add('display-none');
    document.getElementById('addTask-inner-modal').classList.add('add-task-modal-inner-edit');
    document.getElementById('flex-edit').classList.add('flex-column-start');
    document.getElementById('edit-section-l').classList.add('flex-column-start-edit');
    document.getElementById('edit-section-r').classList.add('flex-column-start-edit');
    document.getElementById('addTask-clear').classList.add('display-none');
    document.getElementById('addTask-create').classList.add('display-none');
}


/**
 * Removes the style elements for the edit display.
 */
function changeStylesRemove() {
    document.getElementById('close-btn-addTask-edit').classList.remove('display-none');
    document.getElementById('addTask-inner-modal').classList.remove('add-task-modal-inner');
    document.getElementById('edit-section-l').classList.remove('left-section');
    document.getElementById('edit-section-r').classList.remove('right-section');
    document.getElementById('edit-section-l').classList.remove('flex-column-start');
    document.getElementById('edit-section-r').classList.remove('flex-column-start');
    document.getElementById('flex-btn-edits').classList.remove('btn-addTask');
    document.getElementById('edits-save-btn').classList.remove('display-none');
}


/**
 * Customizes the 'customizeAddtask' function to update the button and set a click handler for cancellation.
 */
function customizeAddtask(sort) {
    document.getElementById('addTask-clear').innerHTML = 'Cancel <span class="icon-cross"></span>';
    document.getElementById('addTask-clear').onclick = function () {
        closeModal('add-task-board', 'addTask-inner-modal'); initBoard(); resetEdits()
    };
    document.getElementById('addTaskForm').onsubmit = function (event) { createTask(event, sort); }
}


/**
 * Resets all edits and initializes the board anew.
 */
function resetEdits() {
    selectedContacts = [];
    priority = [];
    subtasks = [];
    selectedCategory = [];
    initBoard();
}


/**
 * Delays clearing and closing the task editor.
 */
function clearAndCloseTaskEditWithDelay() {
    setTimeout(function () {
        clearAndCloseTaskEdit();
        resetEdits();
    }, 600);
}


/**
 * Clears the input fields for task editing and closes the editing window.
 */
function clearAndCloseTaskEdit() {
    clearTaskEditAdd();
    clearTaskEditRemove();

    document.getElementById('task-pop-up').style.setProperty('display', 'block');
    document.getElementById('edit-heading').innerHTML = 'Add Task';
}


/**
 * Adds any additional CSS classes that are no longer required for task editing.
 */
function clearTaskEditAdd() {
    document.getElementById('close-btn-addTask-edit').classList.add('display-none');
    document.getElementById('addTask-inner-modal').classList.add('add-task-modal-inner');
    document.getElementById('edit-section-l').classList.add('left-section');
    document.getElementById('edit-section-r').classList.add('right-section');
    document.getElementById('edit-section-l').classList.add('flex-column-start');
    document.getElementById('edit-section-r').classList.add('flex-column-start');
    document.getElementById('flex-btn-edits').classList.add('btn-addTask');
    document.getElementById('edits-save-btn').classList.add('display-none');
}


/**
 * Removes any additionally added CSS classes that were required for task editing.
 */
function clearTaskEditRemove() {
    document.getElementById('close-btn-addTask').classList.remove('display-none');
    document.getElementById('addTask-inner-modal').classList.remove('add-task-modal-inner-edit');
    document.getElementById('flex-edit').classList.remove('flex-column-start');
    document.getElementById('edit-section-l').classList.remove('flex-column-start-edit');
    document.getElementById('edit-section-r').classList.remove('flex-column-start-edit');
    document.getElementById('addTask-clear').classList.remove('display-none');
    document.getElementById('addTask-create').classList.remove('display-none');

}


/**
 * Updates the progress bar based on the provided element information.
 * 
 * @param {Object} element - The element containing progress information.
 * @param {string} progressBarId - The ID of the progress bar HTML element.
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
 * Searches the task list for a search term and displays only matching tasks.
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


/**
 * Edits and saves an existing task.
 * 
 * @param {Event} event - The event object for the form.
 * @param {number} taskId - The ID of the task to be edited.
 */
async function saveEditTask(event, taskId) {
    event.preventDefault();

    let titelValue = document.getElementById('title').value.trim();
    let titel = titelValue.charAt(0).toUpperCase() + titelValue.slice(1);
    let descriptionValue = document.getElementById('description').value.trim();
    let description = descriptionValue.charAt(0).toUpperCase() + descriptionValue.slice(1);
    let dateValue = document.getElementById('date').value;
    let contactFullname = selectedContacts.map(contact => contact.fullName);
    let contactLetters = selectedContacts.map(contact => contact.nameLetters);
    let contactColor = selectedContacts.map(contact => contact.color);
    let contactIndex = selectedContacts.map(contact => contact.index);
    let contactId = selectedContacts.map(contact => contact.id);
    let taskIndex = tasks.findIndex(task => parseInt(task.id) === parseInt(taskId));
    let sort = tasks[taskIndex]['sort'];

    if (priority.length !== 0 && selectedCategory.length !== 0 && selectedContacts.length !== 0) {
        tasks[taskIndex] = {
            id: Number(taskId),
            sort: sort,
            title: titel,
            description: description,
            contacts: contactFullname,
            contactsIndex: contactIndex,
            contactId: contactId,
            employees: contactLetters,
            color: contactColor,
            date: dateValue,
            prio: priority[0]['prio'],
            category: selectedCategory[0]['name'],
            categoryIndex: selectedCategory[0]['index'],
            categoryCol: bgColors[selectedCategory[0]['numberColor']],
            subtasks: subtasks,
            subTaskCount: 0
        };
        await setItem('tasks', JSON.stringify(tasks));
        successEdit(taskId);
    } else if (priority.length === 0) {
        notSelectedPrio();
    } else if (selectedCategory.length === 0) {
        notSelectedCategory();
    } else if (selectedContacts.length === 0) {
        notSelectedContacts();
    }
}


/**
 * Successfully edits a task and updates the user interface feedback.
 * 
 * @param {number} taskId - The ID of the edited task.
 */
async function successEdit(taskId) {
    let success = document.getElementById('successAddtask');
    let successText = document.getElementById('successEdit');

    success.classList.remove('display-none');
    successText.innerHTML = 'Task edit successfully';
    await initBoard();
    closeModal('add-task-board', 'addTask-inner-modal');
    clearAndCloseTaskEditWithDelay();
    setTimeout(function () {
        taskInfo(Number(taskId));
        clearAndCloseTaskEdit();
        success.classList.add('display-none');
        successText.innerHTML = `Task added to Board <img src="img/board.svg">`;
    }, 2000);
}


/**
 * Loads the tasks from the API and parses it as JSON.
 */
async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch (error) {
        console.log('Aufgaben nicht gefunden');
    }
}