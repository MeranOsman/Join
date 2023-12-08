async function initSummary() {
    await includeHTML();
    await greeting();
    await loadUsers();
}


/**
 * Function changes greeting according to time
 */
async function greeting() {
    let greet = document.getElementById('greeting');
    const currentHour = new Date().getHours();
   
    if (currentHour < 12) {
        greet.innerHTML = `Good morning,`;
    } else if(currentHour < 18) {
        greet.innerHTML = `Good day,`;
    } else {
        greet.innerHTML = `Good evening,`;
    }
}