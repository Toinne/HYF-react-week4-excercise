import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './TodoForm.css';
import Api from './api';

class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            description: '',
            category: '',
            done: '',
            deadline: ''
        }
    }
    getId(){
      return this.props.match.params.id;
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        //loading the data from the form
        const todoData = new FormData(event.target);

        await Api.editTodo(this.getId(), {

            description: todoData.get('description'),
            category: this.state.category,
            done: this.state.done,
            deadline: todoData.get('deadline')
        });

        this.setState({
            submitted: true
        })
    };

    //this is for loading the data, so in the render it shows the previous data
    async componentDidMount(){
      const todo = await Api.getTodo(this.getId());
      this.setState({
        description: todo.description,
        category: todo.category,
        done: todo.done,
        deadline: todo.deadline
      });
    }
    handleChangeCategory = (e) => {
      this.setState({
        category: e.currentTarget.value
      })
    }
    handleChangeStatus = (e) => {
      this.setState({
        done: e.currentTarget.checked
      })
    }
    handleDelete = async (event) => {
      await Api.deleteTodo(this.getId(), this.props.todo );
    }
    render() {
      console.log(this.state);
        return (
            <form onSubmit={this.handleSubmit} className="TodoForm">


                <div>
                    <label htmlFor="description">Description:</label>
                    <input id="description" name="description" type="text" defaultValue={this.state.description}/>
                </div>

                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" value={this.state.category} onChange={this.handleChangeCategory}>
                        <option value="private">private</option>
                        <option value="work">work</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="deadline">Deadline:</label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      defaultValue={this.state.deadline}/>
                </div>
                <div>
                    <label htmlFor="done">Status:
                      <input
                        name="done"
                        type="checkbox"
                        checked={this.state.done || false}
                        onChange={this.handleChangeStatus}
                      />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Edit" />
                    <button onClick={this.handleDelete} className="buttonDelete" type="submit" value="Delete">Delete</button>
                </div>
                {this.state.submitted && <Redirect to= "/"/>}
            </form>

        )
    }
}

export default EditForm;
