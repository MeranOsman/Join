let contactss = [];
let contactLetters = [];


/*
*** function for show and hide dropdown menu on contact info via opacity
*/
function showDropdown() {
    var dropdown = document.getElementById('dropdown-contacts');
    dropdown.classList.toggle('show-dropdown');
}

function changeText(id1, id2){
    document.getElementById(id1).innerHTML = 'Edit contact';
    document.getElementById(id2).innerHTML = '';
}
