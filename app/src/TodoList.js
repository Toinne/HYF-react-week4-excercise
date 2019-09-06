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
    this.onEditClick = this.onEditClick.bind(this);
  }

  async componentDidMount() {
    const todos = await Api.getTodos();
    this.setState({
      todos
    });
  }

  onResolve = async (_id) => {
    const todo = this.state.todos.find((todo) => todo._id === _id);
    todo.done = !todo.done;

    const result = await Api.editTodo(_id, todo);
    const todos = await Api.getTodos();
    this.setState({ ...this.state, todos });
  };
  onEditClick(_id) {
    console.log(_id);
    this.setState({
      editingTodoId: _id

    })
  }


  render() {
    const {
      todos
    } = this.state;

    const { category } = this.props;
    const filtered = todos.filter(todo => todo.category === category);
    const $todos = filtered.map((todo, todo_id) => <TodoItem key={todo_id} {...todo} onEdit={this.onEditClick} onResolve={this.onResolve} />);

    if (this.state.editingTodoId) {
      return <Redirect to={`/todos/${this.state.editingTodoId}`} />
    }


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