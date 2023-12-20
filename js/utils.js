// login / sign up
let users = [];

// summary
let summary = [{
    tasks: 5,
    toDo: 1,
    done: 1,
    tasksProgress: 1,
    feedback: 4,
    urgent: 3,
    deadline: '19/07/2023'
}];

// add task
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

// contacts
let bgColors = ['orange', 'vio', 'blue', 'pink', 'yell', 'azur', 'deep', 'tango'];

//board
let currentDraggedElement;
let subtaskStatus = {};

let contacts = [
    {
        'id': '1',//16216771
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


// board
let tasks = [
    {
        'id': 1,
        'subTaskCount': 0,
        'category': 'user story',
        'categoryIndex': 1,
        'sort': 'toDo',
        'categoryCol': 'blue',
        'title': 'Kochwelt Page & Recipe Recommender',
        'description': 'Build start page with recipe recommendation',
        'subtasks': ['Implement Recipe recommendation', 'Start Page Layout'],
        'employees': ['AM', 'AS', 'DE'],
        'contacts': ['Anton Mayer', 'Anja Schulz', 'David Eisenberg'],
        'contactsIndex': [1, 0, 4],
        'contactId': [1, 2, 4],
        'prio': 'Low',
        'date': '10/05/2023',
        'color': ['orange', 'azur', 'pink']
    },
    {
        'id': 2,
        'subTaskCount': 0,
        'category': 'technical task',
        'categoryIndex': 0,
        'sort': 'inProgress',
        'categoryCol': 'azur',
        'title': 'HTML Base Template Creation',
        'description': 'Create reusable HTML base templates',
        'subtasks': ['Make responsive', 'Problems on screen size 960px', 'Problems with header'],
        'employees': ['EM', 'MB', 'TW'],
        'contacts': ['Emmanuel Mauer', 'Marcel Bauer', 'Tatjana Wolf'],
        'contactsIndex': [5, 7, 8],
        'contactId': [6, 7, 8],
        'prio': 'Medium',
        'date': '19/04/2023',
        'color': ['vio', 'deep', 'tango']
    },
    {
        'id': 3,
        'subTaskCount': 0,
        'category': 'technical task',
        'categoryIndex': 0,
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
        'date': '05/07/2023',
        'color': ['yell', 'azur', 'blue']
    },
    {
        'id': 4,
        'subTaskCount': 0,
        'category': 'user story',
        'categoryIndex': 1,
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
        'date': '04/10/2023',
        'color': ['orange', 'azur', 'pink']
    }
];