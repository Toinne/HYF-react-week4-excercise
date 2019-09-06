import React, { Component } from 'react';

import './TodoList.css';

import Api from './api'
import TodoItem from './TodoItem';
import { Redirect } from 'react-router-dom'

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        }
    }

    async componentDidMount() {
        const todos = await Api.getTodos();
        this.setState({
            todos
        });
    }
    
    onResolve = async (id) => {

        const todo = this.state.todos.find((todo) => todo._id === id);
        todo.done =!todo.done;
        const result = await Api.editTodo(id, todo);
        const todos = await Api.getTodos();
        this.setState({
            todos
        });
    
    };

    onEdit = async (id) => {

        const editingTodoId = this.state.todos.find((todo) => id === todo.id);       
        const result = await Api.editTodo(id, todo);
        const todos = await Api.getTodos();
        this.setState({
            todos: editingTodo
        });
    
    };
    

    deleteTodo = async (id) => {

        const result = await Api.deleteTodo(id);
        this.setState({
            todos: result
        });
    
    };

    render() {
        const {
            todos
        } = this.state;

        if (this.state.editingTodoId) {
            return
            <Redirect to={`/todos/${this.state.editingTodoId}`} /> }
    

       //tarih sirasina gore su an 
        const $todos = todos
            .sort((a, b) => a.deadline<b.deadline ? -1 : a.deadline==b ? 1 : 0)
            .map((todo) => <TodoItem key={todo._id} {...todo} onResolve={this.onResolve} deleteTodo={this.deleteTodo} onEdit={this.onEdit} />);
        
        return (
            <section className="TodoList">
                <ul>
                    {$todos}
                </ul>
            </section>
        );
    };
}

export default TodoList;