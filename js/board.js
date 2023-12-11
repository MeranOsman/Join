// let tasks = [
//     {
//         title: 'Kochwelt Page & Recipe Recommender',
//         description: 'Build start page with recipe recommendation.',
//         assignedTo: ['Anton Mayer', 'Anja Schulz', 'David Eisenberg'],
//         date: '10/05/2023',
//         prio: 'medium',
//         category: 'User Story',
//         subtasks: ['Implement Recipe recommendation', 'Start Page Layout']
//     }
// ];


async function initBoard() {
    await includeHTML();
    await loadUsers();
    await renderUserLetters();
    await renderTasks();
}

async function renderTasks() {
    let todos = document.getElementById('toDo');
    todos.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        todos.innerHTML += `
        <div class="tasks-card" onclick="showModal('task-info-modal','task-pop-up')">
            <p class="task-card-heading blue">${task.category}</p>
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
                    ${task.employees.map(employee => `<div class="contact-icons-task">${employee}</div>`).join('')}
                </div>
                <img src="img/prio${task.prio.charAt(0).toUpperCase() + task.prio.slice(1)}.svg" />
            </div>
        </div>
        `;
    }
}


