/**
 * Function for render all render functions
 */
async function initAddtask() {
    await includeHTML();
    await loadUsers();
    await renderUserLetters();
    await renderSubtask();
    await renderCategory();
    await renderContacts();
}


/**
 * If you press Enter in the input field, onsubmit is prevented and another function is called
 * 
 * @param {*} event 
 */
function pressEnter(callback, event) {
    if (event.keyCode === 13) {
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
    selectedContacts.push(contacts[i]);

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

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].toLocaleLowerCase().includes(search)) {
            elements.innerHTML += /*html*/ `
                <li onclick="activeContact(${i})" id="liContact${i}">
                    <div class="flex-center gap">
                        <span class="contacts-icon">AM</span>
                        <span class="contacts">${contacts[i]}</span>
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
function SelectPrioBtn(btnId, newClass, prio, imgName) {
    let btn = document.getElementById(btnId);
    let urgentBtn = document.getElementById('urgentBtn');
    let mediumBtn = document.getElementById('mediumBtn');
    let lowBtn = document.getElementById('lowBtn');
    let prioLabel = document.getElementById('prio');

    prioLabel.style.color = 'black';
    urgentBtn.classList.remove('urgent-color');
    mediumBtn.classList.remove('medium-color');
    lowBtn.classList.remove('low-color');
    btn.classList.add(newClass);
    priority[0] = {
        prio: prio,
        imgName: imgName
    };
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
        let number = category[i]['numberColor'];

        elements.innerHTML += /*html*/ `
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
}


/**
 * Function push category and color-number in array, show selected category and color
 * 
 * @param {*} i 
 */
function addSelectedCategory(i) {
    let selectBox = document.getElementById('selectedCategory');
    let background = document.getElementById('selectedColor');
    let number = category[i]['numberColor'];
    let categoryLabel = document.getElementById('category');

    categoryLabel.style.color = 'black';
    for (let i = 0; i < 8; i++) {
        background.classList.remove(`${bgColors[i]}`)
    }
    selectBox.innerHTML = `${category[i]['name']}`;
    background.classList.add(`${bgColors[number]}`);
    showCloseCategory();

    selectedCategory[0] = {
        name: category[i]['name'],
        numberColor: category[i]['numberColor']
    };
}


/**
 * Function opens, closes dropdown menu category
 * 
 * @param {*} event 
 */
function showCloseCategory(event) {
    document.getElementById('dropdownCategory').classList.toggle('display-none');
    try {
        event.stopPropagation();
    } catch (error) {

    }
}


/**
 * Function cancel adding category
 */
function cancelCategory() {
    document.getElementById('inputCategory').value = '';
}


/**
 * Function change selected circle border and push color-number in the first position from array
 * 
 * @param {*} id 
 * @param {*} number 
 */
function selectColor(id, number) {
    let color = document.getElementById(id);

    for (let i = 0; i < 8; i++) {
        document.getElementById('color' + i).classList.remove('select-circle');
    }

    color.classList.add('select-circle');
    selectedColor[0] = number;
}


/**
 * Function push category with color-number to array
 * 
 * @returns 
 */
function addCategory() {
    let colorBar = document.getElementById('color-section');
    let inputId = document.getElementById('inputCategory');
    let inputParts = inputId.value.trim().split(' ');
    let input = inputParts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');

    if (inputId.value.trim() !== '') {
        if (selectedColor.length !== 0) {
            category.push({
                name: input,
                numberColor: selectedColor[0]
            });
            colorBar.style.border = '1px solid lightgray';
            renderCategory();
        } else {
            colorBar.style.border = '1px solid red';
        }
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
    let inputId = document.getElementById('subtask');
    let inputParts = inputId.value.trim().split(' ');
    let input = inputParts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');

    if (inputId.value.trim() !== '') {
        subtasks.push(input);
        renderSubtask();
    }
}


/**
 * Function delete subtask
 * 
 * @param {*} i 
 */
function deleteSubtask(i) {
    subtasks.splice(i, 1);

    initAddtask();
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


function createTask() {
    let titelValue = document.getElementById('title').value.trim();
    let titel = titelValue.charAt(0).toUpperCase() + titelValue.slice(1);
    let descriptionValue = document.getElementById('description').value.trim();
    let description = descriptionValue.charAt(0).toUpperCase() + descriptionValue.slice(1);
    let dateValue = document.getElementById('date').value;
    let subtaskValue = subtasks.join(', ');
    let prio = document.getElementById('prio');
    let category = document.getElementById('category');
    let requiredText = document.getElementById('required');

    if (priority.length !== 0 && selectedCategory.length !== 0) {
        alert(`
    Title: ${titel},
    Description: ${description},
    Date: ${dateValue},
    Prio: ${priority[0]['prio']},
    Category:${selectedCategory[0]['name']},
    CategoryColor: ${bgColors[selectedCategory[0]['numberColor']]},
    Subtasks: ${subtaskValue}
    `)

        location.reload();
    } else if (priority.length === 0) {
        prio.style.color = 'rgb(239, 136, 146)';
        requiredText.style.color ='rgb(239, 136, 146)'
    } else if (selectedCategory.length === 0) {
        category.style.color = 'rgb(239, 136, 146)';
        requiredText.style.color ='rgb(239, 136, 146)'
    }
}