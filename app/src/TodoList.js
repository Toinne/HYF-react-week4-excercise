import React, { Component } from 'react';

import './TodoList.css';

import Api from './api'
import TodoItem from './TodoItem';

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

        const filteredTodos = todos.filter((todo) => todo.category === this.props.category);

        this.setState({
            todos: filteredTodos
        });
    }

    onResolve = async (_id) => {
        const todo = this.state.todos.find((todo) => todo._id === _id);
        todo.done = !todo.done;

        await Api.editTodo(_id, todo);

        this.refreshTodos();
    };

    onEdit = async (id) => {
        this.setState({
            editTodoId: id
        });
    };
    onDelete =async(id) => {
        const deleted = await Api.deleteTodo(id);
        const todos = await Api.getTodos();
        this.setState ({...this.state,todos});
    
    }
    render() {
        const {
            todos,
            editTodoId
        } = this.state;

        if (editTodoId) {
            return <Redirect to={`/todos/${editTodoId}`}/>;
        }

        const $todos = todos.map((todo) => <TodoItem key={todo._id} {...todo} onEdit={this.onEdit} onResolve={this.onResolve} onDelete ={this.onDelete}/>);

        return (
            <section className="TodoList">
                <ul>
                    {$todos}
                </ul>
            </section>
        )
    }
}

export default TodoList;
