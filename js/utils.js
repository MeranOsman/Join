// login / sign up
let users = [];
const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

// add task
let contactss = ['Anton Mayer', 'Anja Schulz', 'Benedikt Ziegler', 'David Eisenberg', 'Eva Fischer', 'Emmanuel Mauer', 'Marcel Bauer', 'Tatjana Wolf', 'Anton Mayer', 'Anton Mayer'];
let selectedContacts = ['AM', 'BZ'];
let subtasks = [];
let category = ['Technical Task', 'User Story'];