let contactss = [];
let contactLetters = [];


/*
*** function for show and hide dropdown menu on contact info via opacity
*/
function showDropdown() {
    var dropdown = document.getElementById('dropdown-contacts');
    dropdown.classList.toggle('show-dropdown');
}


function addContact(name) {
    let nameParts = name.split(" ");
    let fullName = nameParts[0] + " " + nameParts[1];
    let letters = nameParts[0][0] + nameParts[1][0];
  
    contactss.push(fullName);
    contactLetters.push(letters);
  }