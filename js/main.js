/**
 * Function for include templates
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html");
      let resp = await fetch(file);
      if (resp.ok) {
        element.innerHTML = await resp.text();
      } else {
        element.innerHTML = 'Page not found';
      }
    }
  }


/**
 * Function to open, close menu and prevent an event
 */
function showMenu(event) {
    document.getElementById('menuNav').classList.toggle('display-none');

    event.stopPropagation();
}


/**
 * Function should hide dropdown menu when clicked elsewhere
 */
document.addEventListener('click', function(event) {
    let menuIds = ['menuNav', 'dropdownContact', 'dropdownCategory', 'dropContacts'];

    for (let i = 0; i < menuIds.length; i++) {
        let currentMenu = document.getElementById(menuIds[i]);

        if (currentMenu && !currentMenu.contains(event.target)) {
            currentMenu.classList.add('display-none');
        }
    }
});