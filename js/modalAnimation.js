/**
 * Displays a modal by removing 'hide' and activating animation.
 * 
 * @param {string} outer - ID of the outer element.
 * @param {string} inner - ID of the inner element.
 */
function showModal(outer, inner) {
    document.getElementById(outer).classList.remove('hide');
    document.getElementById(inner).style.setProperty('animation-direction', 'normal');
    document.body.style.overflow = 'hidden';
}


/**
 * Closes a modal window by applying the corresponding animations.
 * 
 * @param {string} outer - The outer container ID of the modal window.
 * @param {string} inner - The inner container ID of the modal window.
 */
function closeModal(outer, inner) {
    document.getElementById(inner).classList.add('move-to-right');
    document.getElementById(inner).style.setProperty('animation-direction', 'reverse');
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'hidden';
    setTimeout(function () { hideAgain(outer, inner); }, 250);
}


/**
 * Reverses the "move-to-left" animation by removing the corresponding CSS class.
 * 
 * @param {string} outer - The ID of the outer element.
 * @param {string} inner - The ID of the inner element.
 */
function hideAgain(outer, inner) {
    document.getElementById(outer).classList.add('hide');
    document.getElementById(inner).classList.remove('move-to-right');
    clearTimeout(hideAgain);
}


/**
 * Removes the 'hide' CSS class and sets the opacity to 1 for the element with the specified ID.
 * 
 * @param {string} remove - The ID of the element to be modified.
 */
function removeHide(remove) {
    document.getElementById(remove).style.setProperty('opacity', '1');
    document.getElementById(remove).classList.remove('hide');
}


/**
 * Hides an HTML element by adding the 'hide' CSS class and setting the opacity to 0.
 * 
 * @param {string} hide - The ID of the element to be hidden.
 */
function addHide(hide) {
    document.getElementById(hide).classList.add('hide');
    document.getElementById(hide).style.setProperty('opacity', '0');
}


/**
 * Sets the CSS "z-index" value of an element to "-1".
 * 
 * @param {string} add - The ID of the element whose "z-index" is to be changed.
 */
function addZindex(add) {
    document.getElementById(add).style.setProperty('z-index', '-1');
}


/**
 * Delays the display of an element by 250 milliseconds and then shows it.
 * 
 * @param {string} remove - The identifier of the element to be removed from the view.
 */
function wait(remove) {
    setTimeout(function () {
        removeHide(remove);
    }, 250);
    document.getElementById('contactLogo').style.display = 'inline';
}


/**
 * Resets the color classes of the modal.
 * 
 * @param {string} colorClass - The ID of the HTML element accessed through document.getElementById.
 */
function resetColorModal(colorClass) {
    document.getElementById(colorClass).classList.remove('orange', 'vio', 'blue', 'pink', 'yell', 'azur', 'deep', 'tango');
}


/**
 * Highlights an HTML element with the specified ID by adding the 'drag-area-highlight' CSS class.
 * 
 * @param {string} id - The ID of the HTML element to be highlighted.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


/**
 * Removes the highlighting from an HTML element with the specified ID by removing the 'drag-area-highlight' CSS class.
 * 
 * @param {string} id - The ID of the HTML element from which to remove the highlighting.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


/**
 * Rotates the element with the specified ID by adding the 'rotate' CSS class.
 * 
 * @param {string} id - The ID of the element to be rotated.
 */
function rotate(id) {
    document.getElementById(id).classList.add('rotate');
}


/**
 * Removes the 'rotate' CSS class from the element with the specified ID to undo the rotation.
 * 
 * @param {string} id - The ID of the element whose rotation should be undone.
 */
function noRotate(id) {
    document.getElementById(id).classList.remove('rotate');
}