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

let bgColors = ['orange', 'vio', 'blue', 'pink', 'yell', 'azur', 'deep', 'tango'];

// contacts
let contact = [{
    'firstName': ['Anton', 'Anja', 'Benedikt', 'David', 'Eva', 'Emmanuel', 'Marcel', 'Tatjana', 'Benjamin'],
    'lastName': ['Mayer', 'Schulz', 'Ziegler', 'Eisenberg', 'Fischer', 'Mauer', 'Bauer', 'Wolf', 'Bennewitz'],
    'email': ['antom@gmail.com', 'schulz@hotmail.com', 'benedikt@gmail.com', 'davidberg@gmail.com',
        'eva@gmail.com', 'mauer@web.de', 'bauer@live.com', 'wolfi@gmx.de', 'b.benneewitz@gmail.com'
    ],
    'phone': ['+49 0152 123 456 789', '+49 0156 123 456 789', '+49 0172 123 456 789', '+49 0156 123 456 789',
        '+49 0163 123 456 789', '+49 0152 123 456 789', '+49 0154 123 456 789', '+49 0157 123 456 789',
        '+49 01522 94 315 789'
    ],
    'color': ['orange', 'azur', 'blue', 'pink', 'yell', 'vio', 'deep', 'tango', 'tango']
}];

// contacts NEW
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



let tasks = [
    {
        'category'      : 'user story',
        'categoryCol'   : 'blue',
        'title'         : 'Kochwelt Page & Recipe Recommender',
        'description'   : 'Build start page with recipe recommendation',
        'subtasks'      : ['Implement Recipe recommendation', 'Start Page Layout'],
        'employees'     : ['AM', 'AS', 'DE'],
        'prio'          : 'low',
        'date'          : '10/05/2023',
        'color'         : ['orange','azur','pink']
    },
    {
        'category'      : 'technical task',
        'categoryCol'   : 'azur',
        'title'         : 'HTML Base Template Creation',
        'description'   : 'Create reusable HTML base templates',
        'subtasks'      : ['Make responsive', 'Problems on screen size 960px'],
        'employees'     : ['EM', 'MB', 'TW'],
        'prio'          : 'medium',
        'date'          : '19/07/2023',
        'color'         : ['vio','deep','tango']
    },
    {
        'category'      : 'technical task',
        'categoryCol'   : 'azur',
        'title'         : 'CSS Architecture Planning',
        'description'   : 'Define CSS naming conventions and Structure, reuse classes instead making new ones',
        'subtasks'      : ['Class documentation'],
        'employees'     : ['EF', 'AS', 'BZ'],
        'prio'          : 'urgent',
        'date'          : '05/08/2023',
        'color'         : ['yell','azur','blue']
    },
    {
        'category'      : 'user story',
        'categoryCol'   : 'blue',
        'title'         : 'Daily Kochwelt Recipe',
        'description'   : 'Implement daily recipe and portion calculator',
        'subtasks'      : ['Implement calculator','Check everthing','Relax'],
        'employees'     : ['AM', 'AS', 'DE'],
        'prio'          : 'urgent',
        'date'          : '05/08/2023',
        'color'         : ['orange','azur','pink']
    }
];

