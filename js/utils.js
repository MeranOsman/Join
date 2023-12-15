// login / sign up
let users = [];

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

let contacts = [
    {
        'id'        : '1',
        'firstName' : 'anton',
        'lastName'  : 'mayer',
        'email'     : 'antom@gmail.com',
        'phone'     : '+49 0152 123 456 789',
        'color'     : 'orange',
    },
    {
        'id'        : '2',
        'firstName' : 'anja',
        'lastName'  : 'schulz',
        'email'     : 'schulz@hotmail.com',
        'phone'     : '+49 0156 123 456 789',
        'color'     : 'azur',
    },
    {
        'id'        : '3',
        'firstName' : 'benedikt',
        'lastName'  : 'ziegler',
        'email'     : 'benedikt@gmail.com',
        'phone'     : '+49 0172 123 456 789',
        'color'     : 'blue',
    },
    {
        'id'        : '4',
        'firstName' : 'david',
        'lastName'  : 'eisenberg',
        'email'     : 'davidberg@gmail.com',
        'phone'     : '+49 0156 123 456 789',
        'color'     : 'pink',
    },
    {
        'id'        : '5',
        'firstName' : 'eva',
        'lastName'  : 'fischer',
        'email'     : 'eva@gmail.com',
        'phone'     : '+49 0163 123 456 789',
        'color'     : 'yell',
    },
    {
        'id'        : '6',
        'firstName' : 'emmanuel',
        'lastName'  : 'mauer',
        'email'     : 'mauer@web.de',
        'phone'     : '+49 0152 123 456 789',
        'color'     : 'vio',
    },
    {
        'id'        : '7',
        'firstName' : 'marcel',
        'lastName'  : 'bauer',
        'email'     : 'bauer@live.com',
        'phone'     : '+49 0154 123 456 789',
        'color'     : 'deep',
    },
    {
        'id'        : '8',
        'firstName' : 'tatjana',
        'lastName'  : 'wolf',
        'email'     : 'wolfi@gmx.de',
        'phone'     : '+49 0157 123 456 789',
        'color'     : 'tango',
    },
    {
        'id'        : '9',
        'firstName' : 'benjamin',
        'lastName'  : 'bennewitz',
        'email'     : 'ben@gmx.de',
        'phone'     : '+49 0151 333 456 656',
        'color'     : 'tango',
    },
];


// board
let tasks = [
    {
        'id'            : 1,
        'category'      : 'user story',
        'sort'          : 'toDo',
        'categoryCol'   : 'blue',
        'title'         : 'Kochwelt Page & Recipe Recommender',
        'description'   : 'Build start page with recipe recommendation',
        'subtasks'      : ['Implement Recipe recommendation', 'Start Page Layout'],
        'employees'     : ['AM', 'AS', 'DE'],
        'firstNames'    : ['Anton', 'Anja', 'David'],
        'lastNames'     : ['Mayer', 'Schulz', 'Eisenberg'],
        'prio'          : 'low',
        'date'          : '10/05/2023',
        'color'         : ['orange','azur','pink']
    },
    {
        'id'            : 2,
        'category'      : 'technical task',
        'sort'          : 'inProgress',
        'categoryCol'   : 'azur',
        'title'         : 'HTML Base Template Creation',
        'description'   : 'Create reusable HTML base templates',
        'subtasks'      : ['Make responsive', 'Problems on screen size 960px'],
        'employees'     : ['EM', 'MB', 'TW'],
        'firstNames'    : ['Emmanuel', 'Marcel', 'Tatjana'],
        'lastNames'     : ['Mauer', 'Bauer', 'Wolf'],
        'prio'          : 'medium',
        'date'          : '19/07/2023',
        'color'         : ['vio','deep','tango']
    },
    {
        'id'            : 3,
        'category'      : 'technical task',
        'sort'          : 'feedback',
        'categoryCol'   : 'azur',
        'title'         : 'CSS Architecture Planning',
        'description'   : 'Define CSS naming conventions and Structure, reuse classes instead making new ones',
        'subtasks'      : ['Class documentation'],
        'employees'     : ['EF', 'AS', 'BZ'],
        'firstNames'    : ['Eva', 'Anja', 'Benedikt'],
        'lastNames'     : ['Fischer', 'Schulz', 'Ziegler'],
        'prio'          : 'urgent',
        'date'          : '15/12/2023',
        'color'         : ['yell','azur','blue']
    },
    {
        'id'            : 4,
        'category'      : 'user story',
        'sort'          : 'feedback',
        'categoryCol'   : 'blue',
        'title'         : 'Daily Kochwelt Recipe',
        'description'   : 'Implement daily recipe and portion calculator',
        'subtasks'      : [],
        'employees'     : ['AM', 'AS', 'DE'],
        'firstNames'    : ['Anton', 'Anja', 'David'],
        'lastNames'     : ['Mayer', 'Schulz', 'Eisenebrg'],
        'prio'          : 'urgent',
        'date'          : '05/08/2023',
        'color'         : ['orange','azur','pink']
    }
];