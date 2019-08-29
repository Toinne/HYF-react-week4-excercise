import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
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

    componentDidMount() {
      this.fetchData();
    }

    async fetchData() {
      const todos = await Api.getTodos();
      this.setState({
        todos
      });
    }

    handleClickedResolve = async (id) => {
      const todo = this.state.todos.find(todo=>todo._id === id);
      todo.done = !todo.done;
      await Api.editTodo(id, todo);
      this.fetchData();
    }
    onEditClick = (id) => {
      const editingTodoId = id;
      this.setState({editingTodoId});
      console.log('hello');
    }
    render() {
        const {
          todos
        } = this.state;
        const {
          category
        } = this.props;

        const todosFiltered =  category ? todos.filter((todo) => todo.category === category) : todos;
        const todoItems = todosFiltered.map((todo) => <TodoItem key={todo._id} onResolve={this.handleClickedResolve} onEditClick={this.onEditClick} {...todo} />);

        if (this.state.editingTodoId) { return <Redirect to={`/todos/${this.state.editingTodoId}`} />}
        return (
            <section className="TodoList">
                <ul>
                    {todoItems}
                </ul>
            </section>
        )
    }
}

export default TodoList;
