/* ########################################################################################   GENERALS AND HELPS ### BLOCK */
/*
*** INITIALISATION
*/
async function initContacts() {
    await includeHTML();
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


/* ########################################################################################   RENDER CONTACT ### BLOCK */
/*
*** function for checking the first letter
*** return '#' as fallback value
*/
function getFirstLetter(firstName) {
    const firstLetter = firstName[0].toUpperCase();
    if (alphabet.includes(firstLetter)) {
        return firstLetter;
    }
    return '#';
}


/*
*** function for getting initials
*** return '#' as fallback value
*/
function getInitials(firstName, lastName) {
    const firstInitial = firstName[0] || '#';
    const lastInitial = lastName[0] || '#';

    return `${firstInitial.toUpperCase()}${lastInitial.toUpperCase()}`;
}

/*
*** function for render contact list
*** letterHeading array for save valid header values
*/
async function renderContactList() {
    let cList = document.getElementById('contacts-list');
    cList.innerHTML = '';

    const sortedContacts = sortContacts();

    for (const [header, contactsByHeader] of sortedContacts) {
        cList.innerHTML += `<div class="margin-t"><span>${header}</span><div class="underline"></div></div>`;

        for (const contact of contactsByHeader) {
            const initials = getInitials(contact.firstName, contact.lastName);
            const backgroundColorClass = getNextBackgroundColorClass();

            cList.innerHTML += `
                <div class="margin-t" onclick=" insertContactInfos('${initials}','${backgroundColorClass}','${contact.firstName}', '${contact.lastName}', '${contact.email}', '${contact.phone}')">
                    <div class="flex-contacts-inner-li" tabindex="0" onclick="addZindex('addContact-btn'), removeHide('contacts-modal-info'), addHide('contacts-bg')">
                        <li><span class="contact-icons ${backgroundColorClass}">${initials}</span></li>
                        <li class="upper-text">${contact.firstName} ${contact.lastName}<br><span class="contacts-links lower-text">${contact.email}</span></li>
                    </div>
                </div>  
            `;
        }
    }
}


/*
*** function for sorting contacts
*/
function sortContacts() {
    const sortedContacts = [];

    for (let i = 0; i < contacts[0].firstName.length; i++) {
        const currentHeader = getFirstLetter(contacts[0].firstName[i]);
        const contact = {
            firstName: contacts[0].firstName[i],
            lastName: contacts[0].lastName[i],
            email: contacts[0].email[i],
            phone: contacts[0].phone[i],
        };

        // find the index of the header in the sortedContacts array
        const headerIndex = sortedContacts.findIndex(entry => entry[0] === currentHeader);

        if (headerIndex === -1) {
            // if the header is not found, add a new entry with the header and an array containing the contact
            sortedContacts.push([currentHeader, [contact]]);
        } else {
            // if the header is found, push the contact to the existing array for that header
            sortedContacts[headerIndex][1].push(contact);
        }
    }

    // sort each group of contacts by last name
    sortedContacts.forEach(entry => entry[1].sort((a, b) => (a.lastName > b.lastName ? 1 : -1)));

    return sortedContacts;
}


/*
*** function for getting the color classes index
*** retunr the next available color class
*/
function getNextBackgroundColorClass() {
    const nextColorClass = bgColors[currentColorIndex];
    // updates the index
    currentColorIndex = (currentColorIndex + 1) % bgColors.length;

    return nextColorClass;
}


/* ########################################################################################   ADD NEW CONTACT ### BLOCK */
/*
*** function for getting inputs
*/
function getContactInputValues() {
    const fullName = document.getElementById('contacts-name').value;
    const email = document.getElementById('contacts-mail').value;
    const phone = document.getElementById('contacts-phone').value;

    return { fullName, email, phone };
}


/*
*** function for splitting the names in input
*/
function splitName(fullName) {
    const [firstName, lastName] = fullName.split(' ');
    return [firstName || '', lastName || ''];
}


/*
*** function for updating the contacts array
*/
function updateContactArrays(firstName, lastName, email, phone) {
    contacts[0].firstName.push(firstName);
    contacts[0].lastName.push(lastName);
    contacts[0].email.push(email);
    contacts[0].phone.push(phone);
}


/*
*** function for clear the inputs
*/
function closeAndClearModal() {
    closeModal('contacts-modal', 'modal-inner');
    document.getElementById('contacts-name').value = '';
    document.getElementById('contacts-mail').value = '';
    document.getElementById('contacts-phone').value = '';
}


/*
*** function for create the new contact
*/
function createContact() {
    const { fullName, email, phone } = getContactInputValues();
    const [firstName, lastName] = splitName(fullName);

    // Find the correct index to insert the new contact
    const insertIndex = findInsertIndex(firstName);

    // Insert the new contact at the correct position in the contacts array
    contacts[0].firstName.splice(insertIndex, 0, firstName);
    contacts[0].lastName.splice(insertIndex, 0, lastName);
    contacts[0].email.splice(insertIndex, 0, email);
    contacts[0].phone.splice(insertIndex, 0, phone);

    closeAndClearModal();
    renderContactList();
}


/* 
*** function for finding the correct index for inserting the new contact
*/
function findInsertIndex(firstName) {
    for (let i = 0; i < contacts[0].firstName.length; i++) {
        if (contacts[0].firstName[i].localeCompare(firstName) > 0) {
            return i;
        }
    }
    return contacts[0].firstName.length;
}


/* #############################################################################  INSERT CONTACTS DATAS IN INFO MODAL ### BLOCK */
/*
*** function to insert the contacts datas in info modal
*/
function insertContactInfos(initials, bgColors, firstName, lastName, email, phone){
    document.getElementById('initials-info').innerHTML = `${initials}`;
    document.getElementById('initials-info').classList.add (`${bgColors}`);
    document.getElementById('names-info').innerHTML = `${firstName} ${lastName}`;
    document.getElementById('mail-info').innerHTML = `${email}`;
    document.getElementById('phone-info').innerHTML = `${phone}`;
}