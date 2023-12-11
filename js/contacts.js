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
function changeText(id1, id2){
    document.getElementById(id1).innerHTML = 'Edit contact';
    document.getElementById(id2).innerHTML = '';
}


/*
*** function for change the text on contact modal
*/
function changeTextAddContact(id1, id2){
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
    cList.innerHTML='';
    let currentInitial = '';

    sortNames();

    for (let i = 0; i < contacts.length; i++) {
        for (let j = 0; j < contacts[i]['firstName'].length; j++) {
            let firstName = contacts[i]['firstName'][j];
            let lastName = contacts[i]['lastName'][j];
            let email = contacts[i]['email'][j];
            let color = contacts[i]['color'][j];

            // check if first letter was changed
            if (firstName.charAt(0).toUpperCase() !== currentInitial) {
                currentInitial = firstName.charAt(0).toUpperCase();

                cList.innerHTML += `<div class="margin-t"><span>${currentInitial}</span><div class="underline"></div></div>`;
            }
            cList.innerHTML += `
                <div class="margin-t">
                    <div class="flex-contacts-inner-li" tabindex="0" onclick="addZindex('addContact-btn'), removeHide('contacts-modal-info'), addHide('contacts-bg'), renderContactInfos(${j})">
                        <li><span class="contact-icons cap-text ${color}">${firstName.charAt(0)}${lastName.charAt(0)}</span></li>
                        <li class="upper-text">${firstName} ${lastName}<br><span class="contacts-links lower-text">${email}</span></li>
                    </div>
                </div>  
            `;
        }
    }
}


/*
*** function for sorting the contacts by first names
*** create an object an sort the hole NameSet
*/
function sortNames() {
    const sortedNameSet = contacts[0]['firstName']
        .map((value, index) => ({ value, index }))
        .sort((a, b) => a.value.localeCompare(b.value));

    for (let key in contacts[0]) {
        contacts[0][key] = sortedNameSet.map(item => contacts[0][key][item.index]);
    }
}


/* ########################################################################################   INFO CONTACT ### BLOCK */
/*
*** function for render the contacts infos
*/
function renderContactInfos(entryIndex) {
    resetColor();
    let contactInitials = document.getElementById('initials-info');
    let contactName = document.getElementById('names-info');
    let contactMail = document.getElementById('mail-info');
    let contactPhone = document.getElementById('phone-info');
    let edit = document.getElementById('contact-edit');
    let del = document.getElementById('contact-delete');
    let editDrop = document.getElementById('dropContacts');

    let firstName = contacts[0]['firstName'][entryIndex];
    let lastName = contacts[0]['lastName'][entryIndex];
    let email = contacts[0]['email'][entryIndex];
    let phone = contacts[0]['phone'][entryIndex];
    let color = contacts[0]['color'][entryIndex];

    contactInitials.innerHTML = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    contactInitials.classList.add(`${color}`);
    contactName.innerHTML = `${firstName} ${lastName}`;
    contactMail.innerHTML =`${email}`;
    contactPhone.innerHTML = `${phone}`;

    edit.innerHTML = `
            <div onclick="  showModal('contacts-modal','modal-inner'), addHide('add-btn'),
                            changeText('heading-contacts-modal','subline-contact-modal'),
                            removeHide('edit-btn'), removeHide('profile-contacts'),
                            editContact(${entryIndex})" class="icon-edit">Edit</div>`
    del.innerHTML = `<div class="icon-delete" onclick="deleteContact(${entryIndex})">Delete</div>`
    editDrop.innerHTML = `
                <div class="bg-color flex-center">
                    <div class="icon-edit text" onclick="showModal('contacts-modal','modal-inner'), addHide('add-btn'),
                                                        changeText('heading-contacts-modal','subline-contact-modal'),
                                                        removeHide('edit-btn'), removeHide('profile-contacts'),
                                                        editContact(${entryIndex})">Edit</div>
                </div>
                <div class="bg-color snd flex-center">
                    <div class="icon-delete text" onclick="deleteContact(${entryIndex})">Delete</div>
                </div>`
}


/*
*** function reset the color classes because of the classList.add
*/
function resetColor(){
    document.getElementById('initials-info').classList.remove ('orange','vio','blue','pink','yell','azur','deep','tango');
}


/*
*** function to edit the contact
*/
function editContact(entryIndex){
    
    let firstName = contacts[0]['firstName'][entryIndex];
    let lastName = contacts[0]['lastName'][entryIndex];
    let email = contacts[0]['email'][entryIndex];
    let phone = contacts[0]['phone'][entryIndex];
    let color = contacts[0]['color'][entryIndex];
   
    document.getElementById('profile-contacts').innerHTML = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    document.getElementById('profile-contacts').classList.add(`${color}`);
    document.getElementById('contacts-name').value = `${firstName} ${lastName}`;
    document.getElementById('contacts-mail').value = `${email}`;
    document.getElementById('contacts-phone').value = `${phone}`;

    
    let deleteContact = document.getElementById('del-btn');
    deleteContact.innerHTML = `<button type="button" class="btn-guest media show contacts" onclick="closeAndClearModal(),resetColorModal('profile-contacts'),deleteContact(${entryIndex})">Delete</button>`;

    let saveContact = document.getElementById('save-btn');
    saveContact.innerHTML = `<button type="submit" class="btn-login media" id="edit-save-btn" onclick="saveEdits(${entryIndex}),wait(wait),closeAndClearModal()">Save<span class="icon-check-new"></span></button>`;
}


/*
*** function for save the edits on contact
*/
function saveEdits(entryIndex) {
    let inputName = document.getElementById('contacts-name');
    let inputMail = document.getElementById('contacts-mail');
    let inputPhone = document.getElementById('contacts-phone');

    let firstName = inputName.value.split(' ');
    let lastName = firstName.slice(1).join('') || '';
    firstName = firstName[0] || '';

    let contact = contacts[0];

    contact['firstName'][entryIndex] = firstName;
    contact['lastName'][entryIndex] = lastName;
    contact['email'][entryIndex] = inputMail.value;
    contact['phone'][entryIndex] = inputPhone.value;

    renderContactList();
    renderContactInfos(entryIndex);
}


/*
*** function to delete the contact
*/
function deleteContact(entryIndex) {
    contacts[0]['firstName'].splice(entryIndex, 1);
    contacts[0]['lastName'].splice(entryIndex, 1);
    contacts[0]['email'].splice(entryIndex, 1);
    contacts[0]['phone'].splice(entryIndex, 1);
    contacts[0]['color'].splice(entryIndex, 1);

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

    let nameParts = fullName.split(' ');// split names after empty space

    // access the parts (first part is the first name, second part is the surname)
    let firstName = nameParts[0] || ''; // fallback
    let lastName = nameParts.slice(1).join(' ') || ''; //fallback

     // choose color from index
     let colorIndex = contacts[0].firstName.length % bgColors.length;
     let color = bgColors[colorIndex];

    contacts[0]['firstName'].push(firstName);
    contacts[0]['lastName'].push(lastName);
    contacts[0]['email'].push(email);
    contacts[0]['phone'].push(phone);
    contacts[0]['color'].push(color);

    renderContactList();
    renderContactInfos(0);
    closeAndClearModal();
}