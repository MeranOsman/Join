let contacts = [{
    'firstName':['Anton','Anja','Benedikt','David','Eva','Emmanuel','Marcel','Tatjana'],
    'lastName':['Mayer','Schulz','Ziegler','Eisenberg','Fischer','Mauer','Bauer','Wolf'],
    'email':[   'antom@gmail.com','schulz@hotmail.com','benedikt@gmail.com','davidberg@gmail.com',
                'eva@gmail.com','mauer@web.de','bauer@live.com','wolfi@gmx.de'
            ],
    'phone':[   '+49 0152 123 456 789','+49 0156 123 456 789','+49 0172 123 456 789','+49 0156 123 456 789',
                '+49 0163 123 456 789','+49 0152 123 456 789','+49 0154 123 456 789','+49 0157 123 456 789'
            ]
}]
let bgColors = ['orange','vio','blue','pink','yell','azur','deep','tango'];
const alphabet = [  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
                ];
let letterHeading = [];


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
function renderContactList() {
    let cList = document.getElementById('contacts-list');
    cList.innerHTML = '';

    for (let i = 0; i < contacts[0].firstName.length; i++) { // FIRST iteration
        const currentHeader = getFirstLetter(contacts[0].firstName[i]);

        if (!letterHeading.includes(currentHeader)) { // only add header when unique
            cList.innerHTML += `<div class="margin-t"><span>${currentHeader}</span></div>`;
            letterHeading.push(currentHeader);
        }

        for (let j = 0; j < contacts.length; j++) { // SECOND iteration
            const contact = contacts[j];
            const initials = getInitials(contact['firstName'][i], contact['lastName'][i]);

            cList.innerHTML += `
                <ul class="margin-t">
                    <div class="underline"></div>
                    <div class="flex-contacts-inner-li" tabindex="0" onclick="addZindex('addContact-btn'), removeHide('contacts-modal-info'), addHide('contacts-bg')">
                        <li><span class="contact-icons ${bgColors[j]}">${initials}</span></li>
                        <li>${contact['firstName'][i]} ${contact['lastName'][i]}<br><span class="contacts-links">${contact['email'][i]}</span></li>
                    </div>
                </ul>  
            `;
        }
    }
}



