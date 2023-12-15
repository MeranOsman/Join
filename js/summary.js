async function initSummary() {
    await includeHTML();
    await loadUsers();
    await renderData();
    await renderUserName();
    await greeting();
}


/**
 * Function for render user name in summary-html
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
 * Function changes greeting according to time and add opacity
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
 * Function for render data in summary-tasks
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
    const earliestTask = findEarliestDate(tasks);

    tasksId.innerHTML = `${tasks.length}`;
    toDoId.innerHTML = `${toDoTasks.length}`;
    DoneId.innerHTML = `${doneTasks.length}`;
    feedbackId.innerHTML = `${feedbackTasks.length}`;
    progressId.innerHTML = `${progressTasks.length}`;
    urgentId.innerHTML = `${urgentTasks.length}`;
    dateId.innerHTML = `${earliestTask ? formatDate(earliestTask.date) : 'No date available'}`;
}


/**
 * Function to sort the dates by earliest
 * 
 * @param {*} tasks 
 * @returns 
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
 * Function converts a date string into javascript date object
 * 
 * @param {*} dateString 
 * @returns 
 */
function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
}


/**
 * Function to display the date in the desired format
 * 
 * @param {*} dateString 
 * @returns 
 */
function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const [day, month, year] = dateString.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-US', options);
    return formattedDate;
}