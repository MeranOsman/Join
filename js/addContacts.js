// kontakt aaray bei addtask.js schon vorhanden. dort später rausnehmen


/*
*** function for show and hide dropdown menu on contact info via opacity
*/
function showDropdown(event) {
    var dropdown = document.getElementById('dropdown-contacts');
    dropdown.classList.toggle('show-dropdown');

    event.stopPropagation();
}


function changeText(id1, id2){
    document.getElementById(id1).innerHTML = 'Edit contact';
    document.getElementById(id2).innerHTML = '';
}
