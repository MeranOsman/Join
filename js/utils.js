/**
 * Array for storing user data and other information.
 * 
 * @type {Array}
 */
let users = [];


/**
 * Array containing a summary with information about various tasks.
 * 
 * @type {Array}
 */
let summary = [{
    tasks: 5,
    toDo: 1,
    done: 1,
    tasksProgress: 1,
    feedback: 4,
    urgent: 3,
    deadline: '19/07/2023'
}];


/**
 * Arrays for the creation of a task.
 * 
 * @type {Array}
 */
let selectedContacts = [];
let subtasks = [];
let category = [{
    name: 'Technical Task',
    numberColor: 2
},
{
    name: 'User Story',
    numberColor: 5
}];
let selectedCategory = [];
let selectedColor = [];
let priority = [];


/**
 * Arrays for the created tasks.
 * 
 * @type {Array}
 */
let currentDraggedElement;
let subtaskStatus = {};
let tasks = [
    {
        'id': 1,
        'subTaskCount': 0,
        'category': 'user story',
        'categoryIndex': 0,
        'sort': 'toDo',
        'categoryCol': 'blue',
        'title': 'Kochwelt Page & Recipe Recommender',
        'description': 'Build start page with recipe recommendation',
        'subtasks': ['Implement Recipe', 'Start Page Layout'],
        'employees': ['AM', 'AS', 'DE'],
        'contacts': ['Anton Mayer', 'Anja Schulz', 'David Eisenberg'],
        'contactsIndex': [1, 0, 4],
        'contactId': [1, 2, 4],
        'prio': 'Low',
        'date': '2023-05-10',
        'color': ['orange', 'azur', 'pink']
    },
    {
        'id': 2,
        'subTaskCount': 0,
        'category': 'technical task',
        'categoryIndex': 1,
        'sort': 'inProgress',
        'categoryCol': 'azur',
        'title': 'HTML Base Template Creation',
        'description': 'Create reusable HTML base templates',
        'subtasks': ['Make responsive', 'Problems on size 960px', 'Problems with header'],
        'employees': ['EM', 'MB', 'TW'],
        'contacts': ['Emmanuel Mauer', 'Marcel Bauer', 'Tatjana Wolf'],
        'contactsIndex': [5, 7, 8],
        'contactId': [6, 7, 8],
        'prio': 'Medium',
        'date': '2023-04-19',
        'color': ['vio', 'deep', 'tango']
    },
    {
        'id': 3,
        'subTaskCount': 0,
        'category': 'technical task',
        'categoryIndex': 1,
        'sort': 'feedback',
        'categoryCol': 'azur',
        'title': 'CSS Architecture Planning',
        'description': 'Define CSS naming conventions and Structure, reuse classes instead making new ones',
        'subtasks': ['Class documentation'],
        'employees': ['EF', 'AS', 'BZ'],
        'contacts': ['Eva Fischer', 'Anja Schulz', 'Benedikt Ziegler'],
        'contactsIndex': [6, 0, 2],
        'contactId': [5, 2, 3],
        'prio': 'Urgent',
        'date': '2023-07-05',
        'color': ['yell', 'azur', 'blue']
    },
    {
        'id': 4,
        'subTaskCount': 0,
        'category': 'user story',
        'categoryIndex': 0,
        'sort': 'feedback',
        'categoryCol': 'blue',
        'title': 'Daily Kochwelt Recipe',
        'description': 'Implement daily recipe and portion calculator',
        'subtasks': [],
        'employees': ['AM', 'AS', 'DE'],
        'contacts': ['Anton Mayer', 'Anja Schulz', 'David Eisenebrg'],
        'contactsIndex': [1, 0, 4],
        'contactId': [1, 2, 4],
        'prio': 'Urgent',
        'date': '2023-10-04',
        'color': ['orange', 'azur', 'pink']
    }
];


/**
 * Arrays for contacts.
 * 
 * @type {Array}
 */
let bgColors = ['orange', 'vio', 'blue', 'pink', 'yell', 'azur', 'deep', 'tango'];
let contacts = [
    {
        'id': '1',
        'firstName': 'anton',
        'lastName': 'mayer',
        'email': 'antom@gmail.com',
        'phone': '+49 0152 123 456 789',
        'color': 'orange',
    },
    {
        'id': '2',
        'firstName': 'anja',
        'lastName': 'schulz',
        'email': 'schulz@hotmail.com',
        'phone': '+49 0156 123 456 789',
        'color': 'azur',
    },
    {
        'id': '3',
        'firstName': 'benedikt',
        'lastName': 'ziegler',
        'email': 'benedikt@gmail.com',
        'phone': '+49 0172 123 456 789',
        'color': 'blue',
    },
    {
        'id': '4',
        'firstName': 'david',
        'lastName': 'eisenberg',
        'email': 'davidberg@gmail.com',
        'phone': '+49 0156 123 456 789',
        'color': 'pink',
    },
    {
        'id': '5',
        'firstName': 'eva',
        'lastName': 'fischer',
        'email': 'eva@gmail.com',
        'phone': '+49 0163 123 456 789',
        'color': 'yell',
    },
    {
        'id': '6',
        'firstName': 'emmanuel',
        'lastName': 'mauer',
        'email': 'mauer@web.de',
        'phone': '+49 0152 123 456 789',
        'color': 'vio',
    },
    {
        'id': '7',
        'firstName': 'marcel',
        'lastName': 'bauer',
        'email': 'bauer@live.com',
        'phone': '+49 0154 123 456 789',
        'color': 'deep',
    },
    {
        'id': '8',
        'firstName': 'tatjana',
        'lastName': 'wolf',
        'email': 'wolfi@gmx.de',
        'phone': '+49 0157 123 456 789',
        'color': 'tango',
    },
    {
        'id': '9',
        'firstName': 'benjamin',
        'lastName': 'bennewitz',
        'email': 'ben@gmx.de',
        'phone': '+49 0151 333 456 656',
        'color': 'tango',
    }
];