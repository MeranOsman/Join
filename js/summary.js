/**
 * Initiates rendering of various components.
 */
async function initSummary() {
    await includeHTML();
    await loadUsers();
    await loadTasks();
    await renderData();
    await renderUserName();
    await greeting();
}


/**
 * Renders the user name and the first letter of the user name on the page.
 */
async function renderUserName() {
    userName = document.getElementById('userName');
    userLetter = document.getElementById('userLetter');

    userLetter.style.setProperty('color', 'var(--ci-blue)', 'important');

    if (users[0]) {
        userName.innerHTML = `${users[0]['name']}`;
        userLetter.innerHTML = `${users[0]['nameLetters']}`;
    } else {
        userName.innerHTML = `Guest`;
        userLetter.innerHTML = `G`;
    }
}


/**
 * Greeting function that displays an appropriate greeting based on the current time of day.
 */
async function greeting() {
    let name = document.getElementById('welcome');
    let greet = document.getElementById('greeting');
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        greet.innerHTML = `Good morning,`;
    } else if (currentHour < 18) {
        greet.innerHTML = `Good day,`;
    } else {
        greet.innerHTML = `Good evening,`;
    }

    name.classList.add('opacity');
}


/**
 * Renders the data on the interface by displaying the count of tasks in various categories.
 */
async function renderData() {
    let tasksId = document.getElementById('amountTasks');
    let toDoId = document.getElementById('amountDoDo');
    let DoneId = document.getElementById('amountDone');
    let feedbackId = document.getElementById('amountFeedback');
    let progressId = document.getElementById('amountProgress');
    let urgentId = document.getElementById('amountUrgent');
    let dateId = document.getElementById('urgentDate');
    let toDoTasks = tasks.filter(task => task.sort === 'toDo');
    let doneTasks = tasks.filter(task => task.sort === 'done');
    let feedbackTasks = tasks.filter(task => task.sort === 'feedback');
    let progressTasks = tasks.filter(task => task.sort === 'inProgress');
    let urgentTasks = tasks.filter(task => task.prio === 'Urgent');
    let earliestTask = findEarliestDate(tasks);

    tasksId.innerHTML = `${tasks.length}`;
    toDoId.innerHTML = `${toDoTasks.length}`;
    DoneId.innerHTML = `${doneTasks.length}`;
    feedbackId.innerHTML = `${feedbackTasks.length}`;
    progressId.innerHTML = `${progressTasks.length}`;
    urgentId.innerHTML = `${urgentTasks.length}`;
    dateId.innerHTML = `${earliestTask ? formatDate(earliestTask.date) : 'No date available'}`;
}


/**
 * Finds the earliest date in a list of tasks.
 * 
 * @param {Array} tasks - The list of tasks.
 * @returns {Object} - The task with the earliest date.
 */
function findEarliestDate(tasks) {
    tasks.sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateA.getTime() - dateB.getTime();
    });
    return tasks[0];
}


/**
 * Converts a date string into a JavaScript Date object.
 * 
 * @param {string} dateString - The date string in the "Day/Month/Year" format.
 * @returns {Date} - The JavaScript Date object.
 */
function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
}


/**
 * Displays the date in the desired format.
 * 
 * @param {Date} date - The date object to be formatted.
 * @returns {string} The formatted date in the desired format.
 */
function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const [day, month, year] = dateString.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-US', options);
    return formattedDate;
}