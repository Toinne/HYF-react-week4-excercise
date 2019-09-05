import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './TodoList.css';
import Api from './api'
import TodoItem from './TodoItem';
import NoTodoItem from './NoTodoItem';
import moment from 'moment';

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
    }
    handleSorter = (event) =>{

      this.setState({
        sorting: event.currentTarget.value,
        });
    }
    render() {
        const {
          todos
        } = this.state;
        const {
          category
        } = this.props;

        const todosFiltered =  category
          ? todos.filter((todo) => todo.category === category)
          : todos;

        let sorted;
        if(this.state.sorting === 'deadline'){
          sorted = todosFiltered.sort((a, b) => moment(a.deadline).valueOf() - moment(b.deadline).valueOf());
        }else{
          sorted = todosFiltered.sort((a, b) => a.description.localeCompare(b.description));
        }

        let todoItems = sorted
          .map((todo) => (
            <TodoItem
              key={todo._id}
              onResolve={this.handleClickedResolve}
              onEditClick={this.onEditClick}
              {...todo}
            />
          ));
        if(todoItems.length === 0){
          return <NoTodoItem category={category}/>
        }

        if (this.state.editingTodoId) {
          return <Redirect to={`/todos/${this.state.editingTodoId}`} />
        }
        return (
            <section className="TodoList">
              <form onSubmit={this.handleSorter} className="TodoForm">
                <label htmlFor="sorter">Sort by:</label>
                <select
                  id="sorter"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleSorter}
                >
                  <option value="atoz">A to Z</option>
                  <option value="deadline">By deadline</option>
                </select>
              </form>
              <ul>
                {todoItems}
              </ul>
            </section>
        )
    }
}

export default TodoList;
