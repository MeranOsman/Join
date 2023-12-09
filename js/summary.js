async function initSummary() {
    await includeHTML();
    await loadUsers();
    await renderUserName();
    await renderUserLetters();
    await greeting();
}

/**
 * Function for render user name in summary-html
 */
async function renderUserName() {
    userName = document.getElementById('userName');
    userLetter = document.getElementById('userLetter');
  
    if(users[0]) {
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
    } else if(currentHour < 18) {
        greet.innerHTML = `Good day,`;
    } else {
        greet.innerHTML = `Good evening,`;
    }

    name.classList.add('opacity');
}