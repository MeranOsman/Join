/**
 * Initiates rendering of various components.
 */
async function initInfoPages() {
  await includeHTML();
  await loadUsers();
  await renderUserLetters();
}


/**
 * Loads HTML templates for elements with the attribute 'w3-include-html' and inserts them.
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
 * Displays or hides the menu.
 * 
 * @param {Event} event - The event that triggered the function.
 * @param {string} id - The ID of the container.
 */
function showMenu(event, id) {
  document.getElementById(id).classList.toggle('display-none');

  event.stopPropagation();
}


/**
 * Closes dropdown menus when the user clicks outside the menu area.
 */
document.addEventListener('click', function (event) {
  let menuIds = ['menuNav', 'dropdownContact', 'dropdownCategory', 'dropContacts'];

  for (let i = 0; i < tasks.length; i++) {
    menuIds.push(`moveTask-${tasks[i].id}`);
  }

  for (let i = 0; i < menuIds.length; i++) {
    let currentMenu = document.getElementById(menuIds[i]);

    if (currentMenu && !currentMenu.contains(event.target)) {
      currentMenu.classList.add('display-none');
    }
  }
});


/**
 * Renders the user letters on the page.
 */
async function renderUserLetters() {
  userLetter = document.getElementById('userLetter');
  userLetter.style.setProperty('color', 'var(--ci-blue)', 'important');


  if (users[0]) {
    userLetter.innerHTML = `${users[0]['nameLetters']}`;
  } else {
    userLetter.innerHTML = `G`;
  }
}