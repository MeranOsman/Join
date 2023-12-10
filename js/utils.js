// login / sign up
let users = [];

// add task
let selectedContacts = [];
let subtasks = [];
let category = ['Technical Task', 'User Story'];

// contacts
let contacts = [{
    'firstName':['Anton','Anja','Benedikt','David','Eva','Emmanuel','Marcel','Tatjana','Benjamin'],
    'lastName':['Mayer','Schulz','Ziegler','Eisenberg','Fischer','Mauer','Bauer','Wolf','Bennewitz'],
    'email':[   'antom@gmail.com','schulz@hotmail.com','benedikt@gmail.com','davidberg@gmail.com',
                'eva@gmail.com','mauer@web.de','bauer@live.com','wolfi@gmx.de','b.benneewitz@gmail.com'
            ],
    'phone':[   '+49 0152 123 456 789','+49 0156 123 456 789','+49 0172 123 456 789','+49 0156 123 456 789',
                '+49 0163 123 456 789','+49 0152 123 456 789','+49 0154 123 456 789','+49 0157 123 456 789',
                '+49 01522 94 315 789'
            ],
    'color':[   'orange','azur','blue','pink','yell','vio','deep','tango','tango']
}];

let bgColors = ['orange','vio','blue','pink','yell','azur','deep','tango'];

let letterHeading = [];

let currentColorIndex = 0;
