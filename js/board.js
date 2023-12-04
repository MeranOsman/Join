let tasks = [
    {
        title: 'Kochwelt Page & Recipe Recommender',
        description: 'Build start page with recipe recommendation.',
        assignedTo: ['Anton Mayer', 'Anja Schulz', 'David Eisenberg'],
        date: '10/05/2023',
        prio: 'medium',
        category: 'User Story',
        subtasks: ['Implement Recipe recommendation', 'Start Page Layout']
    }
];


async function initBoard() {
    await includeHTML();
}