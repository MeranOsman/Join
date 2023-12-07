/**
 * Function for render all render functions
 */
async function initAddtask() {
    await includeHTML();
    await renderSubtask();
    await renderCategory();
    await renderContacts()
}


/**
 * If you press Enter in the input field, onsubmit is prevented and another function is called
 * 
 * @param {*} event 
 */
function pressEnter(callback, event) {
    if(event.keyCode === 13) {
        event.preventDefault();
        callback();
    }
}


/**
 * Function for render contacts and selected Contacts
 */
async function renderContacts() {
    let elements = document.getElementById('contactAll');
    elements.innerHTML = '';

    // Sortiere die Kontakte alphabetisch nach dem Vornamen
    const sortedContacts = contacts[0].firstName.map((firstName, index) => ({
        firstName,
        lastName: contacts[0].lastName[index],
        index,
    })).sort((a, b) => a.firstName.localeCompare(b.firstName));

    for (let i = 0; i < sortedContacts.length; i++) {
        const contact = sortedContacts[i];
        const initials = getInitials(contact.firstName, contact.lastName);
        const backgroundColorClass = getNextBackgroundColorClass();

        elements.innerHTML += /*html*/ `
            <li onclick="toggleFunction(${contact.index})" id="liContact${contact.index}">
                <div class="flex-center gap">
                    <span class="contacts-icon ${backgroundColorClass}">${initials}</span>
                    <span class="contacts">${contact.firstName} ${contact.lastName}</span>
                </div>
                <div id="contactCheckbox${contact.index}" class="icon-checkbox"></div>
            </li>
        `;

        await renderSelectedContacts();
    }
}




/**
 * Function for only render selected Contacts
 */
async function renderSelectedContacts() {
    let list = document.getElementById('selectedContacts');
    list.innerHTML = '';

    for (let i = 0; i < selectedContacts.length; i++) {
        list.innerHTML += `
        <span onclick="deleteSelectedContact(${i})" class="contacts-icon">${selectedContacts[i]}</span>
        `;
    }
}

/**
 * Toggle-function for add or delete contact
 * 
 * @param {*} i 
*/
function toggleFunction(i) {
    let list = document.getElementById(`liContact${i}`);

    if (!list.classList.contains('active-contact')) {
        selectContact(i);
    } else {
        deleteSelectedContact();
        activeContact(i);
    }
}




/**
 * Function for push selected contact to array
 * 
 * @param {*} i 
 */
function selectContact(i) {
    selectedContacts.push(contactss[i]);

    activeContact(i);
    renderSelectedContacts();
}


/**
 * Function for delete selected contact
 * 
 * @param {*} i 
 */
function deleteSelectedContact(i) {
    selectedContacts.splice(i, 1)

    renderSelectedContacts();
}


/**
 * Toggle-function to change the design when selecting a contact
 * 
 * @param {*} i 
 */
function activeContact(i) {
    let contact = document.getElementById(`contactCheckbox${i}`);
    let list = document.getElementById(`liContact${i}`);

    contact.classList.toggle('icon-checkbox-active');
    contact.classList.toggle('filter-invert');
    list.classList.toggle('active-contact');
}


/**
 * Filter function for contact list
 */
function searchContact() {
    let input = document.getElementById('inputSearch');
    let search = input.value.trim().toLowerCase();

    let elements = document.getElementById('contactAll');
    elements.innerHTML = '';

    for (let i = 0; i < contactss.length; i++) {
        if (contactss[i].toLocaleLowerCase().includes(search)) {
            elements.innerHTML += /*html*/ `
                <li onclick="activeContact(${i})" id="liContact${i}">
                    <div class="flex-center gap">
                        <span class="contacts-icon">AM</span>
                        <span class="contacts">${contactss[i]}</span>
                    </div>
                    <div id="contactCheckbox${i}" class="icon-checkbox"></div>
                </li>
                `;
        }
    }
}


/**
 * Function opens, closes dropdown menu contacts
 * 
 * @param {click} event - This is a cursor click
 */
function showCloseContacts(event) {
    document.getElementById('dropdownContact').classList.toggle('display-none');

    event.stopPropagation();
}


/**
 * Function for select only one prio and change design from prio-button
 * 
 * @param {*} btnId 
 * @param {*} newClass 
 */
function SelectPrioBtn(btnId, newClass) {
    let btn = document.getElementById(btnId);
    let urgentBtn = document.getElementById('urgentBtn');
    let mediumBtn = document.getElementById('mediumBtn');
    let lowBtn = document.getElementById('lowBtn');

    if (!urgentBtn.classList.contains('urgent-color') && !mediumBtn.classList.contains('medium-color') && !lowBtn.classList.contains('low-color')) {
        btn.classList.add(newClass);
    } else {
        btn.classList.remove(newClass);
    }
}


/**
 * Function for render categories
 */
async function renderCategory() {
    let elements = document.getElementById('categories');
    let input = document.getElementById('inputCategory');

    elements.innerHTML = '';
    input.value = '';

    for (let i = 0; i < category.length; i++) {
        elements.innerHTML += /*html*/ `
        <li>
            <span>${category[i]}</span>
            <div class="display-flex">
            <div class="edit-category">
                <img onclick="deleteCategory(event, ${i})" class="editDelete " src="img/delete.svg">
            </div>
                <div class="circle-blue"></div>
            </div>
        </li>
        `;
    }
}


/**
 * Function opens, closes dropdown menu category
 * 
 * @param {*} event 
 */
function showCloseCategory(event) {
    document.getElementById('dropdownCategory').classList.toggle('display-none');

    event.stopPropagation();
}


/**
 * Function cancel adding category
 */
function cancelCategory() {
    document.getElementById('inputCategory').value = '';
}


/**
 * Function push category to array
 * 
 * @returns 
 */
function addCategory() {
    let input = document.getElementById('inputCategory');

    if (input.value.trim() !== '') {
        category.push(input.value);
        renderCategory();
    }
}


/**
 * Function delete category
 */
function deleteCategory(event, i) {
    category.splice(i, 1);

    renderCategory();
    event.stopPropagation();
}


/**
 * Function for render subtasks
 */
async function renderSubtask() {
    let tasks = document.getElementById('subtasks');
    let input = document.getElementById('subtask');

    tasks.innerHTML = '';
    input.value = '';

    for (let i = 0; i < subtasks.length; i++) {
        tasks.innerHTML += /*html*/ `
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
}


/**
 * Function edit subtask
 * 
 * @param {*} i 
 */
function editSubtask(i) {
    document.getElementById(`listnumber${i}`).innerHTML = /*html*/ `
    <div>
        <input id="input-edit" class="input-edit" type="text" minlength="3">
        <div class="trash-checkmark">
            <img onclick="deleteSubtask(${i})" class="editDelete " src="img/delete.svg">
            <div class="line"></div>
            <img onclick="addChange(${i})" class="crossPlus" src="img/check-black.svg">
        </div>
    </div>        
    `;
}


/**
 * Function for add change subtask
 * 
 * @param {*} i 
 */
function addChange(i) {
    let input = document.getElementById('input-edit');

    if (input.value.trim() !== '') {
        subtasks.splice(i, 1, input.value);
        renderSubtask();
    }
}


/**
 * Function push subtask to array
 * 
 * @returns 
 */
function addSubtask() {
    let input = document.getElementById('subtask');

    if (input.value.trim() !== '') {
        subtasks.push(input.value);
        renderAddtask();
    }
}


/**
 * Function delete subtask
 * 
 * @param {*} i 
 */
function deleteSubtask(i) {
    subtasks.splice(i, 1);

    renderAddtask();
}


/**
 * Function change the input img from subtask
 *  
 */
function changeSubtaskImg() {
    document.getElementById('imgChange').innerHTML = /*html*/ `
    <div class="add-subtask">
        <img class="crossPlus" onclick="cancelSubtask()" src="img/cross.svg">
        <div class="line"></div>
        <img onclick="addSubtask()" class="crossPlus" src="img/check-black.svg">
    </div>
    `;
}


/**
 * Function cancel adding subtasks
 * 
 */
function cancelSubtask() {
    document.getElementById('imgChange').innerHTML = '<img onclick="changeSubtaskImg()" src="img/plusAddTask.svg" alt="plus-task">';
    document.getElementById('subtask').value = '';
}