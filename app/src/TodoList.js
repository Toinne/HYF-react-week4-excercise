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
        this.refreshTodos();
    }
    
    async refreshTodos() {
        const todos = await Api.getTodos();

        if (!this.props.category) {
            this.setState({
                todos
            });
            return;
        }

        const filterTodos = todos.filter((todo) => todo.category === this.props.category);

        this.setState({
            todos: filterTodos
        });
    }

    onResolve = async (id) => {

        const todo = this.state.todos.find((todo) => todo.id === id);
        todo.done =!todo.done;
        await Api.editTodo(id, todo);
        this.refreshTodos();    
    };

    onEdit = async (id) => {

        this.setState({
            editingTodoId: id
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
            todos,
            editingTodoId
        } = this.state;

        if (editingTodoId) {
            return <Redirect to={`/todos/${editingTodoId}`}/>;
        }
        
        const { category } = this.props;

       //tarih sirasina gore su an 
        const $todos = todos
            .sort((a, b) => a.deadline<b.deadline ? -1 : a.deadline===b ? 1 : 0)
            .filter(todo => todo.category === category)
            .map((todo) => <TodoItem key={todo._id} {...todo} onResolve={this.onResolve} deleteTodo={this.deleteTodo} onEdit={this.onEdit} />);
            
        return (
            <section className="TodoList">
                <ul>
                    {$todos}
                </ul>
            </section>
        )
    }
};

export default TodoList;