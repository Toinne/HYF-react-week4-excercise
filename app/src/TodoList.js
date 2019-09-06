import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './TodoList.css';

import Api from './api'
import TodoItem from './TodoItem';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
    }




    componentDidMount() {
        Api.getTodos().then(res => {

            this.setState({
                todos: [...this.state.todos, ...res]
            })
        })

        this.setState({
            todos: [...this.state.todos]
        })
    }



    onResolve = async (_id) => {
        const todo = this.state.todos.find((todo) => todo._id === _id);
        todo.done = !todo.done;
        const moment = this.state.todos.find((todo) => todo._id === _id);
        moment.date = todo.date < 2;

        const result = await Api.editTodo(_id, todo);
        const todos = await Api.getTodos();
        this.setState({ ...this.state, todos });
    };




    onEditClick = async (_id, todo) => {

        //const result = await Api.editTodo(_id, todo);
        this.setState({
            ...this.state,
            editingTodoId: _id
        });

    };
    deleteTodo = async (id) => {



        const result = await Api.deleteTodo(id);
        const todos = await Api.getTodos();
        this.setState({

            todos
        });
    };



    render() {

        const todos = this.state.todos;
        const { category } = this.props;

        const filtered = todos.filter(todo => todo.category === category);

        const $todos = filtered.sort((a, b) => a.description < b.description ? -1 : 0).map((todo) => <TodoItem key={todo._id} {...todo} onResolve={this.onResolve} onEditClick={() => this.onEditClick(todo._id)} deleteTodo={this.deleteTodo} />);
        if (this.state.editingTodoId) {
            return <Redirect to={`/todos/${this.state.editingTodoId}`} />
        };



        return (
            <section className="TodoList" >
                <ul>
                    {$todos}
                </ul>
            </section>
        )
    }
}

export default TodoList;