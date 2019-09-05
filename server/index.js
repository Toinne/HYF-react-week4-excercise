require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('./db');
const app = express();

// CONFIGURATION

// This connects to the mongo database
// Opens a long live connection until the process exits
// Use this connection in each handler
const dbClient = new Database();
const dbConnectMiddleware = (req, res, next) => {
    dbClient.connect().then(next);
};
app.use(dbConnectMiddleware);

// Parse json bodies
app.use(bodyParser.json());

// Allow requests from our frontend
const whitelist = [process.env.APP_ORIGIN];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};
app.use(cors(corsOptions));

// ROUTES

app.get('/', (req, res) => res.send('Hello this is the todo app api!'));

app.get('/todos', async (req, res) => {
    const todos = await dbClient.getTodos(req.query.category);
    res.json(todos);
});

app.get('/todos/:id', async (req, res) => {
    const todo = await dbClient.getTodo(req.params.id);
    res.json(todo);
});

app.post('/todos', async (req, res) => {
    await dbClient.insertTodo(req.body);
    const todos = await dbClient.getTodos(req.query.category);
    res.json(todos);
});

app.put('/todos/:id', async (req, res) => {
    dbClient.updateTodo(req.params.id, req.body);
    const todo = await dbClient.getTodo(req.params.id);
    res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    await dbClient.deleteTodo(req.params.id);
    const todos = await dbClient.getTodos(req.query.category);
    res.json(todos);
});

// INIT

const port = 3001;
app.listen(port, () => console.log(`Listing on ${port}!.`));