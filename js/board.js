/*
*** INITIALISATION
*/
async function initBoard() {
    await includeHTML();
    await loadUsers();
    await renderUserLetters();
    await renderTasks();
}


/*
*** function for rendering the tasks
*/
async function renderTasks() {
    let todos = document.getElementById('toDo');
    todos.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        todos.innerHTML += `
        <div class="tasks-card" draggable="true" onclick="showModal('task-info-modal','task-pop-up')">
            <p class="task-card-heading ${task.categoryCol}">${task.category}</p>
            <p class="task-card-title">${task.title}</p>
            <p class="task-card-note">${task.description}</p>
            <div class="flex-btw">
                <div class="flex-start-progress">
                    <div class="task-progress-bar-bg"></div>
                    <div class="task-progress-bar"></div>
                </div>
                <p class="task-progress-task">1/${task.subtasks.length} Subtasks</p>
            </div>
            <div class="flex-btw">
                <div class="flex-icons-task">
                    ${task.employees.map((employee, index) => `
                        <div class="contact-icons-task ${task.color[index]}${index > 0 ? ' margin-left-neg' : ''}">
                            ${employee}
                        </div>`
                    ).join('')}
                </div>
                <img src="img/prio${task.prio.charAt(0).toUpperCase() + task.prio.slice(1)}.svg" />
            </div>
        </div>
        `;
    }
    hideEmptyCard();
}


/*
*** function for display or display none ghost card
*** depending on content
*/
function hideEmptyCard() {
    let emptyCard = document.getElementById('empty-card');
    let toDoContainer = document.getElementById('toDo');

    if (toDoContainer.innerHTML.trim() !== '') {
        emptyCard.style.display = 'none';
    } else {
        emptyCard.style.display = 'block';
    }
}


/* ########################################################################################   DRAG n DROP ### BLOCK */
/*
*** function for make elements moveable
*/
function allowDrop(ev) {
    ev.preventDefault();
}