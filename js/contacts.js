/**
 * Initiates rendering of various components.
 */
async function initContacts() {
    await loadContacts();
    await includeHTML();
    await loadUsers();
    await renderUserLetters();
    await renderContactList();
}


/**
 * Shows or hides the dropdown menu based on its current state.
 * 
 * @param {Event} event - The event that triggered this function.
 */
function showDropdown(event) {
    let dropdown = document.getElementById('dropContacts');
    dropdown.classList.toggle('display-none');

    event.stopPropagation();
}


/**
 * Changes the text content of HTML elements with the specified IDs.
 * 
 * @param {string} id1 - Die ID des ersten HTML-Elements.
 * @param {*} {string} id2 - Die ID des zweiten HTML-Elements.
 */
function changeText(id1, id2) {
    document.getElementById(id1).innerHTML = 'Edit Contact';
    document.getElementById(id2).innerHTML = '';
}


/**
 * Changes the text on a contact modal.
 * 
 * @param {string} id1 - The ID of the first HTML element.
 * @param {*} {string} id2 - The ID of the second HTML element.
 */
function changeTextAddContact(id1, id2) {
    document.getElementById(id1).innerHTML = 'Add contact';
    document.getElementById(id2).innerHTML = 'Tasks are better with a team!';
}


/**
 * Closes the modal and clears the input fields.
 */
function closeAndClearModal() {
    closeModal('contacts-modal', 'modal-inner');
    document.getElementById('contacts-name').value = '';
    document.getElementById('contacts-mail').value = '';
    document.getElementById('contacts-phone').value = '';
}


/**
 * Clears the input fields in the modal.
 */
function clearModal() {
    document.getElementById('contacts-name').value = '';
    document.getElementById('contacts-mail').value = '';
    document.getElementById('contacts-phone').value = '';
}


/**
 * Renders the sorted and grouped contact list on the web page.
 */
async function renderContactList() {
    let cList = document.getElementById('contacts-list');
    cList.innerHTML = '';

    let currentInitial = '';
    sortNames();
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let contactInitial = contact['firstName'].charAt(0).toUpperCase();

        if (contactInitial !== currentInitial) {
            currentInitial = contactInitial;
            cList.innerHTML += `<div class="margin-t"><span>${currentInitial}</span><div class="underline"></div></div>`;
        }
        cList.innerHTML += contactsInnerHtml(i, contact);
    }
}


/**
 * Generates the HTML content for an individual contact in the contact list.
 * 
 * @param {number} i - The index of the contact.
 * @param {Object} contact - The contact object containing information.
 * @returns {string} - The HTML content for the contact.
 */
function contactsInnerHtml(i, contact) {
    return `
    <div class="margin-t">
        <div class="flex-contacts-inner-li" tabindex="0" onclick="addZindex('addContact-btn'), removeHide('contacts-modal-info'), addHide('contacts-bg'), renderContactInfos(${i})">
            <li><span class="contact-icons cap-text ${contact['color']}">${contact['firstName'].charAt(0)}${contact['lastName'].charAt(0)}</span></li>
            <li class="upper-text">${contact['firstName']} ${contact['lastName']}<br><span class="contacts-links lower-text">${contact['email']}</span></li>
        </div>
    </div>
    `;
}


/**
 * Sorts contacts based on first and last names.
 */
function sortNames() {
    contacts.sort((a, b) => {
        const firstNameA = a['firstName'].toLowerCase();
        const firstNameB = b['firstName'].toLowerCase();

        if (firstNameA < firstNameB) {
            return -1;
        } else if (firstNameA > firstNameB) {
            return 1;
        } else {
            const lastNameA = a['lastName'].toLowerCase();
            const lastNameB = b['lastName'].toLowerCase();

            return lastNameA.localeCompare(lastNameB);
        }
    });
}


/**
 * Renders the contact information for a specific index.
 * 
 * @param {number} index - The index of the contact in the contacts list.
 */
function renderContactInfos(index) {
    resetColor();
    let contact = contacts[index];
    let contactInitials = document.getElementById('initials-info');
    let contactName = document.getElementById('names-info');
    let contactMail = document.getElementById('mail-info');
    let contactPhone = document.getElementById('phone-info');
    let edit = document.getElementById('contact-edit');
    let del = document.getElementById('contact-delete');
    let editDrop = document.getElementById('dropContacts');

    contactInitials.innerHTML = `${contact['firstName'].charAt(0)}${contact['lastName'].charAt(0)}`;
    contactInitials.classList.add(`${contact['color']}`);
    contactName.innerHTML = `${contact['firstName']} ${contact['lastName']}`;
    contactMail.innerHTML = `<a href="mailto:${contact['email']}">${contact['email']}</a>`;
    contactPhone.innerHTML = `<a href="tel:${contact['phone']}">${contact['phone']}</a>`;

    edit.innerHTML = innerHtmlContactEdit(index)
    del.innerHTML = `<div class="icon-delete" onclick="deleteContact(${index})">Delete</div>`
    editDrop.innerHTML = innerHtmlContactEditDrop(index);
}


/**
 * Generates the HTML code for the "Edit" link in the contact information.
 * 
 * @param {number} index - The index of the contact in the contacts list.
 * @returns {string} - The generated HTML code.
 */
function innerHtmlContactEdit(index) {
    return `
    <div onclick="  showModal('contacts-modal','modal-inner'), addHide('add-btn'),
                    changeText('heading-contacts-modal','subline-contact-modal'),
                    removeHide('edit-btn'), removeHide('profile-contacts'),
                    editContact(${index})" class="icon-edit">Edit</div>`;
}


/**
 * Generates the HTML code for the "Edit" and "Delete" dropdown in the contact editing view.
 * 
 * @param {number} index - The index of the contact in the contacts list.
 * @returns {string} - The generated HTML code for the dropdown menu.
 */
function innerHtmlContactEditDrop(index) {
    return `
    <div class="bg-color flex-center">
        <div class="icon-edit text" onclick="showModal('contacts-modal','modal-inner'), addHide('add-btn'),
                                            changeText('heading-contacts-modal','subline-contact-modal'),
                                            removeHide('edit-btn'), removeHide('profile-contacts'),
                                            editContact(${index})">Edit</div>
    </div>
    <div class="bg-color snd flex-center">
        <div class="icon-delete text" onclick="deleteContact(${index}); addHide('dropContacts')">Delete</div>
    </div>`;
}


/**
 * Resets the colors of the 'initials-info' class by removing all color classes.
 */
function resetColor() {
    document.getElementById('initials-info').classList.remove('orange', 'vio', 'blue', 'pink', 'yell', 'azur', 'deep', 'tango');
}


/**
 * Edits a contact based on the specified index.
 * 
 * @param {number} index - The index of the contact to be edited.
 */
function editContact(index) {
    let contact = contacts[index];
    editContactChange(contact);

    let deleteContact = document.getElementById('del-btn');
    let saveContact = document.getElementById('save-btn');

    deleteContact.innerHTML = `<button type="button" class="btn-guest media show contacts" onclick="closeAndClearModal(),resetColorModal('profile-contacts'),deleteContact(${index})">Delete</button>`;
    saveContact.innerHTML = `<button type="submit" class="btn-login media" id="edit-save-btn" onclick="saveEdits(${index}), closeAndClearModal()">Save<span class="icon-check-new"></span></button>`;
}


/**
 * Edits the contact information and updates the user profile.
 * 
 * @param {Object} contact - Der Kontakt, der bearbeitet werden soll.
 */
function editContactChange(contact) {
    document.getElementById('profile-contacts').innerHTML = `${contact['firstName'].charAt(0)}${contact['lastName'].charAt(0)}`;
    document.getElementById('profile-contacts').classList.add(`${contact['color']}`);
    document.getElementById('contacts-name').value = `${contact['firstName']} ${contact['lastName']}`;
    document.getElementById('contacts-mail').value = `${contact['email']}`;
    document.getElementById('contacts-phone').value = `${contact['phone']}`;
    document.getElementById('contactLogo').style.display = `none`;
}


/**
 * Saves edits to a contact.
 * 
 * @param {number} index - The index of the contact to be edited.
 */
async function saveEdits(index) {
    let inputName = document.getElementById('contacts-name');
    let inputMail = document.getElementById('contacts-mail');
    let inputPhone = document.getElementById('contacts-phone');

    let fullName = inputName.value.split(' ');
    let firstName = fullName[0] || '';
    let lastName = fullName.slice(1).join('') || '';

    let contact = contacts[index];

    contact['firstName'] = firstName;
    contact['lastName'] = lastName;
    contact['email'] = inputMail.value;
    contact['phone'] = inputPhone.value;

    await setItem('contacts', JSON.stringify(contacts));
    renderContactList();
    renderContactInfos(index);
}


/**
 * Deletes a contact from the list based on the specified index.
 * 
 * @param {number} index - The index of the contact to be deleted.
 */
async function deleteContact(index) {
    contacts.splice(index, 1);

    await setItem('contacts', JSON.stringify(contacts));
    renderContactInfos(0);
    renderContactList();
    window.location.href = 'contacts.html';
}


/**
 * Adds a new contact.
 */
async function addContact() {
    let fullName = document.getElementById('contacts-name').value;
    let email = document.getElementById('contacts-mail').value;
    let phone = document.getElementById('contacts-phone').value;

    let nameParts = fullName.split(' ');
    let firstName = nameParts[0] || '';
    let lastName = nameParts.slice(1).join(' ') || '';

    let colorIndex = contacts.length % bgColors.length;
    let color = bgColors[colorIndex];
    let id = (new Date().getTime().toString().slice(-3));

    let newContact = {
        'id': id,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phone,
        'color': color,
    };
    contacts.push(newContact);
    await setItem('contacts', JSON.stringify(contacts));
    renderContactList();
    closeAndClearModal();
    successAddContact(id);
}


/**
 * Displays success messages for adding contacts and hides them after 1.5 seconds.
 */
function successAddContact(id) {
    let containers = document.querySelectorAll('.success-container');

    containers.forEach(container => {
        container.classList.remove('display-none');
    });
    showAddedContact(id);
    setTimeout(function () {
        containers.forEach(container => {
            container.classList.add('display-none');
        });
    }, 1500);
}


/**
 * Displays the added contact information.
 * 
 * @param {number} id - The ID of the added contact.
 */
function showAddedContact(id) {
    let newId = contacts.findIndex(contact => contact.id === id);

    addZindex('addContact-btn');
    removeHide('contacts-modal-info');
    addHide('contacts-bg');
    renderContactInfos(newId);
}


/**
 * Loads the contacts from the API and parses it as JSON.
 */
async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (error) {
        console.log('Kontakte nicht gefunden');
    }
}