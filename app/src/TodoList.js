import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    onDelete= async (id) => {
        const todos = await Api.deleteTodo(id);
        console.log(todos)
        this.setState({
            todos
        });
        this.refreshTodos();
    }

    render() {
        const {
            todos,
            editTodoId
        } = this.state;
         
        if (editTodoId) {
            return <Redirect to={`/todos/${editTodoId}`}/>;
        }

        const $todos = todos.map((todo) => <TodoItem onDelete={this.onDelete} deadline={this.deadline} key={todo._id} {...todo} onEdit={this.onEdit} onResolve={this.onResolve}/>);

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