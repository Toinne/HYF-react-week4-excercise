# Hack Your Future - React Week 4 - exercise

The goal of this exercise is to make a multipage todo app.
You are provided with a boilerplate, it is up to you to fill in the blanks.

## Setup

Project consist out 2 parts out of a `backend` and `frontend`.
-  `backend` can be found in the `server` directory
- `frontend` can be found in the `app` directory

Install dependencies for both with `npm`.

```
cd app
npm install
```

```
cd server
npm install
```

The `server` uses [nodemon](https://nodemon.io/) to run it's code. 
Nodemon allows for automatic restarting of the `node` process when changes occur. 
Install it globably with:
```
npm install -g nodemon
```

### Database configuration

The backend uses a [mongodb](https://www.mongodb.com/cloud) database. But the specific instance of this database is not configured.
You will need to configure a connection url for this database.

Obtain a connection url from the instructor or use your own if so desired.
Create a file name `.env` in the `server` directory.

Now add a new line to it. 

`CONNECTION_URL=<url_goes_here>`

Add a second line to it with as value your name (without any special characters or spaces).
This will be your personal database for this exercise.

`DATABASE_NAME=<your_name_goes_here>`

Now run `npm run init` from withing the `server` directory, to seed your database and test if the connection is working.

## Available Scripts

### Backend

#### `npm start`

Starts the backend server on [http://localhost:3001](http://localhost:3001).

### Frontend

There are more scripts as the frontend is initialized with [create-react-app](https://github.com/facebook/create-react-app) but for this exercise only the useful set is listed. 

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Runs the the api at [http://localhost:3001](http://localhost:3001).

The page will reload if you make edits and the server will restart.
You will also see any lint errors in the console.

### Exercise

1. Implement the resolve button

- Implement the `editTodo` in `api.js`. 
- On click call function
- If successful refresh the list by fetching it again and updating the `state`

2. In the navigation make sure the active page is indicated with a color.

- Check the documentation on how to do this https://reacttraining.com/react-router/web/guides/quick-start.

3. Split up the list by `category`

- Remove the overview `Route` and add 2 new routes to `/work` and to `/private`.
- Instead of component define a `render` property on the `Route`. 
- The `render` property should be implemented with a function that returns the `TodoList` 
- The `TodoList` should be returned with a prop `category`and the value being either `work` or `private` depending on the route.
- See https://reacttraining.com/react-router/web/api/Route/render-func for an example.
- In `TodoLisst` filter the todos that do not match the category.
    - In the `render` function, `this.state.todos` should be filtered with `.filter`
    - Keep the `todos` that match `this.props.category`

4. Implement the edit button

When the user clicks edit they are redirected to a page with a prefilled form where they can change the description.

- Add a function `onEditClick` in the `TodoList`
- Add a prop `onEditClick` to `<TodoItem />` in `TodoList` and set the value to `this.onEditClick`
- In `TodoList.onEditClick` set the id that is passed a first argument to the function to a state variable called `editingTodoId` with `this.setState`
- Import `Redirect` from `react-router-dom` in `TodoList.js`
- In the `render` method of `TodoList` add an `if (this.state.editingTodoId) { return <Redirect to={`/todos/${this.state.editingTodoId`} /> }`
- Copy the `TodoForm.js` to a file component called `EditForm.js`.
- Rename all occurrences of `TodoForm` to `EditForm` in `EditForm.js`
- Add a `Route` to `/todos/:id` in `TodoNavigation`, `EditForm` will be the `component` for this route.
- Implement the `getTodo` function in `api.js`
    - This should be a `GET` `fetch` to `/todos/:id`, `:id` needs to filled in by the argument of the function.
- In `componentDidMount` of `EditForm` you need to call the newly implemented `getTodo` with the `id` from the route.
    - make sure the you import the `Api` from `./api.js` in `EditForm.js`
    - Call the static function `getTodo` on `Api` with the `id` of the todo
    - Check the documentation on how to get the `id` from the route it is something `react-router-dom` supports https://reacttraining.com/react-router/web/example/url-params
    - Set the result of the call to a `state` variable called `todo` 
- Set the form input values with data from `this.state.todo` 
- On submit instead of calling `Api.addTodo` call `Api.editTodo`.

5. Implement a delete button

- Implement `Api.deleteTodo` in `api.js`
- This should be a `DELETE` fetch request to `/todos/:id`
- Add a button to the `EditForm`
- `onClick` of the button call `Api.deleteTodo` with the correct id
- Redirect to the overview page when completed

6. Add a new field deadline

- Add a field to the `TodoForm` and `EditForm` called `deadline`
    - Add an input with type `date` to the form
    - Make sure you have a `label` for this new field
- Implement the new field in `handleSubmit`
    - Look at the other fields on how to do this
- Verify that the deadline is correctly saved

7. Check deadline

- Colors the todos that are approaching the deadline
    - Todo's that are past deadline get the color red
    - Todo's that need to be completed by tomorrow get the color yellow
    
8. Refactor

`TodoForm` and `EditTodoForm` have a lot of code that is the same. 
When we added a field to the `Todo` we had to implement it in both the `EditForm` and `TodoForm`.
That is annoying and we decided to refactor this.
By using composition we will fix this.

