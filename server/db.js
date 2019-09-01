require('dotenv').config();
const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;

const url = process.env.CONNECTION_URL;
const databaseName = process.env.DATABASE_NAME;
const collectionName = 'todos';

class DB {

    async connect () {
        if (this.client) {
            return new Promise((resolve) => resolve());
        }

        this.client = await MongoClient.connect(url,{ useNewUrlParser: true });
        this.db = await this.client.db(databaseName);

        return new Promise((resolve) => resolve());
    }

    /**
     * Get the collection, useful for executing non implemented commands
     * Only use this is you know what you are doing
     * @returns {Collection}
     * @private
     */
    _getCollection() {
        return this.db.collection(collectionName);
    }

    /**
     * Get all the todos
     * @param category optional category filter
     * @returns {Promise<*>}
     */
    async getTodos (category) {
        return new Promise((resolve) => {
            const collection = this.db.collection(collectionName);

            const findFilter = category ? { "category": { $eq: category } } : {};

            collection.find(findFilter).toArray((err, docs) => {
                resolve(docs);
            });
        });
    }

    /**
     * Get 1 todo
     * @param id
     * @returns {Promise<*>}
     */
    async getTodo (id) {
        return new Promise((resolve) => {
            const collection = this.db.collection(collectionName);

            const findFilter = { _id: new Mongo.ObjectId(id) };

            collection.findOne(findFilter).then((result) => {
                resolve(result);
            });
        });
    }

    /**
     * Insert 1 todo
     * @param todo
     * @returns {Promise<*>}
     */
    async insertTodo (todo) {
        return new Promise((resolve) => {
            const collection = this.db.collection(collectionName);
            collection.insertOne(todo).then((res) => {
                resolve(true);
            });
        });
    }

    /**
     * Update a single todo
     * @param id
     * @param newTodoData
     * @returns {Promise<*>}
     */
    async updateTodo(id, newTodoData) {
        return new Promise((resolve) => {
            const collection = this.db.collection(collectionName);

            // Just to be save we are not overwriting id's here
            const { _id, ...todoData } = {...newTodoData};

            const updateFilter = { _id: new Mongo.ObjectId(id) };
            const updateOptions = { $set: { ...todoData } };

            collection.updateOne(updateFilter, updateOptions).then((err, docs) => {
                resolve(true);
            });
        });
    }

    /**
     * Delete a single todo
     * @param id
     * @returns {Promise<*>}
     */
    async deleteTodo(id) {
        return new Promise((resolve) => {
            const collection = this.db.collection(collectionName);

            const deleteFilter = { _id: new Mongo.ObjectId(id) };

            collection.deleteOne(deleteFilter).then((res) => {
                resolve(true);
            });
        });
    }

    /**
     * Drop the entire collection and all of the todos
     * @returns {Promise<*>}
     */
    async clearTodos() {
        return new Promise((resolve) => {
            const collection = this.db.collection(collectionName);
            collection.drop().then((err, docs) => {
                resolve(true);
            });
        });
    }
}

module.exports = DB;