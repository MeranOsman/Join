/*###############################
###
###     JOIN APP 
###     version 1.0.0
###     author: unsere Namen
###
#################################*/

/**
 * Function opens, closes dropdown menu
 * @param {*} event 
 */
function showCloseContacts(event) {
    document.getElementById('dropdownContact').classList.toggle('display-none');

    event.stopPropagation();
}

/**
 * Function opens, closes dropdown menu and changes the arrow img
 * @param {*} event 
 */
function showCloseCategory(event) {
    let dropdownCategory = document.getElementById('dropdownCategory');
    dropdownCategory.classList.toggle('display-none');

    let arrowImage = document.getElementById('arrow');

    if (arrowImage.src.endsWith('arrow_drop_down.svg')) {
        arrowImage.src = 'img/arrow_drop_up.svg';
    } else {
        arrowImage.src = 'img/arrow_drop_down.svg';
    }

    event.stopPropagation();
}


function addSubtask() {
    document.getElementById('imgChange').innerHTML = /*html*/ `
    <div class="add-subtask">
        <img class="crossPlus" src="img/cross.svg">
        <div class="line"></div>
        <img class="crossPlus" src="img/cross.svg">
    </div>
    `;
}