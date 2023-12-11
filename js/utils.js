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
let contacts = [{
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

let bgColors = ['orange', 'vio', 'blue', 'pink', 'yell', 'azur', 'deep', 'tango'];

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

