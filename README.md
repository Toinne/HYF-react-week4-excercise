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

- Remove the overview `Route` and add 2 new routes `/work` and `/private`.
    - When I click the `/work` I only see the items with the `category` `work`
    - When I click the `/private` I only see the items with the `category` `private`
- As the component for the route you can use `TodoList` but you will want render the component with a property indicating the selected category. See https://reacttraining.com/react-router/web/api/Route/render-func 
- Add an optional argument `category` to `getTodos` in `api.js`. Make sure the fetch calls the api with a parameter `category` and the value from the argument.
- Based on the route call `getTodos` in `TodoList` with either the value `work` or `private`.

4. Implement the edit button

When the user clicks edit they are redirected to a page with a prefilled form where they can change the description.

- Copy the `TodoForm` to a new component called `EditForm`.
- Add a `Route` `/todos/:id`, `EditForm` will be the component for this route.
- Implement the `getTodo` function in `api.js`
- In `componentDidMount` you need to call the `getTodo` with the `id` from the route.
- Check the documentation on how to get the `id` from the route https://reacttraining.com/react-router/web/example/url-params
- Fill the form with the value from the todo
- On submit edit the todo by calling `editTodo` and redirect back to the specific category page.
