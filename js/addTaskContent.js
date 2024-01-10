/**
 * Asynchronously renders contacts in the 'contactAll' element, clearing existing content,
 * sorting contacts by names, and appending generated HTML for each contact.
 * 
 */
async function renderContacts() {
    let elements = document.getElementById('contactAll');
    elements.innerHTML = '';

    sortNames();

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let contactId = contact['id'];
        elements.innerHTML += addTaskContactsInnerHtml(i, contact, contactId);
    }
}


/**
 * Asynchronously renders selected contacts.
 */
async function renderSelectedContacts() {
    let list = document.getElementById('selectedContacts');
    list.innerHTML = '';

    for (let i = 0; i < selectedContacts.length; i++) {
        list.innerHTML += `
        <span onclick="deleteSelectedContact(${i})" class="contacts-icon ${selectedContacts[i]['color']}">${selectedContacts[i]['nameLetters']}</span>
        `;
    }
}


/**
 * Renders the categories on the webpage by updating the HTML of the categories.
 */
async function renderCategory() {
    let elements = document.getElementById('categories');
    let input = document.getElementById('inputCategory');

    elements.innerHTML = '';
    input.value = '';

    for (let i = 0; i < category.length; i++) {
        let number = category[i]['numberColor'];

        elements.innerHTML += innerHtmlCategory(i, number);
    }
}


/**
 * Async function for rendering subtasks, clears the element and resets the input.
 */
async function renderSubtask() {
    let tasks = document.getElementById('subtasks');
    let input = document.getElementById('subtask');

    tasks.innerHTML = '';
    input.value = '';

    for (let i = 0; i < subtasks.length; i++) {
        tasks.innerHTML += innerHtmlSubtasks(i);
    }
}


/**
 * Creates a new task based on the entered information and saves it.
 * 
 * @param {Event} event - The event object that triggered the function call.
 */
async function createTask(event, sort) {
    event.preventDefault();

    let titelValue = document.getElementById('title').value.trim();
    let titel = titelValue.charAt(0).toUpperCase() + titelValue.slice(1);
    let descriptionValue = document.getElementById('description').value.trim();
    let description = descriptionValue.charAt(0).toUpperCase() + descriptionValue.slice(1);
    let dateValue = document.getElementById('date').value;
    let contactFullname = selectedContacts.map(contact => contact.fullName);
    let contactLetters = selectedContacts.map(contact => contact.nameLetters);
    let contactColor = selectedContacts.map(contact => contact.color);
    let contactIndex = selectedContacts.map(contact => contact.index);
    let contactId = selectedContacts.map(contact => contact.id);

    if (priority.length !== 0 && selectedCategory.length !== 0 && selectedContacts.length !== 0) {
        tasks.push({
            id: (new Date().getTime()),
            sort: sort,
            title: titel,
            description: description,
            contacts: contactFullname,
            contactsIndex: contactIndex,
            contactId: contactId,
            employees: contactLetters,
            color: contactColor,
            date: dateValue,
            prio: priority[0]['prio'],
            category: selectedCategory[0]['name'],
            categoryIndex: selectedCategory[0]['index'],
            categoryCol: bgColors[selectedCategory[0]['numberColor']],
            subtasks: subtasks,
            subTaskCount: 0
        })
        await setItem('tasks', JSON.stringify(tasks));
        successAddTask();
    } else if (priority.length === 0) {
        notSelectedPrio();
    } else if (selectedCategory.length === 0) {
        notSelectedCategory();
    } else if (selectedContacts.length === 0) {
        notSelectedContacts();
    }
}


/**
 * Function for generating HTML code for a contact.
 * 
 * @param {number} i - The index of the contact.
 * @param {Object} contact - The contact object.
 * @param {number} contactId - The unique ID of the contact.
 * @returns {string} The HTML code for the contact.
 */
function addTaskContactsInnerHtml(i, contact, contactId) {
    return /*html*/ `
    <li onclick="toggleFunction(${i}, ${contactId})" id="liContact${i}">
        <div class="flex-center gap">
            <span class="contacts-icon cap-text ${contact['color']}">${contact['firstName'].charAt(0)}${contact['lastName'].charAt(0)}</span>
            <span class="contacts upper-text">${contact['firstName']} ${contact['lastName']}</span>
        </div>
        <div id="contactCheckbox${i}" class="icon-checkbox"></div>
    </li>
    `;
}


/**
 * Generates the HTML code for a contact list element based on the provided parameters.
 * 
 * @param {number} i - The index of the contact in the contact list.
 * @param {number} contactId - The unique ID of the contact.
 * @param {string} color - The color code of the contact.
 * @param {string} firstName - The first name of the contact.
 * @param {string} lastName - The last name of the contact.
 * @returns {string} The generated HTML code for the contact list element.
 */
function searchInnerHtml(i, contactId, color, firstName, lastName) {
    return /*html*/ `
    <li onclick="toggleFunction(${i}, ${contactId})" id="liContact${i}">
        <div class="flex-center gap">
            <span class="contacts-icon ${color}">${firstName.charAt(0)}${lastName.charAt(0)}</span>
            <span class="contacts">${firstName} ${lastName}</span>
        </div>
        <div id="contactCheckbox${i}" class="icon-checkbox"></div>
    </li>
    `;
}


/**
 * Generates the HTML for a category and returns it.
 * 
 * @param {number} i - The index of the category in the array.
 * @param {number} number - The color number of the category.
 * @returns {string} The generated HTML for the category.
 */
function innerHtmlCategory(i, number) {
    return /*html*/ `
    <li onclick="addSelectedCategory(${i})">
        <span>${category[i]['name']}</span>
        <div class="display-flex">
            <div class="edit-category">
                <img onclick="deleteCategory(event, ${i})" class="editDelete " src="img/delete.svg">
            </div>
            <div class="render-circle ${bgColors[number]}"></div>
        </div>
    </li>
    `;
}


/**
 * Function to generate HTML code for a subtask.
 * 
 * @param {number} i - Index of the subtask.
 * @returns {string} - HTML code for the subtask.
 */
function innerHtmlSubtasks(i) {
    return /*html*/ `
    <li id="listnumber${i}">
        <span>${subtasks[i]}</span>
        <div class="edit-subtask">
            <img onclick="editSubtask(${i})" class="editDelete " onclick="" src="img/edit.svg">
            <div class="line"></div>
            <img onclick="deleteSubtask(${i})" class="editDelete " src="img/delete.svg">
        </div>
    </li>
    `;
}