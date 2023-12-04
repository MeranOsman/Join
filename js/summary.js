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