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
            category: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        //loading the data from the form
        const todoData = new FormData(event.target);

        await Api.editTodo(this.props.id, {

            description: todoData.get('description'),
            category: todoData.get('category')
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
        category: todo.category
      });
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
                    <select id="category" name="category">
                        <option value="private">private</option>
                        <option value="work">work</option>
                    </select>
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
