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
            done: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        //loading the data from the form
        const todoData = new FormData(event.target);

        await Api.editTodo(this.props.id, {

            description: todoData.get('description'),
            category: this.state.category,
            done: this.state.done
        });

        this.setState({
            submitted: true
        })
    };

    //this is for loading the data, so in the render it shows the previous data
    async componentDidMount(){
      const todo = await Api.getTodo(this.props.id);
      this.setState({
        description: todo.description,
        category: todo.category,
        done: todo.done
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
    render() {
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
                    <label htmlFor="done">Status:
                      <input
                        name="done"
                        type="checkbox"
                        checked={this.state.done}
                        onChange={this.handleChangeStatus}
                      />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Edit" />
                </div>
                {this.state.submitted && <Redirect to= "/"/>}
            </form>
        )
    }
}

export default EditForm;
