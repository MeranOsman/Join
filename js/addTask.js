/*###############################
###
###     JOIN APP 
###     version 1.0.0
###     author: unsere Namen
###
#################################*/

function showCloseContacts(event) {
    document.getElementById('dropdownContact').classList.toggle('display-none');
    
    event.stopPropagation();
}