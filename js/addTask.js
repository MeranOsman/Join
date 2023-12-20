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

    sortNames();

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let contactId = contact['id'];

        elements.innerHTML += /*html*/ `
            <li onclick="toggleFunction(${i}, ${contactId})" id="liContact${i}">
                <div class="flex-center gap">
                    <span class="contacts-icon cap-text ${contact['color']}">${contact['firstName'].charAt(0)}${contact['lastName'].charAt(0)}</span>
                    <span class="contacts upper-text">${contact['firstName']} ${contact['lastName']}</span>
                </div>
                <div id="contactCheckbox${i}" class="icon-checkbox"></div>
            </li>
        `;
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
        <span onclick="deleteSelectedContact(${i})" class="contacts-icon ${selectedContacts[i]['color']}">${selectedContacts[i]['nameLetters']}</span>
        `;
    }
}


/**
 * Toggle-function for add or delete contact
 * 
 * @param {*} i 
*/
function toggleFunction(i, contactId) {
    let list = document.getElementById(`liContact${i}`);

    if (!list.classList.contains('active-contact')) {
        selectContact(i, contactId);
    } else {
        spliceSelectedContact(contactId);
        activeContact(i);
    }
}


/**
 * Function to remove contact from the dropdown
 * 
 * @param {*} contactId 
 */
function spliceSelectedContact(contactId) {
    const indexToRemove = selectedContacts.findIndex(contact => contact.id === contactId);

    if (indexToRemove !== -1) {
        selectedContacts.splice(indexToRemove, 1);
    }
    renderSelectedContacts();
}


/**
 * Function for changing selected contact in the dropdown
 * 
 * @param {*} contactId 
 */
function disableContact(contactId) {
    let indexToDisable = contacts.findIndex(contact => contact.id == contactId);
    let contact = document.getElementById(`contactCheckbox${indexToDisable}`);
    let list = document.getElementById(`liContact${indexToDisable}`);

    if (indexToDisable !== -1) {
        contact.classList.toggle('icon-checkbox-active');
        contact.classList.toggle('filter-invert');
        list.classList.toggle('active-contact');
    }

    renderSelectedContacts();
}


/**
 * Function for push selected contact to array
 * 
 * @param {*} i 
 */
function selectContact(i, contactId) {
    let firstNameLowercase = contacts[i]['firstName'];
    let firstName = firstNameLowercase.charAt(0).toUpperCase() + firstNameLowercase.slice(1);
    let lastNameLowercase = contacts[i]['lastName'];
    let lastName = lastNameLowercase.charAt(0).toUpperCase() + lastNameLowercase.slice(1);
    let color = contacts[i]['color'];
    let contactLabel = document.getElementById('contactLabel');
    let contactsContainer = document.getElementById('contactsContainer');

    selectedContacts.push({
        fullName: firstName + ' ' + lastName,
        nameLetters: firstName.charAt(0) + lastName.charAt(0),
        color: color,
        id: contactId,
        index: i
    });

    contactLabel.style.color = 'black';
    contactsContainer.style.border = '1px solid lightgray';
    activeContact(i);
    renderSelectedContacts();
}


/**
 * Function for delete selected contact
 * 
 * @param {*} i 
 */
function deleteSelectedContact(i) {
    let contactId = selectedContacts[i]['id'];

    selectedContacts.splice(i, 1);

    disableContact(contactId);
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
        let firstNameLowercase = contacts[i]['firstName'];
        let firstName = firstNameLowercase.charAt(0).toUpperCase() + firstNameLowercase.slice(1);
        let lastNameLowercase = contacts[i]['lastName'];
        let lastName = lastNameLowercase.charAt(0).toUpperCase() + lastNameLowercase.slice(1);
        let color = contacts[i]['color'];

        if (firstName.toLocaleLowerCase().includes(search) || lastName.toLocaleLowerCase().includes(search)) {
            let contact = contacts[i];
            let contactId = contact['id'];

            elements.innerHTML += /*html*/ `
                <li onclick="toggleFunction(${i}, ${contactId})" id="liContact${i}">
                    <div class="flex-center gap">
                        <span class="contacts-icon ${color}">${firstName.charAt(0)}${lastName.charAt(0)}</span>
                        <span class="contacts">${firstName} ${lastName}</span>
                    </div>
                    <div id="contactCheckbox${i}" class="icon-checkbox"></div>
                </li>
            `;
            activateFilterContact(contactId, i);
        }
    }
}


/**
 * Function to check if the ID are the same to mark the selected contacts
 * 
 * @param {*} contactId 
 * @param {*} i 
 */
function activateFilterContact(contactId, i) {
    let indexToDisable = selectedContacts.findIndex(selectedContact => selectedContact.id == contactId);

    if (indexToDisable !== -1) {
        activeContact(i);
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
    let requiredBtn = document.querySelectorAll('.requiredBtn');

    requiredBtn.forEach(function (btn) {
        btn.style.border = 'none';
    })
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
    let requiredCategory = document.getElementById('selectedColor');

    requiredCategory.style.border = '1px solid lightgray';
    categoryLabel.style.color = 'black';
    for (let i = 0; i < 8; i++) {
        background.classList.remove(`${bgColors[i]}`)
    }
    selectBox.innerHTML = `${category[i]['name']}`;
    background.classList.add(`${bgColors[number]}`);
    showCloseCategory();

    selectedCategory[0] = {
        name: category[i]['name'],
        numberColor: category[i]['numberColor'],
        index: i
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

    renderSubtask();
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


/**
 * Function for add new task
 * 
 * @param {*} event 
 */
function createTask(event) {
    event.preventDefault();

    let titelValue = document.getElementById('title').value.trim();
    let titel = titelValue.charAt(0).toUpperCase() + titelValue.slice(1);
    let descriptionValue = document.getElementById('description').value.trim();
    let description = descriptionValue.charAt(0).toUpperCase() + descriptionValue.slice(1);
    let dateValue = document.getElementById('date').value;
    let prio = document.getElementById('prio');
    let category = document.getElementById('category');
    let requiredText = document.getElementById('required');
    let requiredCategory = document.getElementById('selectedColor');
    let requiredBtn = document.querySelectorAll('.requiredBtn');
    let contactLabel = document.getElementById('contactLabel');
    let contactsContainer = document.getElementById('contactsContainer');
    let contactFullname = selectedContacts.map(contact => contact.fullName);
    let contactLetters = selectedContacts.map(contact => contact.nameLetters);
    let contactColor = selectedContacts.map(contact => contact.color);
    let contactIndex = selectedContacts.map(contact => contact.index);
    let contactId = selectedContacts.map(contact => contact.id);
    let success = document.getElementById('successAddtask');

    if (priority.length !== 0 && selectedCategory.length !== 0 && selectedContacts.length !== 0) {
        tasks.push({
            id: (new Date().getTime()),
            sort: 'toDo',
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

        success.classList.remove('display-none');
        setTimeout(function () {
            window.location.href = 'board.html';
        }, 3000);
    } else if (priority.length === 0) {
        prio.style.color = 'rgb(239, 136, 146)';
        requiredBtn.forEach(function (btn) {
            btn.style.border = '1px solid rgb(239, 136, 146)';
        })
        requiredText.style.color = 'rgb(239, 136, 146)'
    } else if (selectedCategory.length === 0) {
        category.style.color = 'rgb(239, 136, 146)';
        requiredText.style.color = 'rgb(239, 136, 146)'
        requiredCategory.style.border = '1px solid rgb(239, 136, 146)';
    } else if (selectedContacts.length === 0) {
        contactLabel.style.color = 'rgb(239, 136, 146)';
        contactsContainer.style.border = '1px solid rgb(239, 136, 146)';
        requiredText.style.color = 'rgb(239, 136, 146)';
    }
}