import React from 'react';
import './TodoApp.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TodoHeader from './TodoHeader';
import TodoNavigation from './TodoNavigation';
import TodoPage from './TodoPage';
import TodoList from './TodoList';
import TodoForm from './TodoForm';


function TodoApp() {
    return (
        <BrowserRouter>
            <div className="TodoApp">
                <TodoPage>
                    <TodoHeader/>
                    <TodoNavigation />
                    <Switch>
                        <Route exact path="/" render={(props) => <TodoList key={'overview'} category={false} {...props} />} />
                        <Route exact path="/work" render={(props) => <TodoList key={'work'} category="work" {...props} />} />
                        <Route exact path="/private" render={(props) => <TodoList key={'private'} category="private" {...props} />} />
                        <Route exact path="/todos/:id" component={EditForm} />
                        <Route exact path="/add" component={TodoForm} />
                    </Switch>
                </TodoPage>
            </div>
        </BrowserRouter>
    );
}

export default TodoApp;

