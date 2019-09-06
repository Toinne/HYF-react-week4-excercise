import React from 'react';
import './TodoApp.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TodoHeader from './TodoHeader';
import TodoNavigation from './TodoNavigation';
import TodoPage from './TodoPage';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import EditForm from './EditForm';

function TodoApp() {
  return (
    <BrowserRouter>
      <div className="TodoApp">
        <TodoPage>
          <TodoHeader />
          <TodoNavigation />
          <Switch>
            <Route exact path="/" component={TodoList} />
            <Route exact path="/add" component={TodoForm} />
            <Route exact path="/work" render={props => <TodoList {...props} category={"work"} />} />
            <Route exact path="/private" render={props => <TodoList {...props} category={"private"} />} />
            <Route exact path="/todos/:id" component={EditForm} />
          </Switch>
        </TodoPage>
      </div>
    </BrowserRouter>
  );
}

export default TodoApp;
