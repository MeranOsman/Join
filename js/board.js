/*
*** INITIALISATION
*/
async function initBoard() {
    await includeHTML();
    await loadUsers();
    await renderUserLetters();
    await updateHTML();
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

    // Check if there are no tasks in the category
    if (categoryTasks.length === 0) {
        // Create a no task container
        categoryContainer.innerHTML = '<div class="empty-card-container"><div id="empty-card" class="tasks-card-empty"><p>No tasks To do</p></div></div>';
    } else {
        // If there are tasks, clear the container and render the tasks
        categoryContainer.innerHTML = '';

        for (let index = 0; index < categoryTasks.length; index++) {
            const element = categoryTasks[index];
            categoryContainer.innerHTML += generateTodoHTML(element);
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
function generateTodoHTML(element) {
    return `<div class="tasks-card" draggable="true" ondragstart="startDragging(${element['id']})" onclick="showModal('task-info-modal','task-pop-up')">
                <p class="task-card-heading ${element.categoryCol}">${element.category}</p>
                <p class="task-card-title">${element.title}</p>
                <p class="task-card-note">${truncateText(element.description, 40)}</p>
                <div class="flex-btw">
                    <div class="flex-start-progress">
                        <div class="task-progress-bar-bg"></div>
                        <div class="task-progress-bar"></div>
                    </div>
                    <p class="task-progress-task">1/${element.subtasks.length} Subtasks</p>
                </div>
                <div class="flex-btw">
                    <div class="flex-icons-task">
                        ${element.employees.map((employee, index) => `
                            <div class="contact-icons-task ${element.color[index]}${index > 0 ? ' margin-left-neg' : ''}">
                                ${employee}
                            </div>`
                        ).join('')}
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
    tasks[currentDraggedElement-1]['sort'] = sorting;
    removeHighlight(sorting);
    noRotate(sorting);
    updateHTML();
}


/*
*** function to set and remove hover color on drag over
*/
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


/*
*** function to set and remove hover rotate on drag over
*/
function rotate(id){
    document.getElementById(id).classList.add('rotate');
}
function noRotate(id){
    document.getElementById(id).classList.remove('rotate');
}