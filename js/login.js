const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

function login() {
    let email = document.getElementById('mail');
    let password = document.getElementById('pass');
}


if(msg) {
    msgBox.innerHTML = msg;
} else {
    // display-none
}


/*
*** Function for changing the checkbox image on click
*** checked and unchecked image
*/
function checkboxImgChange(){
    document.getElementById('checkbox').classList.toggle('icon-checkbox-active');
}