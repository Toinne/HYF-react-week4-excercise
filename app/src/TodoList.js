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
        const todos = await Api.getTodos();
        this.setState({
            todos
        })
    }
    handleClickedResolve = (id) => {
      const todo = this.state.todos.find(todo=>todo._id === id);
      todo.done = !todo.done;
      Api.editTodo(id, todo);
    }
    render() {
        const {
            todos
        } = this.state;

        const $todos = todos.map((todo) => <TodoItem key={todo._id} onResolve={this.handleClickedResolve} {...todo} />);

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
