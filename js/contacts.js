/* ########################################################################################   GENERALS AND HELPS ### BLOCK */
/*
*** INITIALISATION
*/
async function initContacts() {
    await includeHTML();
    await loadUsers();
    await renderUserLetters();
    await renderContactList();
}


/*
*** function for show and hide dropdown menu on contact info via opacity
*/
function showDropdown(event) {
    var dropdown = document.getElementById('dropContacts');
    dropdown.classList.toggle('display-none');

    event.stopPropagation();
}


/*
*** function for change the text on contact modal
*/
function changeText(id1, id2) {
    document.getElementById(id1).innerHTML = 'Edit contact';
    document.getElementById(id2).innerHTML = '';
}


/*
*** function for change the text on contact modal
*/
function changeTextAddContact(id1, id2) {
    document.getElementById(id1).innerHTML = 'Add contact';
    document.getElementById(id2).innerHTML = 'Tasks are better with a team!';
}

/*
*** function for clear and close the inputs
*/
function closeAndClearModal() {
    closeModal('contacts-modal', 'modal-inner');
    document.getElementById('contacts-name').value = '';
    document.getElementById('contacts-mail').value = '';
    document.getElementById('contacts-phone').value = '';
}


/*
*** function for clear the inputs
*/
function clearModal() {
    document.getElementById('contacts-name').value = '';
    document.getElementById('contacts-mail').value = '';
    document.getElementById('contacts-phone').value = '';
}


/* ########################################################################################   RENDER CONTACT ### BLOCK */
/*
*** function for render contact list
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

        cList.innerHTML += `
            <div class="margin-t">
                <div class="flex-contacts-inner-li" tabindex="0" onclick="addZindex('addContact-btn'), removeHide('contacts-modal-info'), addHide('contacts-bg'), renderContactInfos(${i})">
                    <li><span class="contact-icons cap-text ${contact['color']}">${contact['firstName'].charAt(0)}${contact['lastName'].charAt(0)}</span></li>
                    <li class="upper-text">${contact['firstName']} ${contact['lastName']}<br><span class="contacts-links lower-text">${contact['email']}</span></li>
                </div>
            </div>
        `;
    }
}


/*
*** function for sorting the contacts by first names
*** create an object an sort the hole NameSet
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
            // If first names are equal, compare by last name
            const lastNameA = a['lastName'].toLowerCase();
            const lastNameB = b['lastName'].toLowerCase();

            return lastNameA.localeCompare(lastNameB);
        }
    });
}


/* ########################################################################################   INFO CONTACT ### BLOCK */
/*
*** function for render the contacts infos
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
    contactMail.innerHTML = `${contact['email']}`;
    contactPhone.innerHTML = `${contact['phone']}`;

    edit.innerHTML = `
            <div onclick="  showModal('contacts-modal','modal-inner'), addHide('add-btn'),
                            changeText('heading-contacts-modal','subline-contact-modal'),
                            removeHide('edit-btn'), removeHide('profile-contacts'),
                            editContact(${index})" class="icon-edit">Edit</div>`
    del.innerHTML = `<div class="icon-delete" onclick="deleteContact(${index})">Delete</div>`
    editDrop.innerHTML = `
                <div class="bg-color flex-center">
                    <div class="icon-edit text" onclick="showModal('contacts-modal','modal-inner'), addHide('add-btn'),
                                                        changeText('heading-contacts-modal','subline-contact-modal'),
                                                        removeHide('edit-btn'), removeHide('profile-contacts'),
                                                        editContact(${index})">Edit</div>
                </div>
                <div class="bg-color snd flex-center">
                    <div class="icon-delete text" onclick="deleteContact(${index})">Delete</div>
                </div>`
}


/*
*** function reset the color classes because of the classList.add
*/
function resetColor() {
    document.getElementById('initials-info').classList.remove('orange', 'vio', 'blue', 'pink', 'yell', 'azur', 'deep', 'tango');
}


/*
*** function to edit the contact
*/
function editContact(index) {
    let contact = contacts[index];
    document.getElementById('profile-contacts').innerHTML = `${contact['firstName'].charAt(0)}${contact['lastName'].charAt(0)}`;
    document.getElementById('profile-contacts').classList.add(`${contact['color']}`);
    document.getElementById('contacts-name').value = `${contact['firstName']} ${contact['lastName']}`;
    document.getElementById('contacts-mail').value = `${contact['email']}`;
    document.getElementById('contacts-phone').value = `${contact['phone']}`;


    let deleteContact = document.getElementById('del-btn');
    deleteContact.innerHTML = `<button type="button" class="btn-guest media show contacts" onclick="closeAndClearModal(),resetColorModal('profile-contacts'),deleteContact(${index})">Delete</button>`;

    let saveContact = document.getElementById('save-btn');
    saveContact.innerHTML = `<button type="submit" class="btn-login media" id="edit-save-btn" onclick="saveEdits(${index}),wait(wait),closeAndClearModal()">Save<span class="icon-check-new"></span></button>`;
}


/*
*** function for save the edits on contact
*/
function saveEdits(index) {
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

    renderContactList();
    renderContactInfos(index);
}


/*
*** function to delete the contact
*/
function deleteContact(index) {
    contacts.splice(index, 1);

    renderContactInfos(0);
    renderContactList();
}


/*
*** function to add a new contact
*/
function addContact() {
    let fullName = document.getElementById('contacts-name').value;
    let email = document.getElementById('contacts-mail').value;
    let phone = document.getElementById('contacts-phone').value;

    // split the name into first name and last name
    let nameParts = fullName.split(' ');
    let firstName = nameParts[0] || ''; // fallback in case no first name is provided
    let lastName = nameParts.slice(1).join(' ') || ''; // fallback in case no last name is provided

    // Choose a color based on the index in the array
    let colorIndex = contacts.length % bgColors.length;
    let color = bgColors[colorIndex];

    // generate a unique ID using the last three digits of the current timestamp
    let id = (new Date().getTime().toString().slice(-3));

    // add a new contact to the array
    let newContact = {
        'id': id,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phone,
        'color': color,
    };

    contacts.push(newContact);

    renderContactList();
    renderContactInfos(0);
    closeAndClearModal();
}