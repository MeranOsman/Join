/**
 * Initiates rendering of various components.
 */
async function initAddtask() {
    await includeHTML();
    await loadUsers();
    await loadContacts();
    await loadCategory();
    await renderUserLetters();
    await renderSubtask();
    await renderCategory();
    await renderContacts();
}


/**
 * Executes the provided callback function when the Enter key is pressed.
 * 
 * @param {Function} callback - The function to be executed when the Enter key is pressed.
 * @param {Event} event - The keyboard event object representing the key press.
 */
function pressEnter(callback, event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        callback();
    }
}


/**
 * Toggles between selected and unselected contact.
 * 
 * @param {number} i - Index of the contact.
 * @param {string} contactId - The unique ID of the contact.
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
 * Removes a selected contact based on the contact ID.
 * 
 * @param {number} contactId - The ID of the contact to be removed.
 */
function spliceSelectedContact(contactId) {
    const indexToRemove = selectedContacts.findIndex(contact => contact.id === contactId);

    if (indexToRemove !== -1) {
        selectedContacts.splice(indexToRemove, 1);
    }
    renderSelectedContacts();
}


/**
 * Disables a contact based on the provided contact ID.
 * 
 * @param {number} contactId - The ID of the contact to be disabled.
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
 * Selects a contact and adds it to the list of selected contacts.
 * 
 * @param {number} i - The index of the selected contact in the array.
 * @param {string} contactId - The unique ID of the selected contact.
 */
function selectContact(i, contactId) {
    let firstNameLowercase = contacts[i]['firstName'];
    let firstName = firstNameLowercase.charAt(0).toUpperCase() + firstNameLowercase.slice(1);
    let lastNameLowercase = contacts[i]['lastName'];
    let lastName = lastNameLowercase.charAt(0).toUpperCase() + lastNameLowercase.slice(1);
    let color = contacts[i]['color'];

    selectedContacts.push({
        fullName: firstName + ' ' + lastName,
        nameLetters: firstName.charAt(0) + lastName.charAt(0),
        color: color,
        id: contactId,
        index: i
    });

    changeContact(i);
}


/**
 * Changes the appearance of the contact area and updates the displayed contacts.
 * 
 * @param {number} i - The index of the selected contact.
 */
function changeContact(i) {
    let contactLabel = document.getElementById('contactLabel');
    let contactsContainer = document.getElementById('contactsContainer');

    contactLabel.style.color = 'black';
    contactsContainer.style.border = '1px solid lightgray';
    activeContact(i);
    renderSelectedContacts();
}


/**
 * Deletes the selected contact based on the index.
 * 
 * @param {number} i - The index of the selected contact.
 */
function deleteSelectedContact(i) {
    let contactId = selectedContacts[i]['id'];

    selectedContacts.splice(i, 1);

    disableContact(contactId);
    renderSelectedContacts();
}


/**
 * Activates/Deactivates a contact based on the index.
 * 
 * @param {number} i - The index of the contact.
 */
function activeContact(i) {
    let contact = document.getElementById(`contactCheckbox${i}`);
    let list = document.getElementById(`liContact${i}`);

    contact.classList.toggle('icon-checkbox-active');
    contact.classList.toggle('filter-invert');
    list.classList.toggle('active-contact');
}


/**
 * Searches the contact list for a specific contact based on the entered search term.
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

            elements.innerHTML += searchInnerHtml(i, contactId, color, firstName, lastName);
            activateFilterContact(contactId, i);
        }
    }
}


/**
 * Activates the filter for the contact with the specified ID and activates the contact at the specified position.
 * 
 * @param {number} contactId - The ID of the contact to be filtered.
 * @param {number} i - The position of the contact to be activated.
 */
function activateFilterContact(contactId, i) {
    let indexToDisable = selectedContacts.findIndex(selectedContact => selectedContact.id == contactId);

    if (indexToDisable !== -1) {
        activeContact(i);
    }
}


/**
 * Shows or hides the dropdown contact list based on the provided event.
 * 
 * @param {Event} event - The event that triggered the function call.
 */
function showCloseContacts(event) {
    document.getElementById('dropdownContact').classList.toggle('display-none');

    event.stopPropagation();
}


/**
 * Updates the appearance and priority of a button on click.
 * 
 * @param {string} btnId - The ID of the button.
 * @param {string} newClass - The new CSS class to be added.
 * @param {string} prio - The new priority of the button.
 * @param {string} imgName - The name of the image for the priority.
 */
function SelectPrioBtn(btnId, newClass, prio, imgName) {
    let btn = document.getElementById(btnId);

    changePrioBtn();

    btn.classList.add(newClass);
    priority[0] = {
        prio: prio,
        imgName: imgName
    };
}


/**
 * Modifies the appearance of priority buttons and the priority label.
 */
function changePrioBtn() {
    let requiredBtn = document.querySelectorAll('.requiredBtn');
    let urgentBtn = document.getElementById('urgentBtn');
    let mediumBtn = document.getElementById('mediumBtn');
    let lowBtn = document.getElementById('lowBtn');
    let prioLabel = document.getElementById('prio');

    requiredBtn.forEach(function (btn) {
        btn.style.border = 'none';
    });
    prioLabel.style.color = 'black';
    urgentBtn.classList.remove('urgent-color');
    mediumBtn.classList.remove('medium-color');
    lowBtn.classList.remove('low-color');
}


/**
 * Loads the category from the API and parses it as JSON.
 */
async function loadCategory() {
    try {
        category = JSON.parse(await getItem('category'));
    } catch (error) {
        console.log('Kategorie nicht gefunden');
    }
}


/**
 * Adds the selected category.
 * 
 * @param {number} i - The index of the selected category.
 */
function addSelectedCategory(i) {
    changeSelectedCategory(i);
    showCloseCategory();

    selectedCategory[0] = {
        name: category[i]['name'],
        numberColor: category[i]['numberColor'],
        index: i
    };
}


/**
 * Changes the selected category and updates its associated styling.
 * 
 * @param {number} i - The index of the selected category.
 */
function changeSelectedCategory(i) {
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
}


/**
 * Shows or hides the dropdown category based on the event.
 * 
 * @param {Event} event - The triggering event.
 */
function showCloseCategory(event) {
    document.getElementById('dropdownCategory').classList.toggle('display-none');
    try {
        event.stopPropagation();
    } catch (error) {

    }
}


/**
 * Sets the value of the element with the ID 'inputCategory' to an empty string.
 */
function cancelCategory() {
    document.getElementById('inputCategory').value = '';
}


/**
 * Selects the color with the specified ID and updates the visual state.
 * 
 * @param {string} id - The ID of the HTML element representing the color.
 * @param {number} number - The number of the selected color.
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
 * Pushes a new category with color number to the array.
 */
async function addCategory() {
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
            await setItem('category', JSON.stringify(category));
            colorBar.style.border = '1px solid lightgray';
            renderCategory();
        } else {
            colorBar.style.border = '1px solid red';
        }
    }
}


/**
 * Deletes the category at the specified position and updates the display.
 * 
 * @param {Event} event - The triggering event.
 * @param {number} i - The position of the category to be deleted.
 */
async function deleteCategory(event, i) {
    category.splice(i, 1);
    await setItem('category', JSON.stringify(category));

    renderCategory();
    event.stopPropagation();
}


/**
 * Edits a subtask by updating the HTML content.
 * 
 * @param {number} i - The index number of the subtask.
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

    subtaskValue(i);
}


/**
 * Sets the value of the editing input field to the value of the subtask with the specified index.
 * 
 * @param {number} i - The index of the subtask.
 */
function subtaskValue(i) {
    document.getElementById('input-edit').value = `${subtasks[i]}`;
}


/**
 * Modifies the element at the specified index in the subtasks array with the new value from the 'input-edit' element.
 * 
 * @param {number} i - The index of the subtask to be modified.
 */
function addChange(i) {
    let input = document.getElementById('input-edit');

    if (input.value.trim() !== '') {
        subtasks.splice(i, 1, input.value);
        renderSubtask();
    }
}


/**
 * Adds a subtask and then renders it.
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
 * Deletes a subtask from the array based on the index and renders the updated subtasks.
 * 
 * @param {number} i - The index of the subtask to be deleted.
 */
function deleteSubtask(i) {
    subtasks.splice(i, 1);

    renderSubtask();
}


/**
 * Changes the image for subtasks.
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
 * Cancels the process of adding subtasks by resetting the subtask image and clearing the subtask field.
 */
function cancelSubtask() {
    document.getElementById('imgChange').innerHTML = '<img onclick="changeSubtaskImg()" src="img/plusAddTask.svg" alt="plus-task">';
    document.getElementById('subtask').value = '';
}


/**
 * Displays success messages for adding a task and redirects to the 'board.html' page after 3 seconds.
 */
function successAddTask() {
    let containers = document.querySelectorAll('.success-container');

    containers.forEach(container => {
        container.classList.remove('display-none');
    });
    setTimeout(function () {
        window.location.href = 'board.html';
    }, 3000);
}


/**
 * This function is called when no priority is selected.
 */
function notSelectedPrio() {
    let requiredBtn = document.querySelectorAll('.requiredBtn');
    let prio = document.getElementById('prio');
    let requiredText = document.getElementById('required');

    prio.style.color = 'rgb(239, 136, 146)';
    requiredText.style.color = 'rgb(239, 136, 146)'
    requiredBtn.forEach(function (btn) {
        btn.style.border = '1px solid rgb(239, 136, 146)';
    })
}


/**
 * This function is called when no category is selected.
 */
function notSelectedCategory() {
    let requiredCategory = document.getElementById('selectedColor');
    let category = document.getElementById('category');
    let requiredText = document.getElementById('required');

    category.style.color = 'rgb(239, 136, 146)';
    requiredText.style.color = 'rgb(239, 136, 146)'
    requiredCategory.style.border = '1px solid rgb(239, 136, 146)';
}


/**
 * This function is called when no contact is selected.
 */
function notSelectedContacts() {
    let requiredText = document.getElementById('required');
    let contactLabel = document.getElementById('contactLabel');
    let contactsContainer = document.getElementById('contactsContainer');

    contactLabel.style.color = 'rgb(239, 136, 146)';
    contactsContainer.style.border = '1px solid rgb(239, 136, 146)';
    requiredText.style.color = 'rgb(239, 136, 146)';
}