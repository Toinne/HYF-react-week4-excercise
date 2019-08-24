const Database = require('./db');

const todos = [
    {
        description: 'Submit homework',
        category: 'work',
        done: false,
    },
    {
        description: 'Message teacher with homework url',
        category: 'work',
        done: false,
    },
    {
        description: 'Learn about react router',
        category: 'work',
        done: true,
    },
    {
        description: 'Learn about react router',
        category: 'work',
        done: true,
    },
    {
        description: 'Buy groceries',
        category: 'private',
        done: false,
    },
    {
        description: 'Do taxes',
        category: 'private',
        done: true,
    },
];

const dbClient = new Database();
dbClient
    .connect()
    .then(() => {
        dbClient.clearTodos();
    })
    .then(() => {
        const collection = dbClient._getCollection();
        collection.createIndex({ description: 'text', category: 'text' })
    })
    .then(() => {
        const promises = todos.map((todo) => dbClient.insertTodo(todo));
        return Promise.all(promises);
    })
    .then(() => {
        console.log('all done');
        process.exit();
    });
