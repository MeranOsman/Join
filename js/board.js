/*
*** INITIALISATION
*/
async function initBoard() {
    await includeHTML();
    await loadUsers();
    await renderUserLetters();
    await renderTasks();
   updateHTML();
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
let currentDraggedElement;

function allowDrop(ev) {
    ev.preventDefault();
}

function updateHTML() {
    let toDo = tasks.filter(t => t['sort'] == 'To do');

    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element);
    }

    let inProgress = tasks.filter(t => t['sort'] == 'In Progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }

    let feedback = tasks.filter(t => t['sort'] == 'Await feedback');

    document.getElementById('feedback').innerHTML = '';

    for (let index = 0; index < feedback.length; index++) {
        const element = feedback[index];
        document.getElementById('feedback').innerHTML += generateTodoHTML(element);
    }

    let done = tasks.filter(t => t['sort'] == 'Done');

    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    return `  <div class="tasks-card" draggable="true" ondragstart="startDragging(${element['id']})" onclick="showModal('task-info-modal','task-pop-up')">
    <p class="task-card-heading ${element.categoryCol}">${element.category}</p>
    <p class="task-card-title">${element.title}</p>
    <p class="task-card-note">${element.description}</p>
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


function moveTo(sorting) {
    tasks[currentDraggedElement]['sort'] = sorting;
    updateHTML();
}